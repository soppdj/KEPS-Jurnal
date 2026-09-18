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

-- 5. Stored Procedure untuk Admin: Menghasilkan Batch Token Otomatis
CREATE OR REPLACE FUNCTION public.generate_subscription_tokens(
    p_count INT DEFAULT 5,
    p_duration_days INT DEFAULT 90,
    p_plan_name TEXT DEFAULT 'Paket 90 Hari Kepemimpinan Berdampak'
)
RETURNS TABLE(generated_token TEXT, duration_days INT, plan_name TEXT)
LANGUAGE plpgsql
AS $$
DECLARE
    i INT;
    v_code TEXT;
BEGIN
    FOR i IN 1..p_count LOOP
        v_code := 'KEPS-' || p_duration_days || 'H-' || 
                  UPPER(SUBSTRING(MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT) FROM 1 FOR 4)) || '-' || 
                  UPPER(SUBSTRING(MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT) FROM 5 FOR 4));
        
        INSERT INTO public.keps_subscription_tokens (token_code, duration_days, plan_name)
        VALUES (v_code, p_duration_days, p_plan_name);

        generated_token := v_code;
        duration_days := p_duration_days;
        plan_name := p_plan_name;
        RETURN NEXT;
    END LOOP;
END;
$$;

-- 6. Masukkan beberapa token awal siap pakai untuk testing / peluncuran awal
INSERT INTO public.keps_subscription_tokens (token_code, duration_days, plan_name)
VALUES 
    ('KEPS-90H-2026-PRO1', 90, 'Paket 90 Hari Kepemimpinan Berdampak'),
    ('KEPS-90H-2026-PRO2', 90, 'Paket 90 Hari Kepemimpinan Berdampak'),
    ('KEPS-90H-2026-PRO3', 90, 'Paket 90 Hari Kepemimpinan Berdampak'),
    ('KEPS-365H-2026-VIP', 365, 'Paket 1 Tahun Keanggotaan Eksekutif')
ON CONFLICT (token_code) DO NOTHING;
