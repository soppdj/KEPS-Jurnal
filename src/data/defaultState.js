/**
 * Default initial state and schemas for KEPS Journal v2.0
 */

export const DEFAULT_PROFILE = {
  principalName: 'Siti Asiyah, S.Pd',
  nip: '0123456789',
  schoolName: 'TK Khoirur Rooziqiin Montessori Bandung',
  schoolAddress: 'Jl. Terusan Cisokan No. 34, Sukamaju, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat 40121',
  photoUrl: '', // Base64 compressed profile image
  schoolLevel: 'TK', // TK, SD, SMP, SMA, SMK
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
  planName: 'Masa Uji Coba 7 Hari (Trial)',
  isTrial: true,
  startDate: new Date().toISOString(),
  validUntil: new Date(Date.now() + 7 * 86400000).toISOString(),
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
