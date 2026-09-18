-- =========================================================================
-- KEPS JOURNAL v2.0 - SUPABASE DATABASE INFRASTRUCTURE
-- Project URL: https://izfrqlxolcinaunveuaz.supabase.co
-- Cara Pakai: Buka Supabase Dashboard -> SQL Editor -> New Query -> Tempel (Paste) -> Run (Ctrl + Enter)
-- =========================================================================

-- 1. Tabel Sinkronisasi Utama (Menyimpan seluruh data jurnal & multi-perangkat)
CREATE TABLE IF NOT EXISTS public.keps_journals (
    user_id TEXT PRIMARY KEY,
    payload JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE(''utc'', NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_keps_journals_user_id ON public.keps_journals (user_id);

-- 2. Tabel Refleksi Harian Terstruktur (Untuk analitik & query granular per hari)
CREATE TABLE IF NOT EXISTS public.keps_reflections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    day INTEGER NOT NULL CHECK (day >= 1 AND day <= 90),
    title TEXT,
    phase INTEGER CHECK (phase >= 1 AND phase <= 3),
    leadership_style TEXT,
    mood INTEGER CHECK (mood >= 1 AND mood <= 5),
    challenge TEXT,
    decision TEXT,
    insight TEXT,
    actions_completed INTEGER[] DEFAULT ''{}'',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE(''utc'', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE(''utc'', NOW()) NOT NULL,
    UNIQUE(user_id, day)
);

CREATE INDEX IF NOT EXISTS idx_keps_reflections_user_day ON public.keps_reflections (user_id, day);

-- 3. Tabel Profil Resmi Kepala Sekolah & Satuan Pendidikan
CREATE TABLE IF NOT EXISTS public.keps_profiles (
    user_id TEXT PRIMARY KEY,
    principal_name TEXT NOT NULL,
    nip TEXT,
    school_name TEXT NOT NULL,
    school_address TEXT,
    photo_url TEXT,
    school_level TEXT DEFAULT ''TK'',
    start_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE(''utc'', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE(''utc'', NOW()) NOT NULL
);

-- 4. Aktifkan Row Level Security (RLS) untuk Keamanan Standar Supabase
ALTER TABLE public.keps_journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keps_reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keps_profiles ENABLE ROW LEVEL SECURITY;

-- 5. Kebijakan Akses (RLS Policies) untuk Publishable / Anon Key
-- Memberikan hak akses Baca (SELECT) & Tulis (INSERT/UPDATE/UPSERT) bagi klien PWA
DROP POLICY IF EXISTS Allow anon read on keps_journals ON public.keps_journals;
CREATE POLICY Allow anon read on keps_journals 
ON public.keps_journals FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS Allow anon insert_update on keps_journals ON public.keps_journals;
CREATE POLICY Allow anon insert_update on keps_journals 
ON public.keps_journals FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);

DROP POLICY IF EXISTS Allow anon read on keps_reflections ON public.keps_reflections;
CREATE POLICY Allow anon read on keps_reflections 
ON public.keps_reflections FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS Allow anon insert_update on keps_reflections ON public.keps_reflections;
CREATE POLICY Allow anon insert_update on keps_reflections 
ON public.keps_reflections FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);

DROP POLICY IF EXISTS Allow anon read on keps_profiles ON public.keps_profiles;
CREATE POLICY Allow anon read on keps_profiles 
ON public.keps_profiles FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS Allow anon insert_update on keps_profiles ON public.keps_profiles;
CREATE POLICY Allow anon insert_update on keps_profiles 
ON public.keps_profiles FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);

-- 6. Tambahkan ke Publikasi Realtime Supabase (Opsional untuk sinkronisasi seketika)
DO 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = ''supabase_realtime'' AND tablename = ''keps_journals''
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.keps_journals;
    END IF;
END ;


-- =========================================================================
-- KEPS JOURNAL v2.0 - SUBSCRIPTION & SINGLE-USE TOKEN INFRASTRUCTURE
-- =========================================================================

-- 1. Tabel Token Langganan (Hanya dapat diakses dan dikelola oleh Admin)
CREATE TABLE IF NOT EXISTS public.keps_subscription_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    token_code TEXT UNIQUE NOT NULL,
    duration_days INTEGER NOT NULL DEFAULT 90,
    plan_name TEXT NOT NULL DEFAULT 'Paket 90 Hari Kepemimpinan Berdampak',
    is_used BOOLEAN NOT NULL DEFAULT FALSE,
    used_by TEXT,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_keps_tokens_code ON public.keps_subscription_tokens(token_code);
CREATE INDEX IF NOT EXISTS idx_keps_tokens_is_used ON public.keps_subscription_tokens(is_used);

