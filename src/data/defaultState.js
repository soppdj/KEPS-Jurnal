/**
 * Default initial state and schemas for KEPS Journal v2.0
 */

export const DEFAULT_PROFILE = {
  principalName: 'Andira Setya, M.Pd',
  nip: '0123456789',
  schoolName: 'SD Inspira Montessori',
  schoolAddress: 'Jl. Terusan Cisokan, Bandung, Jawa Barat 40121',
  photoUrl: 'data:image/jpeg;base64,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',
  schoolLevel: 'SD', // TK, SD, SMP, SMA, SMK
  startDate: new Date().toISOString().split('T')[0],
  theme: 'dark' // 'dark' | 'light'
};

export const DEFAULT_SETTINGS = {
  morningReminderEnabled: true,
  morningReminderTime: '07:00',
  afternoonReminderEnabled: true,
  afternoonReminderTime: '13:30',
  notificationsGranted: false,
  autoSaveIntervalMs: 2000,
  supabaseConfig: {
    url: 'https://izfrqlxolcinaunveuaz.supabase.co',
    anonKey: 'sb_publishable_w3MFu6MLK9so8mQnx2k0nA_0eWDAPSp',
    syncEnabled: true,
    lastSyncTimestamp: null
  }
};

export const DEFAULT_SUBSCRIPTION = {
  status: 'active', // 'active' | 'expired'
  planName: 'Masa Uji Coba 3 Hari (Trial)',
  isTrial: true,
  startDate: new Date().toISOString(),
  validUntil: new Date(Date.now() + 3 * 86400000).toISOString(),
  lastTokenUsed: null,
  tokensHistory: []
};

// Seed sample progress for Day 1 and Day 2 so new principals immediately see what a completed entry looks like!
export const INITIAL_USER_DATA = {
  version: '1.0.0',
  profile: DEFAULT_PROFILE,
  settings: DEFAULT_SETTINGS,
  subscription: DEFAULT_SUBSCRIPTION,
  activeDay: 3,
  // Key: day number (1-90)
  completedActions: {
    1: [0, 1, 2, 3], // all 4 actions checked on Day 1
    2: [0, 1, 2]    // 3 actions checked on Day 2
  },
  reflections: {
    1: {
      day: 1,
      mood: 4, // 1-5 scale
      challenge: 'Ada kecanggungan dan jarak tak kasat mata saat menyapa guru-guru senior di ruang guru. Beberapa terbiasa dengan gaya kepemimpinan formal yang kaku.',
      decision: 'Saya memutuskan untuk tidak langsung menggelar rapat instruksional panjang. Saya memilih berkeliling, menyalami penjaga sekolah, staf TU, dan duduk minum teh bersama dewan guru tanpa protokoler.',
      insight: 'Kepemimpinan tidak dimulai dari mikrofon pengeras suara, tetapi dari kerendahan hati mendengar denyut nadi warga sekolah yang paling sunyi.',
      checklistCompleted: true,
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
      voiceUsed: true
    },
    2: {
      day: 2,
      mood: 3,
      challenge: 'Data Rapor Pendidikan menunjukkan capaian numerasi masih di zona kuning dan ada ketimpangan persepsi antar guru mata pelajaran non-eksakta.',
      decision: 'Membentuk gugus tugas numerasi lintas mapel dan menyajikan infografis sederhana 1 lembar yang tidak menyudutkan guru matematika saja.',
      insight: 'Data adalah cermin untuk berbenah bersama, bukan palu hakim untuk mencari kambing hitam.',
      checklistCompleted: true,
      timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
      voiceUsed: false
    }
  }
};

export const MOOD_LEVELS = [
  { value: 1, emoji: '😫', label: 'Sangat Lelah / Tertekan', color: 'text-rose-500 bg-rose-500/10 border-rose-500/30' },
  { value: 2, emoji: '😟', label: 'Khawatir / Ragu', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
  { value: 3, emoji: '😐', label: 'Tenang / Netral', color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' },
  { value: 4, emoji: '🙂', label: 'Optimis / Bersemangat', color: 'text-blue-500 bg-blue-500/10 border-blue-500/30' },
  { value: 5, emoji: '🌟', label: 'Sangat Berdaya / Berdampak', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' }
];
