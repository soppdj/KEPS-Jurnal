/**
 * 9 Dimensi Gaya Kepemimpinan Kepala Sekolah Berdampak
 * Berdasarkan Framework "Jurus Pamungkas 90 Hari Menjadi Kepala Sekolah Berdampak"
 */

export const LEADERSHIP_STYLES = {
  TRANSFORMATIONAL: {
    id: 'transformational',
    name: 'Transformasional',
    shortName: 'Transformasional',
    englishName: 'Transformational Leadership',
    color: '#8B5CF6', // Purple
    bgLight: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
    description: 'Menginspirasi dan memotivasi warga sekolah untuk melampaui kepentingan pribadi demi visi bersama dan perubahan besar.',
    keyAction: 'Membangun visi, menggerakkan energi kolektif, dan memicu inovasi radikal pembelajaran.',
    icon: 'Sparkles'
  },
  INSTRUCTIONAL: {
    id: 'instructional',
    name: 'Instruksional',
    shortName: 'Instruksional',
    englishName: 'Instructional Leadership',
    color: '#3B82F6', // Blue
    bgLight: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    description: 'Fokus intensif pada mutu pembelajaran di kelas, kurikulum, supervisi akademik berkala, dan peningkatan hasil belajar siswa.',
    keyAction: 'Supervisi klinis, penguatan modul ajar, dan analisis capaian asesmen siswa.',
    icon: 'BookOpen'
  },
  CONSTRUCTIVIST: {
    id: 'constructivist',
    name: 'Konstruktivistik',
    shortName: 'Konstruktivistik',
    englishName: 'Constructivist Leadership',
    color: '#06B6D4', // Cyan
    bgLight: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800',
    description: 'Menciptakan ekosistem di mana guru dan staf membangun makna, merefleksikan pengalaman kerja, dan belajar dari kesalahan bersama.',
    keyAction: 'Fasilitasi refleksi mandiri, Komunitas Belajar (Kombel), dan inkubasi eksperimen mengajar.',
    icon: 'Brain'
  },
  DEMOCRATIC: {
    id: 'democratic',
    name: 'Demokratis',
    shortName: 'Demokratis',
    englishName: 'Democratic Leadership',
    color: '#10B981', // Emerald
    bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    description: 'Mengedepankan partisipasi aktif, musyawarah mufakat, transparansi, dan rasa kepemilikan bersama dalam setiap kebijakan.',
    keyAction: 'Rapat deliberatif, jajak pendapat warga sekolah, dan keputusan berbasis konsensus.',
    icon: 'Users'
  },
  EMOTIONAL: {
    id: 'emotional',
    name: 'Emosional / Resonansi',
    shortName: 'Emosional',
    englishName: 'Emotional Leadership',
    color: '#EC4899', // Pink / Rose
    bgLight: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800',
    description: 'Membangun kehangatan, kecerdasan emosi, empati mendalam, dan keamanan psikologis (*psychological safety*) bagi guru dan staf.',
    keyAction: 'Mendengarkan tanpa menghakimi, mediasi konflik humanis, dan apresiasi personal.',
    icon: 'Heart'
  },
  TRANSACTIONAL: {
    id: 'transactional',
    name: 'Transaksional',
    shortName: 'Transaksional',
    englishName: 'Transactional Leadership',
    color: '#F59E0B', // Amber
    bgLight: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    description: 'Memastikan standar operasional, kejelasan hak & kewajiban, akuntabilitas tugas, serta reward dan konsekuensi yang adil.',
    keyAction: 'SOP sekolah, penegakan jam kerja, kontrak kinerja, dan reward berbasis capaian terukur.',
    icon: 'CheckSquare'
  },
  AUTHORITATIVE: {
    id: 'authoritative',
    name: 'Otoritatif / Pengarah',
    shortName: 'Otoritatif',
    englishName: 'Authoritative Leadership',
    color: '#EF4444', // Red
    bgLight: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
    description: 'Memberikan komando tegas dan instruksi jelas di saat krisis, darurat, atau ketika arah sekolah mulai menyimpang dari regulasi.',
    keyAction: 'Pengambilan keputusan cepat saat krisis, batas toleransi pelanggaran berat, dan komando darurat.',
    icon: 'ShieldAlert'
  },
  SERVANT: {
    id: 'servant',
    name: 'Melayani (Servant)',
    shortName: 'Servant',
    englishName: 'Servant Leadership',
    color: '#14B8A6', // Teal
    bgLight: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800',
    description: 'Menempatkan kebutuhan pertumbuhan guru, staf, dan murid di atas ego pimpinan. Menyingkirkan hambatan kerja tim di lapangan.',
    keyAction: 'Menyediakan sarana yang dibutuhkan guru, mendampingi staf di lini terdepan, dan kerendahan hati.',
    icon: 'HandHelping'
  },
  STRATEGIC: {
    id: 'strategic',
    name: 'Strategis / Visioner',
    shortName: 'Strategis',
    englishName: 'Strategic Leadership',
    color: '#6366F1', // Indigo
    bgLight: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    description: 'Menganalisis data makro, memetakan aset sekolah, merancang mitigasi risiko, dan membangun kemitraan berdampak jangka panjang.',
    keyAction: 'Rapor Pendidikan, RKAS berbasis data, kemitraan DUDI/Komite, dan perencanaan suksesi institusi.',
    icon: 'Compass'
  }
};

export const STYLE_KEYS = Object.keys(LEADERSHIP_STYLES);

export const PHASES = {
  1: {
    number: 1,
    name: 'Membangun Arah',
    days: 'Hari 1 – 30',
    color: 'blue',
    badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    accentColor: '#3B82F6',
    description: 'Fokus pada fondasi visi, standar awal disiplin, pemetaan aset, audit realitas, dan quick wins yang membangun momentum.'
  },
  2: {
    number: 2,
    name: 'Membangun Kepercayaan',
    days: 'Hari 31 – 60',
    color: 'purple',
    badgeClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    accentColor: '#8B5CF6',
    description: 'Fokus pada empati mendalam, supervisi klinis non-menghakimi, keamanan psikologis guru, dan kolaborasi tanpa rasa takut.'
  },
  3: {
    number: 3,
    name: 'Membangun Kultur',
    days: 'Hari 61 – 90',
    color: 'emerald',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    accentColor: '#10B981',
    description: 'Fokus pada internalisasi nilai, pembiasaan mandiri tanpa diawasi, Komunitas Belajar berakar kuat, dan kepemimpinan berkelanjutan.'
  }
};