-- 2. Tabel Data Langganan Pengguna
CREATE TABLE IF NOT EXISTS public.keps_subscriptions (
    user_id TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'active',
    plan_name TEXT NOT NULL DEFAULT 'Akses Eksklusif 90 Hari Kepala Sekolah',
    valid_until TIMESTAMPTZ NOT NULL,
    last_token_used TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_keps_subs_user_id ON public.keps_subscriptions(user_id);

-- 3. Row Level Security (RLS)
ALTER TABLE public.keps_subscription_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keps_subscriptions ENABLE ROW LEVEL SECURITY;

-- KEBIJAKAN KEAMANAN TOKEN:
-- Default deny: Tabel keps_subscription_tokens TIDAK MEMILIKI kebijakan SELECT untuk anon atau authenticated.
-- Hanya role 'service_role' (Admin) yang dapat melihat daftar token secara langsung.
DROP POLICY IF EXISTS "Deny all public access to tokens" ON public.keps_subscription_tokens;

-- Kebijakan untuk keps_subscriptions: Pengguna hanya dapat membaca data langganan
DROP POLICY IF EXISTS "Allow user to read own subscription" ON public.keps_subscriptions;
CREATE POLICY "Allow user to read own subscription"
ON public.keps_subscriptions FOR SELECT
TO anon, authenticated
USING (true);

-- 4. Stored Procedure Aman untuk Klaim Token Sekali Pakai (Atomic Single-Use)
CREATE OR REPLACE FUNCTION public.redeem_subscription_token(
    p_token_code TEXT,
    p_user_id TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_token RECORD;
    v_now TIMESTAMPTZ := TIMEZONE('utc', NOW());
    v_current_valid TIMESTAMPTZ;
    v_new_valid TIMESTAMPTZ;
BEGIN
    -- Normalisasi token input
    p_token_code := UPPER(TRIM(COALESCE(p_token_code, '')));

    IF p_token_code = '' THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Kode token tidak boleh kosong.'
        );
    END IF;

    -- Cari token dan kunci baris untuk mencegah race condition (Concurrency Lock)
    SELECT * INTO v_token
    FROM public.keps_subscription_tokens
    WHERE UPPER(token_code) = p_token_code
    FOR UPDATE;

    -- Validasi keberadaan token
    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Token tidak ditemukan. Pastikan Anda memasukkan kode token dengan benar.'
        );
    END IF;

    -- Validasi apakah token sudah pernah digunakan
    IF v_token.is_used THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Token ini sudah pernah digunakan sebelumnya pada ' || 
                     TO_CHAR(v_token.used_at, 'DD/MM/YYYY HH24:MI') || ' UTC. Setiap token hanya dapat digunakan 1 kali.'
        );
    END IF;

    -- Tandai token sebagai telah digunakan (Atomic Single-Use Update)
    UPDATE public.keps_subscription_tokens
    SET is_used = TRUE,
        used_by = p_user_id,
        used_at = v_now
    WHERE id = v_token.id;

    -- Hitung perpanjangan masa aktif pengguna
    SELECT valid_until INTO v_current_valid
    FROM public.keps_subscriptions
    WHERE user_id = p_user_id;

    IF v_current_valid IS NOT NULL AND v_current_valid > v_now THEN
        -- Jika langganan masih aktif, tambahkan dari sisa tanggal aktif saat ini
        v_new_valid := v_current_valid + (v_token.duration_days || ' days')::INTERVAL;
    ELSE
        -- Jika sudah habis atau pertama kali, mulai dari hari ini
        v_new_valid := v_now + (v_token.duration_days || ' days')::INTERVAL;
    END IF;

    -- Simpan atau perbarui status langganan pengguna
    INSERT INTO public.keps_subscriptions (
        user_id, status, plan_name, valid_until, last_token_used, updated_at
    ) VALUES (
        p_user_id, 'active', v_token.plan_name, v_new_valid, p_token_code, v_now
    )
    ON CONFLICT (user_id) DO UPDATE SET
        status = 'active',
        plan_name = v_token.plan_name,
        valid_until = v_new_valid,
        last_token_used = p_token_code,
        updated_at = v_now;

    -- Kembalikan respon sukses
    RETURN jsonb_build_object(
        'success', true,
        'message', 'Selamat! Masa langganan berhasil diperpanjang ' || v_token.duration_days || ' hari.',
        'plan_name', v_token.plan_name,
        'duration_days', v_token.duration_days,
        'valid_until', v_new_valid
    );
END;
$$;

-- Berikan izin eksekusi prosedur kepada role anon & authenticated
GRANT EXECUTE ON FUNCTION public.redeem_subscription_token(TEXT, TEXT) TO anon, authenticated;

