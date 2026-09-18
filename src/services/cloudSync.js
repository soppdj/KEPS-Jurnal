/**
 * Multi-device Cloud Sync & JSON Backup Service
 * Supports manual JSON import/export and direct Supabase REST sync
 */

import { storage } from './storage';

export const DEFAULT_SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://izfrqlxolcinaunveuaz.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_w3MFu6MLK9so8mQnx2k0nA_0eWDAPSp'
};

export const cloudSyncService = {
  /**
   * Export all local data to a JSON backup file
   */
  exportToJsonFile: () => {
    try {
      const data = storage.loadData();
      const exportPayload = {
        app: 'KEPS Jurnal v.1.0',
        exportedAt: new Date().toISOString(),
        ...data
      };

      const jsonStr = JSON.stringify(exportPayload, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `keps-journal-backup-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return { success: true };
    } catch (err) {
      console.error('[KEPS CloudSync] Export error:', err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Import data from a selected JSON backup file
   */
  importFromJsonFile: (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new Error('Tidak ada file yang dipilih.'));
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target.result;
          const parsed = JSON.parse(content);

          // Validation check
          if (!parsed.profile && !parsed.reflections && !parsed.completedActions) {
            throw new Error('Format file cadangan tidak valid atau rusak.');
          }

          const current = storage.loadData();
          const mergedData = {
            ...current,
            ...parsed,
            profile: { ...current.profile, ...(parsed.profile || {}) },
            settings: { ...current.settings, ...(parsed.settings || {}) },
            reflections: { ...current.reflections, ...(parsed.reflections || {}) },
            completedActions: { ...current.completedActions, ...(parsed.completedActions || {}) }
          };

          storage.saveData(mergedData);
          resolve({ success: true, data: mergedData });
        } catch (err) {
          console.error('[KEPS CloudSync] Import error:', err);
          reject(err);
        }
      };

      reader.onerror = () => reject(new Error('Gagal membaca file cadangan.'));
      reader.readAsText(file);
    });
  },

  /**
   * Sync data to Supabase (if configured)
   */
  syncToSupabase: async (supabaseUrl, supabaseAnonKey) => {
    const activeUrl = supabaseUrl || DEFAULT_SUPABASE_CONFIG.url;
    const activeKey = supabaseAnonKey || DEFAULT_SUPABASE_CONFIG.anonKey;

    if (!activeUrl || !activeKey) {
      throw new Error('URL dan Publishable Key Supabase belum dikonfigurasi.');
    }

    const cleanUrl = activeUrl.replace(/\/$/, '');
    const data = storage.loadData();
    const userId = data.profile.nip || 'keps-default-user';

    try {
      // Upsert to 'keps_journals' table
      const response = await fetch(`${cleanUrl}/rest/v1/keps_journals`, {
        method: 'POST',
        headers: {
          'apikey': activeKey,
          'Authorization': `Bearer ${activeKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          user_id: userId,
          payload: data,
          updated_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Tabel database "keps_journals" belum dibuat di Supabase. Silakan jalankan skrip SQL infrastruktur di Supabase Dashboard -> SQL Editor (klik tombol "Salin Skrip SQL" di bagian bawah).');
        }
        const errorText = await response.text();
        throw new Error(`Supabase Sync gagal (${response.status}): ${errorText}`);
      }

      // Also try to upsert profile record to keps_profiles
      try {
        await fetch(`${cleanUrl}/rest/v1/keps_profiles`, {
          method: 'POST',
          headers: {
            'apikey': activeKey,
            'Authorization': `Bearer ${activeKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            user_id: userId,
            principal_name: data.profile.principalName,
            nip: data.profile.nip,
            school_name: data.profile.schoolName,
            school_address: data.profile.schoolAddress || '',
            photo_url: data.profile.photoUrl || '',
            updated_at: new Date().toISOString()
          })
        });
      } catch (profileErr) {
        console.warn('[KEPS CloudSync] Profil granular sync skipped:', profileErr);
      }

      // Update last sync time
      const updatedData = {
        ...data,
        settings: {
          ...data.settings,
          supabaseConfig: {
            url: activeUrl,
            anonKey: activeKey,
            syncEnabled: true,
            lastSyncTimestamp: new Date().toISOString()
          }
        }
      };
      storage.saveData(updatedData);

      return { success: true, timestamp: new Date().toISOString() };
    } catch (err) {
      console.error('[KEPS CloudSync] Supabase push error:', err);
      throw err;
    }
  },

  /**
   * Pull data from Supabase
   */
  pullFromSupabase: async (supabaseUrl, supabaseAnonKey) => {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('URL dan Anon Key Supabase belum dikonfigurasi.');
    }

    const cleanUrl = supabaseUrl.replace(/\/$/, '');
    const current = storage.loadData();
    const userId = current.profile.nip || 'keps-default-user';

    try {
      const response = await fetch(`${cleanUrl}/rest/v1/keps_journals?user_id=eq.${encodeURIComponent(userId)}&select=*`, {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Gagal mengambil data dari Supabase: ${response.statusText}`);
      }

      const rows = await response.json();
      if (!rows || rows.length === 0) {
        throw new Error('Data jurnal tidak ditemukan di Supabase untuk akun ini.');
      }

      const remoteData = rows[0].payload;
      storage.saveData(remoteData);
      return { success: true, data: remoteData };
    } catch (err) {
      console.error('[KEPS CloudSync] Supabase pull error:', err);
      throw err;
    }
  }
};
