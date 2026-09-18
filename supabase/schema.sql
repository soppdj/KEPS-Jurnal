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