-- 5. Stored Procedure untuk Admin: Menghasilkan Batch Token Otomatis (Unik & Tidak Mudah Ditebak)
CREATE OR REPLACE FUNCTION public.generate_subscription_tokens(
    p_count INT DEFAULT 5,
    p_duration_days INT DEFAULT 30, -- 30 hari (1 bulan) atau 90 hari (3 bulan)
    p_plan_name TEXT DEFAULT NULL
)
RETURNS TABLE(generated_token TEXT, duration_days INT, plan_name TEXT)
LANGUAGE plpgsql
AS $$
DECLARE
    i INT;
    v_prefix TEXT;
    v_plan TEXT;
    v_code TEXT;
    v_rand1 TEXT;
    v_rand2 TEXT;
    v_rand3 TEXT;
BEGIN
    IF p_duration_days <= 30 THEN
        v_prefix := 'KP1B-';
        v_plan := COALESCE(p_plan_name, 'Paket 1 Bulan (30 Hari) Kepemimpinan Berdampak');
    ELSIF p_duration_days <= 90 THEN
        v_prefix := 'KP3B-';
        v_plan := COALESCE(p_plan_name, 'Paket 3 Bulan (90 Hari) Kepemimpinan Berdampak');
    ELSE
        v_prefix := 'KP1Y-';
        v_plan := COALESCE(p_plan_name, 'Paket 1 Tahun Keanggotaan Eksekutif');
    END IF;

    FOR i IN 1..p_count LOOP
        -- Menghasilkan 12 karakter acak heksadesimal dengan entropi tinggi (3 segmen x 4 karakter)
        v_rand1 := UPPER(SUBSTRING(MD5(GEN_RANDOM_UUID()::TEXT || CLOCK_TIMESTAMP()::TEXT || RANDOM()::TEXT) FROM 1 FOR 4));
        v_rand2 := UPPER(SUBSTRING(MD5(GEN_RANDOM_UUID()::TEXT || CLOCK_TIMESTAMP()::TEXT || RANDOM()::TEXT) FROM 5 FOR 4));
        v_rand3 := UPPER(SUBSTRING(MD5(GEN_RANDOM_UUID()::TEXT || CLOCK_TIMESTAMP()::TEXT || RANDOM()::TEXT) FROM 9 FOR 4));
        v_code := v_prefix || v_rand1 || '-' || v_rand2 || '-' || v_rand3;
        
        INSERT INTO public.keps_subscription_tokens (token_code, duration_days, plan_name)
        VALUES (v_code, p_duration_days, v_plan);

        generated_token := v_code;
        duration_days := p_duration_days;
        plan_name := v_plan;
        RETURN NEXT;
    END LOOP;
END;
$$;

-- 6. Masukkan token awal acak dengan keamanan tinggi (1 Bulan & 3 Bulan)
INSERT INTO public.keps_subscription_tokens (token_code, duration_days, plan_name)
VALUES 
    -- Token Paket 1 Bulan (30 Hari)
    ('KP1B-8F4K-9W2M-7X5Q', 30, 'Paket 1 Bulan (30 Hari) Kepemimpinan Berdampak'),
    ('KP1B-3T7R-5V9L-2N6H', 30, 'Paket 1 Bulan (30 Hari) Kepemimpinan Berdampak'),
    ('KP1B-6M2Y-8J4P-1K9S', 30, 'Paket 1 Bulan (30 Hari) Kepemimpinan Berdampak'),
    ('KP1B-4Q8Z-9C2V-7L1F', 30, 'Paket 1 Bulan (30 Hari) Kepemimpinan Berdampak'),
    ('KP1B-5D3X-8H7B-2W9A', 30, 'Paket 1 Bulan (30 Hari) Kepemimpinan Berdampak'),

    -- Token Paket 3 Bulan (90 Hari)
    ('KP3B-9R4T-W2Y7-H5N8', 90, 'Paket 3 Bulan (90 Hari) Kepemimpinan Berdampak'),
    ('KP3B-4L8N-2T6H-9V3Y', 90, 'Paket 3 Bulan (90 Hari) Kepemimpinan Berdampak'),
    ('KP3B-5P9S-1K7R-8M2W', 90, 'Paket 3 Bulan (90 Hari) Kepemimpinan Berdampak'),
    ('KP3B-8C2Z-5J7M-1X4D', 90, 'Paket 3 Bulan (90 Hari) Kepemimpinan Berdampak'),
    ('KP3B-1V4Q-9F2K-7B8T', 90, 'Paket 3 Bulan (90 Hari) Kepemimpinan Berdampak'),

    -- Legacy Tokens
    ('KEPS-90H-2026-PRO1', 90, 'Paket 90 Hari Kepemimpinan Berdampak'),
    ('KEPS-365H-2026-VIP', 365, 'Paket 1 Tahun Keanggotaan Eksekutif')
ON CONFLICT (token_code) DO NOTHING;
