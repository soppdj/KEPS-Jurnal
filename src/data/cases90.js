/**
 * 90 Kasus Kepemimpinan Situasional Kepala Sekolah Berdampak
 * Terbagi dalam 3 Fase:
 * - Fase 1: Membangun Arah (Hari 1–30)
 * - Fase 2: Membangun Kepercayaan (Hari 31–60)
 * - Fase 3: Membangun Kultur (Hari 61–90)
 */

export const CASES_90 = [
  // =========================================================================
  // FASE 1: MEMBANGUN ARAH (HARI 1 - 30)
  // Fokus: Visi, Standar Awal, Disiplin, Pemetaan Aset, Quick Wins
  // =========================================================================
  {
    day: 1,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Orientasi Pertama: Membaca Denyut Nadi Sekolah',
    narrative: 'Hari pertama Anda menginjakkan kaki sebagai Kepala Sekolah baru. Suasana ruang guru terbagi dalam kelompok-kelompok kecil. Ada tatapan penasaran, skeptis, dan beberapa guru senior tampak bersikap dingin menunggu apa yang akan Anda lakukan.',
    mindset: 'Jangan terburu-buru mengkritik masa lalu. Jadilah pengamat yang jeli dan rendah hati sebelum menetapkan komando.',
    style: 'servant',
    actions: [
      'Menyapa langsung seluruh staf tata usaha, guru, dan penjaga sekolah tanpa sekat protokoler.',
      'Melakukan inspeksi keliling sekolah (walking the floor) melihat kondisi fisik toilet, kelas, dan kantin.',
      'Mengadakan temu ramah informal 20 menit: mendengarkan harapan awal tanpa memberi janji berlebihan.',
      'Mencatat 5 temuan awal yang mendesak untuk ditata.'
    ],
    reflectionPrompt: 'Apa asumsi awal saya yang terbantahkan setelah melihat langsung denyut nadi sekolah hari ini?'
  },
  {
    day: 2,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Audit Realitas: Membedah Rapor Pendidikan Sekolah',
    narrative: 'Data Rapor Pendidikan menunjukkan indikator literasi dan numerasi siswa stagnan di level kuning, sementara iklim kebinekaan dan keamanan sekolah menunjukkan tren penurunan terselubung.',
    mindset: 'Data bukanlah penghakiman, melainkan kompas penunjuk jalan di mana energi kepemimpinan harus dicurahkan.',
    style: 'strategic',
    actions: [
      'Membedah indikator prioritas Rapor Pendidikan bersama Wakil Kepala Sekolah dan tim kurikulum.',
      'Mengidentifikasi 3 akar masalah utama (bukan sekadar gejala permukaan).',
      'Merumuskan narasi data sederhana yang mudah dipahami seluruh dewan guru.',
      'Menyusun infografis ringkas 1 lembar untuk transparansi mutu sekolah.'
    ],
    reflectionPrompt: 'Apakah saya memandang data ini sebagai beban administrasi atau panggilan nyata untuk transformasi murid?'
  },
  {
    day: 3,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Menghadapi Resistensi Guru Senior Apatis',
    narrative: 'Dalam rapat dinas, seorang guru senior yang berpengaruh berujar santai: "Kami sudah berganti 5 kepala sekolah di sini, Pak/Bu. Program seperti ini biasanya hanya hangat-hangat tahi ayam di awal."',
    mindset: 'Resistensi adalah bentuk ketakutan atau luka masa lalu yang belum sembuh. Hadapi dengan respek tulus, bukan arogansi jabatan.',
    style: 'emotional',
    actions: [
      'Menahan diri dari bereaksi defensif atau menunjukkan kekuasaan di depan forum.',
      'Mengajak guru senior tersebut berdialog empat mata sambil menikmati teh di sore hari.',
      'Mengakui jasa dan pengalaman panjang beliau dalam menjaga sekolah selama ini.',
      'Meminta masukan spesifik beliau tentang apa yang dulu pernah berhasil dan gagal.'
    ],
    reflectionPrompt: 'Bagaimana reaksi emosional pertama saya saat diuji di depan umum, dan apa yang bisa saya perbaiki?'
  },
  {
    day: 4,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Standar Disiplin Gerbang Pagi: Keteladanan 15 Menit',
    narrative: 'Banyak guru dan siswa terbiasa tiba mepet jam masuk atau terlambat 10-15 menit dengan berbagai dalil macet. Tata tertib sebelumnya hanya pajangan di dinding lorong.',
    mindset: 'Disiplin tidak bisa diperintahkan jika pimpinan tidak berdiri di garis terdepan.',
    style: 'authoritative',
    actions: [
      'Berdiri menyambut siswa dan guru di depan pintu gerbang utama 30 menit sebelum bel berbunyi.',
      'Menyapa dengan senyum ramah tanpa membawa buku catatan hukuman pada tahap awal.',
      'Mengamati pola kedatangan guru dan siswa yang terlambat tanpa memarahi.',
      'Mencatat faktor sistemik penyebab keterlambatan (angkutan, akses jalan, atau kebiasaan).'
    ],
    reflectionPrompt: 'Apakah kehadiran fisik saya di gerbang menularkan energi positif atau justru kecemasan bagi warga sekolah?'
  },
  {
    day: 5,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Quick Win #1: Kebersihan Sanitasi & Toilet Sekolah',
    narrative: 'Toilet siswa bau menyengat, air sering mati, dan kran rusak. Guru enggan menggunakan toilet bersama. Siswa merasa tidak nyaman di sekolah.',
    mindset: 'Perubahan kultur dimulai dari hal yang paling mendasar: martabat manusia dalam menjaga kebersihan fasilitas.',
    style: 'servant',
    actions: [
      'Mengalokasikan dana darurat operasional untuk memperbaiki sanitasi dan kran dalam 48 jam.',
      'Memastikan sabun, pengharum, dan pasokan air bersih berfungsi 100%.',
      'Membuat jadwal piket inspeksi toilet yang melibatkan kepala sekolah secara acak.',
      'Mengumumkan kepada siswa bahwa hak atas toilet yang bersih dan wangi telah dipenuhi.'
    ],
    reflectionPrompt: 'Seberapa cepat saya bergerak mengeksekusi kebutuhan riil yang menyangkut kenyamanan dasar warga sekolah?'
  },
  {
    day: 6,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Briefing Pagi 10 Menit: Mengganti Keluhan dengan Inspirasi',
    narrative: 'Sebelumnya, briefing pagi sering menjadi ajang mengomel, menyampaikan keluhan administratif yang bertele-tele, atau bahkan tidak dilaksanakan sama sekali.',
    mindset: 'Waktu pagi guru menentukan ritme pembelajaran anak di kelas sepanjang hari. Lindungi energi pagi mereka.',
    style: 'transformational',
    actions: [
      'Memulai briefing tepat waktu, membatasi durasi maksimal 10 menit berdiri.',
      'Membagikan 1 kutipan atau cerita keberhasilan kecil guru/murid hari kemarin.',
      'Menyampaikan 1 fokus utama aksi sekolah hari ini secara padat.',
      'Menutup dengan doa bersama dan saling melempar senyum semangat.'
    ],
    reflectionPrompt: 'Apakah pesan yang saya sampaikan pagi ini menambah motivasi mengajar guru atau menambah beban pikiran mereka?'
  },
  {
    day: 7,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Audit Keuangan & Transparansi Awal Dana BOS',
    narrative: 'Ada bisik-bisik ketidakpuasan di kalangan guru honorer terkait keterlambatan honor dan ketidakterbukaan alokasi anggaran belanja sekolah tahun lalu.',
    mindset: 'Kecurigaan tumbuh subur di ruang yang gelap. Kepercayaan lahir seketika saat pintu transparansi dibuka.',
    style: 'transactional',
    actions: [
      'Memeriksa buku kas umum dan SPJ bersama bendahara BOS secara teliti dan profesional.',
      'Memetakan kewajiban hak honor guru tidak tetap (GTT) dan pegawai tidak tetap (PTT).',
      'Merancang papan infografis rencana anggaran belanja sekolah (RKAS) yang transparan.',
      'Menegaskan komitmen pembayaran hak kerja tepat waktu sebagai prioritas utama.'
    ],
    reflectionPrompt: 'Apakah ada celah keraguan dalam pengelolaan anggaran yang belum saya bersihkan secara sistemik?'
  },
  {
    day: 8,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Menata Jam Mengajar Bebas Beban Titipan',
    narrative: 'Penyusunan jadwal pelajaran diwarnai lobi-lobi pribadi: ada guru minta hari tertentu kosong karena bisnis luar, sementara guru lain dibebani jam di ujung pekan.',
    mindset: 'Keadilan bukan memberi setiap orang kemauan mereka, melainkan menempatkan kepentingan belajar murid di atas segalanya.',
    style: 'democratic',
    actions: [
      'Membuka forum kurikulum bersama seluruh guru mata pelajaran secara kolektif.',
      'Menetapkan 3 prinsip dasar penyusunan jadwal: beban seimbang, fokus murid, dan transparansi.',
      'Menolak intervensi kepentingan non-akademik dengan santun dan berlandaskan aturan dinas.',
      'Mempublikasikan draf jadwal secara terbuka untuk masukan konstruktif.'
    ],
    reflectionPrompt: 'Apakah saya cukup berani menegakkan keadilan meski harus mengecewakan pihak yang terbiasa diistimewakan?'
  },
  {
    day: 9,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Menyusup ke Ruang Kelas: Observasi Pembelajaran Non-Supervisi',
    narrative: 'Banyak guru merasa takut jika kepala sekolah masuk kelas, mengira sedang diinspeksi untuk dicari kelemahannya dalam penilaian kinerja tahunan.',
    mindset: 'Tujuan hadir di kelas bukan untuk menghakimi guru, tetapi untuk memahami realitas interaksi murid dengan ilmu pengetahuan.',
    style: 'instructional',
    actions: [
      'Masuk ke 2 ruang kelas sebagai pengamat santai tanpa membawa lembar checklist penilaian formal.',
      'Duduk di barisan belakang, mengamati tingkat keterlibatan aktif siswa.',
      'Mengapresiasi usaha guru di hadapan para siswa sesaat sebelum meninggalkan kelas.',
      'Memberikan catatan kecil apresiatif di meja guru: "Terima kasih atas interaksi hangat dengan anak-anak tadi."'
    ],
    reflectionPrompt: 'Bagaimana perasaan guru saat saya hadir di kelasnya: merasa terancam atau merasa didukung?'
  },
  {
    day: 10,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Merumuskan "One School, One Vision" yang Membumi',
    narrative: 'Visi sekolah yang lama berupa kalimat panjang beranak-pinak, dihafal untuk akreditasi saja, namun tak seorang pun guru atau siswa yang mengingat maknanya.',
    mindset: 'Visi yang baik bukanlah jargon teoritis, melainkan kalimat pendek yang menggetarkan hati dan mudah diingat anak SD/SMP/SMA.',
    style: 'transformational',
    actions: [
      'Mengumpulkan perwakilan guru, komite, dan perwakilan siswa dalam lokakarya mini visi.',
      'Mengajukan pertanyaan pemantik: "Sekolah macam apa yang ingin kita kenang 5 tahun lagi?"',
      'Menyederhanakan visi ke dalam 1 kalimat kunci penggerak (tagline pembeda).',
      'Memasang visi baru di titik-titik strategis sekolah dengan desain modern dan elegan.'
    ],
    reflectionPrompt: 'Apakah visi ini mencerminkan impian bersama warga sekolah atau hanya ambisi pribadi saya semata?'
  },
  {
    day: 11,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Penanganan Kasus Perundungan (Bullying) Pertama',
    narrative: 'Terjadi insiden ejekan fisik di jam istirahat yang membuat seorang siswa menangis di pojok mushola dan enggan masuk kelas selama 2 hari.',
    mindset: 'Tidak ada toleransi untuk perundungan. Sekolah harus menjadi tempat paling aman kedua setelah pelukan ibu.',
    style: 'authoritative',
    actions: [
      'Memanggil segera tim Guru BK dan wali kelas untuk mendapatkan kronologi obyektif.',
      'Menjamin perlindungan psikologis bagi korban dan menghadirkan orang tua kedua belah pihak.',
      'Menegakkan konsekuensi edukatif yang tegas bagi pelaku tanpa mempermalukannya di depan umum.',
      'Menginstruksikan patroli guru pada jam-jam rawan (istirahat dan sudut sepi).'
    ],
    reflectionPrompt: 'Seberapa peka insting saya dalam mendeteksi penderitaan siswa yang terselubung di sekolah?'
  },
  {
    day: 12,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Membedah Kurikulum Operasional Satuan Pendidikan (KOSP)',
    narrative: 'Dokumen KOSP ternyata salinan tempel (copy-paste) dari sekolah lain, memuat karakteristik lingkungan dan potensi daerah yang sama sekali tidak relevan.',
    mindset: 'Kurikulum adalah nyawa keunikan sekolah. Jangan pernah meminjam baju orang lain untuk tubuh sendiri.',
    style: 'constructivist',
    actions: [
      'Menggelar sesi telaah KOSP bersama tim pengembang kurikulum sekolah.',
      'Memetakan karakteristik unik lokal: potensi pertanian/industri sekitar dan kearifan budaya sekolah.',
      'Menghapus bagian yang tidak aplikatif dan menggantinya dengan target kontekstual.',
      'Menyepakati rencana asesmen diagnostik awal bagi peserta didik baru.'
    ],
    reflectionPrompt: 'Apakah dokumen sekolah saya selama ini hidup dalam kenyataan atau sekadar tumpukan kertas pelengkap akreditasi?'
  },
  {
    day: 13,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Mengaktifkan Komite Sekolah yang Tertidur',
    narrative: 'Komite sekolah selama bertahun-tahun hanya dianggap stempel pencairan dana atau tukang minta sumbangan, sehingga para tokoh masyarakat enggan terlibat.',
    mindset: 'Komite sekolah adalah mitra strategis penjaga muruah sekolah, bukan juru bayar kebutuhan operasional.',
    style: 'strategic',
    actions: [
      'Mengundang pengurus komite sekolah dalam forum silaturahmi formal dan terhormat.',
      'Mempaparkan rencana strategis sekolah, capaian awal, dan tantangan riil tanpa meminta uang.',
      'Membuka ruang bagi tokoh masyarakat untuk memberikan ide penguatan relasi dengan dunia usaha/komunitas.',
      'Membentuk grup komunikasi rutin yang transparan mengenai dinamika sekolah.'
    ],
    reflectionPrompt: 'Bagaimana cara saya memperlakukan komite: sebagai pemohon bantuan atau mitra sejajar?'
  },
  {
    day: 14,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Menata Ruang Guru: Mencairkan Sekat Polaritas',
    narrative: 'Ruang guru terkotak-kotak secara fisik oleh lemari arsip tua dan partisi triplek yang memisahkan guru muda dan guru senior, menciptakan rasa dingin.',
    mindset: 'Arsitektur ruangan membentuk pola komunikasi. Runtuhkan sekat fisik untuk meruntuhkan sekat mental.',
    style: 'democratic',
    actions: [
      'Mengajak seluruh guru merancang ulang tata letak ruang guru di akhir pekan secara sukarela.',
      'Membongkar sekat-sekat isolasi dan menata meja dengan formasi bundar/terbuka yang memudahkan interaksi.',
      'Menyediakan sudut kopi dan teh bersama (pantry mini) yang ramah dan nyaman.',
      'Menikmati makan siang bersama di ruangan baru yang lebih terang dan lapang.'
    ],
    reflectionPrompt: 'Apakah ruang guru di sekolah saya sudah menjadi tempat yang membangkitkan inspirasi atau ruang kepenatan?'
  },
  {
    day: 15,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Evaluasi 2 Pekan Pertama: Cek Komitmen Tim Manajemen',
    narrative: 'Sebagian Wakil Kepala Sekolah dan staf kaur mulai merasa ritme kerja Anda terlalu cepat, sementara sebagian lainnya kebingungan dengan prioritas baru.',
    mindset: 'Kecepatan seorang pemimpin diukur bukan dari larinya sendiri, melainkan seberapa kompak pasukannya melangkah bersamanya.',
    style: 'transactional',
    actions: [
      'Mengadakan rapat evaluasi dua mingguan tertutup bersama para Wakil Kepala Sekolah.',
      'Mengevaluasi pembagian peran dan job description: apakah ada tumpang tindih tanggung jawab.',
      'Meminta masukan jujur dari tim: apa yang terasa terlalu berat dan butuh penyesuaian waktu.',
      'Menyepakati dashboard capaian mingguan yang sederhana menggunakan papan visual.'
    ],
    reflectionPrompt: 'Apakah saya sudah cukup jelas mendelegasikan wewenang atau masih terlalu mengontrol segalanya sendiri?'
  },
  {
    day: 16,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Menertibkan Kehadiran dan Jurnal Mengajar Kelas',
    narrative: 'Beberapa kelas sering kosong tanpa guru karena guru izin mendadak atau sekadar memberikan tugas lembar kerja (LKS) lalu meninggalkan kelas.',
    mindset: 'Hak belajar murid adalah amanah yang dipertanggungjawabkan di hadapan Tuhan dan masa depan bangsa.',
    style: 'authoritative',
    actions: [
      'Mengaktifkan sistem piket harian terstruktur dengan buku kendali kelas yang terverifikasi.',
      'Menetapkan SOP: guru berhalangan hadir wajib mengirim rencana pembelajaran pengganti H-1.',
      'Kepala sekolah dan guru piket masuk ke kelas kosong untuk membawakan sesi literasi inspiratif.',
      'Membahas tren jam kosong dalam rapat dewan guru tanpa mempermalukan individu secara terbuka.'
    ],
    reflectionPrompt: 'Bagaimana perasaan saya saat melihat kelas terlantar, dan apakah tindakan saya sudah melindungi hak anak?'
  },
  {
    day: 17,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Pemberdayaan Tenaga Administrasi (TU) dan Penjaga Sekolah',
    narrative: 'Staf TU dan petugas kebersihan kerap dipandang kelas dua, tidak pernah diikutsertakan dalam rapat penting, dan fasilitas kerjanya memprihatinkan.',
    mindset: 'Ketahanan sebuah kapal bergantung pada ketangguhan ruang mesin, bukan sekadar keanggunan anjungan nakhoda.',
    style: 'servant',
    actions: [
      'Mengadakan dialog khusus dengan staf TU, operator sekolah, dan petugas kebersihan di ruang kepala sekolah.',
      'Menginventarisasi kebutuhan mendesak: komputer yang lambat, alat kebersihan layak, dan asupan vitamin.',
      'Memberikan apresiasi atas peran vital mereka dalam kelancaran operasional sekolah.',
      'Menyusun skema pembagian insentif dan pelatihan peningkatan keterampilan IT staf TU.'
    ],
    reflectionPrompt: 'Apakah saya sudah memperlakukan setiap insan sekolah dengan harkat kemanusiaan yang setara?'
  },
  {
    day: 18,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Inisiasi 15 Menit Literasi Pagi yang Bermakna',
    narrative: 'Program membaca sebelum masuk kelas hanya formalitas: siswa membaca komik di bawah meja atau guru sibuk mengisi presensi tanpa mendampingi.',
    mindset: 'Literasi bukan sekadar mengeja teks, melainkan menyalakan rasa ingin tahu dan nalar kritis siswa.',
    style: 'instructional',
    actions: [
      'Menyusun panduan praktis literasi pagi: membaca nyaring, berbagi intisari, dan pojok baca kelas.',
      'Kepala sekolah ikut membaca buku di tengah-tengah siswa di selasar sekolah selama 15 menit.',
      'Memberi ruang bagi 2 siswa setiap Jumat untuk bercerita buku yang dibacanya di depan umum.',
      'Memperkaya koleksi buku bacaan non-pelajaran di perpustakaan melalui gerakan donasi alumni.'
    ],
    reflectionPrompt: 'Apakah saya sendiri rutin membaca buku di hadapan guru dan siswa saya?'
  },
  {
    day: 19,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Menghadapi Kritik Orang Tua Murid di Media Sosial',
    narrative: 'Seorang wali murid mengunggah keluhan di media sosial mengenai penarikan uang seragam atau fasilitas olahraga sekolah yang belum selesai.',
    mindset: 'Kritik pedas di ruang publik adalah tanda ada saluran komunikasi formal yang tersumbat. Jangan lawan api dengan minyak.',
    style: 'emotional',
    actions: [
      'Menghubungi langsung orang tua murid tersebut dengan nada santun dan mengundang ke sekolah.',
      'Menjelaskan fakta dan kebijakan secara transparan tanpa menyalahkan orang tua.',
      'Menyediakan kanal resmi aduan langsung ke kepala sekolah (kotak saran & hotline WA khusus).',
      'Membuat klarifikasi resmi sekolah yang santun, solutif, dan tidak defensif.'
    ],
    reflectionPrompt: 'Apakah respon saya saat dikritik didorong oleh pembelaan ego pribadi atau keinginan memperbaiki institusi?'
  },
  {
    day: 20,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Quick Win #2: Ruang UKS dan Pertolongan Pertama yang Layak',
    narrative: 'Ruang UKS kotor, obat-obatan kadaluwarsa, tempat tidur berdebu, dan tidak ada petugas yang siap siaga saat ada siswa pingsan saat upacara.',
    mindset: 'Kesehatan fisik siswa adalah prasyarat utama konsentrasi belajar. Ruang sakit tidak boleh menambah sakit.',
    style: 'servant',
    actions: [
      'Bekerja sama dengan Puskesmas setempat untuk pembaruan logistik P3K dan sertifikasi kader UKS.',
      'Meremajakan tempat tidur, sprei bersih, dan ventilasi udara ruang UKS.',
      'Melatih tim Palang Merah Remaja (PMR) siswa dengan bimbingan guru pembina yang antusias.',
      'Menetapkan SOP penanganan darurat siswa sakit menuju fasilitas kesehatan rujukan.'
    ],
    reflectionPrompt: 'Seberapa cepat tindakan penyelamatan sekolah jika terjadi insiden darurat medis pada anak didik kita?'
  },
  {
    day: 21,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Audit Beban Administrasi Guru: Kurangi Laporan Nirfaedah',
    narrative: 'Guru mengeluh kehabisan tenaga setiap malam karena harus mengisi berbagai format laporan administrasi berulang yang tidak pernah dibaca siapa pun.',
    mindset: 'Tugas suci guru adalah merawat interaksi jiwa dengan murid di kelas, bukan menjadi buruh ketik dokumen mati.',
    style: 'constructivist',
    actions: [
      'Menyisir seluruh format laporan internal sekolah dan memangkas 40% dokumen yang redundan.',
      'Menyederhanakan format RPP/Modul Ajar ke format esensial yang fokus pada asesmen nyata.',
      'Menyediakan template digital otomatis untuk presensi dan jurnal mengajar.',
      'Mendeklarasikan fokus pekanan: "Energi untuk Mengajar, Bukan Lembar Kertas Laporan."'
    ],
    reflectionPrompt: 'Apakah kebijakan administrasi saya membebaskan guru atau justru membelenggu kreativitas mereka?'
  },
  {
    day: 22,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Penataan Parkir & Estetika Halaman Depan Sekolah',
    narrative: 'Halaman depan sekolah semrawut oleh motor guru, pedagang liar di pagar, dan tumpukan barang rongsokan di sudut lapangan.',
    mindset: 'Wajah luar sekolah memancarkan kedisiplinan dan ketertiban pikiran orang-orang yang ada di dalamnya.',
    style: 'transactional',
    actions: [
      'Menata zonasi parkir yang rapi untuk kendaraan roda dua dan roda empat.',
      'Berdialog humanis dengan pedagang kaki lima di sekitar pagar untuk menata kebersihan bersama.',
      'Membersihkan sudut-sudut barang bekas dan menata pot tanaman hijau di sepanjang koridor.',
      'Melibatkan OSIS/pengurus siswa dalam kampanye menjaga keindahan fasad sekolah.'
    ],
    reflectionPrompt: 'Ketika tamu pertama kali datang ke sekolah saya, kesan apa yang terpancar dari pintu gerbang?'
  },
  {
    day: 23,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Koordinasi dengan Pengawas Sekolah & Dinas Pendidikan',
    narrative: 'Pengawas sekolah selama ini dianggap beban kunjungan formalitas yang menuntut berkas tumpukan instrumen supervisi tanpa solusi nyata.',
    mindset: 'Jadikan pengawas pembina sebagai mentor dan advokat kemajuan sekolah, bukan hakim pemeriksa berkas.',
    style: 'strategic',
    actions: [
      'Mengirimkan undangan resmi kepada pengawas sekolah untuk diskusi kemajuan program 30 hari.',
      'Menyajikan data Rapor Pendidikan dan capaian aksi perbaikan nyata yang sudah dimulai.',
      'Meminta masukan regulatif dan bimbingan strategis untuk mitigasi kendala sekolah.',
      'Membangun komunikasi proaktif dan transparan dengan bidang terkait di Dinas Pendidikan.'
    ],
    reflectionPrompt: 'Apakah saya mampu memposisikan sekolah sebagai teladan akuntabilitas di mata dinas pembina?'
  },
  {
    day: 24,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Pengenalan Praktik Baik Mengajar: Sesi Kilat 30 Menit',
    narrative: 'Banyak guru mengajar dengan cara monoton (ceramah tanpa jeda) karena tidak pernah melihat rekan sejawat mempraktikkan metode baru yang mengasyikkan.',
    mindset: 'Guru belajar paling baik bukan dari teori pakar luar, melainkan dari rekan sejawat di ruang sebelah.',
    style: 'instructional',
    actions: [
      'Memilih 1 guru muda yang kreatif untuk membagikan praktik baik permainan edukatif 15 menit.',
      'Mengadakan forum santai "Kopi Praktik Baik" setelah jam mengajar berakhir.',
      'Memfasilitasi tanya jawab terbuka tanpa saling menggurui.',
      'Memberikan piagam apresiasi sederhana bagi guru yang berani berbagi ilmu.'
    ],
    reflectionPrompt: 'Sudahkah saya membuka panggung bagi guru-guru hebat di sekolah ini untuk bersinar?'
  },
  {
    day: 25,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Menangani Konflik Kepentingan Antara Wakil Kepala Sekolah',
    narrative: 'Waka Kesiswaan dan Waka Kurikulum bersitegang terkait pemakaian jam belajar untuk latihan perlombaan seni budaya yang mendesak.',
    mindset: 'Konflik antar tim manajemen melemahkan seluruh barisan. Pemimpin harus hadir sebagai kompas kepentingan murid.',
    style: 'democratic',
    actions: [
      'Memanggil kedua wakil kepala sekolah dalam forum mediasi tertutup.',
      'Mendengarkan sudut pandang masing-masing tanpa memotong pembicaraan.',
      'Mengarahkan titik temu: murid tetap mendapatkan materi esensial dengan dispensasi terjadwal.',
      'Menegaskan prinsip kerja tim: sukses kesiswaan adalah sukses kurikulum, dan sebaliknya.'
    ],
    reflectionPrompt: 'Apakah saya mampu bersikap adil dan meredakan ego bawahan tanpa memihak secara emosional?'
  },
  {
    day: 26,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Merespon Keluhan Siswa: Kotak Aspirasi Murid Dibuka',
    narrative: 'Siswa merasa suara mereka tidak pernah didengar: guru BK galak, kantin mahal dan tidak higienis, serta tugas pekerjaan rumah (PR) menumpuk berlebihan.',
    mindset: 'Murid adalah konsumen utama pendidikan. Sekolah ada demi mereka, bukan sebaliknya.',
    style: 'servant',
    actions: [
      'Membuka kotak aspirasi murid dan membaca seluruh surat masukan bersama tim kesiswaan.',
      'Memilih 3 isu terpenting dan memberikan respon terbuka pada saat upacara bendera hari Senin.',
      'Menetapkan kebijakan pembatasan beban PR lintas mata pelajaran agar siswa cukup istirahat.',
      'Membentuk forum dialog "Temu Kepala Sekolah dan Perwakilan Murid" bulanan.'
    ],
    reflectionPrompt: 'Apakah suara murid di sekolah saya benar-benar diperhitungkan atau hanya dianggap angin lalu?'
  },
  {
    day: 27,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Pemeriksaan Kesiapan Laboratorium Komputer & IPA',
    narrative: 'Laboratorium komputer berdebu, kabel semrawut, dan sebagian CPU rusak dibiarkan bertahun-tahun menjelang persiapan asesmen nasional.',
    mindset: 'Kesiapan fasilitas pembelajaran mencerminkan kesiapan sekolah menyambut masa depan anak didik.',
    style: 'strategic',
    actions: [
      'Meninjau kondisi fisik seluruh perangkat lab komputer bersama tim IT sekolah.',
      'Melakukan inventarisasi barang rusak yang masih bisa direparasi secara mandiri.',
      'Menyusun jadwal pemeliharaan berkala dan skema pengamanan instalasi kelistrikan.',
      'Memastikan kesiapan koneksi internet stabil dengan bandwidth yang mencukupi.'
    ],
    reflectionPrompt: 'Sejauh mana kesiapan sarana sekolah mendukung pembelajaran abad ke-21 yang mandiri?'
  },
  {
    day: 28,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Ketegasan Menolak Titipan Siswa di Luar Kuota Resmi',
    narrative: 'Menjelang seleksi pindahan siswa, Anda didatangi oknum tokoh lokal yang meminta memasukkan kerabatnya tanpa melalui prosedur resmi dan melampaui kapasitas kelas.',
    mindset: 'Integritas diuji saat kita sendirian di dalam ruangan berhadapan dengan tawaran kompromi yang menggiurkan.',
    style: 'authoritative',
    actions: [
      'Menyampaikan penolakan secara santun namun sangat tegas berlandaskan juknis dinas dan daya tampung kelas.',
      'Menjelaskan dampak negatif terhadap kenyamanan belajar siswa jika rasio kelas dipaksakan over-kuota.',
      'Mendokumentasikan seluruh proses pendaftaran secara transparan di sistem PPDB.',
      'Melaporkan kronologi secara berjenjang kepada pimpinan dinas jika ada tekanan intimidatif.'
    ],
    reflectionPrompt: 'Apakah saya berani membayar harga sebuah integritas demi melindungi prinsip keadilan?'
  },
  {
    day: 29,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Konsolidasi Akhir Bulan Pertama: Merayakan Quick Wins',
    narrative: '30 hari pertama telah berlalu dengan berbagai perbaikan cepat: toilet bersih, disiplin gerbang membaik, dan transparansi anggaran mulai terbuka.',
    mindset: 'Rayakan kemajuan kecil. Keberhasilan kecil yang diapresiasi akan melahirkan energi untuk lompatan besar.',
    style: 'transformational',
    actions: [
      'Mengadakan tasyakuran sederhana minum teh dan makan tumpeng/kudapan lokal bersama seluruh staf.',
      'Menampilkan tayangan foto transformasi "Sebelum & Sesudah 30 Hari Pertama" di layar proyektor.',
      'Menyebutkan nama-nama guru dan staf penjaga yang telah bekerja keras di balik layar.',
      'Menegaskan pesan: "Kita telah membuktikan bahwa perubahan itu mungkin jika kita melangkah bersama."'
    ],
    reflectionPrompt: 'Apakah perayaan hari ini berhasil menumbuhkan rasa bangga dan optimisme baru di dada warga sekolah?'
  },
  {
    day: 30,
    phase: 1,
    phaseName: 'Membangun Arah',
    title: 'Milestone 30 Hari: Laporan Evaluasi Fase 1 untuk Pengawas',
    narrative: 'Fase 1 (Membangun Arah) resmi ditutup hari ini. Saatnya mendokumentasikan capaian, data dasar, dan refleksi kepemimpinan sebagai portofolio akuntabel.',
    mindset: 'Kepemimpinan berdampak adalah kepemimpinan yang dapat diukur, dipertanggungjawabkan, dan diwariskan.',
    style: 'strategic',
    actions: [
      'Menyusun dokumen ringkasan eksekutif 30 hari (Milestone 1: Membangun Arah).',
      'Mencetak dan menandatangani Laporan Portofolio 30 Hari untuk Pengawas Pembina dan Dinas Pendidikan.',
      'Mengadakan refleksi mandiri: membaca radar kepemimpinan yang telah tercatat selama sebulan.',
      'Menyiapkan transisi energi menuju Fase 2: Membangun Kepercayaan.'
    ],
    reflectionPrompt: 'Apakah arah baru yang saya canangkan sudah dipahami dan diyakini oleh seluruh warga sekolah?'
  },

  // =========================================================================
  // FASE 2: MEMBANGUN KEPERCAYAAN (HARI 31 - 60)
  // Fokus: Empati, Supervisi Klinis, Keamanan Psikologis, Mengurai Resistensi
  // =========================================================================
  {
    day: 31,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Transisi Fase: Deklarasi Keamanan Psikologis (Psychological Safety)',
    narrative: 'Setelah fondasi arah berdiri, saatnya membangun kepercayaan batin. Banyak guru masih enggan mengemukakan kesulitan mengajarnya karena takut dinilai tidak kompeten.',
    mindset: 'Di sekolah yang hebat, guru tidak takut mengakui kesalahannya; mereka takut menyembunyikan masalah yang merugikan murid.',
    style: 'emotional',
    actions: [
      'Membuka sesi dinas awal bulan kedua dengan berbagi pengalaman kegagalan mengajar pribadi kepala sekolah.',
      'Mendeklarasikan ruang guru sebagai zona aman untuk berpendapat tanpa cemas dicemooh.',
      'Menyepakati aturan komunikasi: dengarkan hingga selesai sebelum merespon masukan rekan sejawat.',
      'Menghapus tradisi sanksi sosial terhadap guru yang melakukan kekeliruan eksperimen belajar.'
    ],
    reflectionPrompt: 'Apakah guru-guru di sekolah saya sudah merasa aman untuk jujur di depan saya?'
  },
  {
    day: 32,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Supervisi Klinis Humanis: Pra-Observasi Tanpa Stres',
    narrative: 'Jadwal supervisi akademik dimulai. Pengalaman masa lalu membuat guru insomnia dan sibuk membuat RPP tebal demi memenuhi instrumen borang.',
    mindset: 'Supervisi klinis adalah bimbingan medis bagi proses belajar, bukan pengadilan atas kompetensi guru.',
    style: 'instructional',
    actions: [
      'Melakukan dialog pra-observasi santai 15 menit dengan guru yang akan disupervisi.',
      'Menanyakan: "Bagian mana dari pembelajaran yang paling ingin Bapak/Ibu kembangkan bersama saya?"',
      'Menyepakati fokus 1 keterampilan spesifik yang ingin diamati (misal: teknik bertanya pemantik).',
      'Menegaskan bahwa tujuan supervisi adalah kemitraan reflektif untuk murid.'
    ],
    reflectionPrompt: 'Apakah sesi pra-observasi saya berhasil meredakan ketegangan mental guru?'
  },
  {
    day: 33,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Mendengarkan Aktif Non-Defensif saat Menghadapi Keluhan',
    narrative: 'Seorang guru senior mendatangi ruangan Anda dengan emosi meluap, mengeluhkan pembagian tugas tambahan dan merasa martabatnya direndahkan oleh rekan junior.',
    mindset: 'Ketika seseorang sedang marah, dengarkan emosinya terlebih dahulu sebelum menyelesaikan substansi masalahnya.',
    style: 'emotional',
    actions: [
      'Mempersilakan duduk, menawarkan air minum, dan mendengarkan keluhan selama 10 menit tanpa interupsi.',
      'Melakukan parafrase: "Saya menangkap bahwa Ibu merasa kerja keras Ibu selama ini kurang dihargai, benar demikian?"',
      'Menghindari kalimat membela diri atau menyalahkan sistem pada respon awal.',
      'Mengajak merumuskan solusi bersama yang saling menghormati peran kedua belah pihak.'
    ],
    reflectionPrompt: 'Apakah saya mampu mengendalikan dorongan untuk memotong pembicaraan saat emosi lawan bicara meninggi?'
  },
  {
    day: 34,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Supervisi Klinis: Observasi Kelas yang Mendalam',
    narrative: 'Hari observasi kelas tiba. Anda hadir di kelas seorang guru matematika yang kesulitan mengaktifkan siswa perempuan di deretan belakang.',
    mindset: 'Jangan mendominasi jalannya kelas. Jadilah cermin yang merekam realitas dengan jernih dan penuh welas asih.',
    style: 'instructional',
    actions: [
      'Duduk tenang di sudut kelas mencatat fakta perilaku murid dan alur pertanyaan guru.',
      'Mencatat momen-momen kecil keberhasilan guru dalam mencairkan suasana.',
      'Tidak menginterupsi penjelasan guru atau mengambil alih mikrofon mengajar.',
      'Tersenyum dan mengangguk memberikan penguatan positif kepada guru saat tatap mata berlangsung.'
    ],
    reflectionPrompt: 'Apakah catatan observasi saya berisi fakta obyektif atau sekadar asumsi subyektif pribadi saya?'
  },
  {
    day: 35,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Supervisi Klinis Pasca-Observasi: Seni Coaching Reflektif',
    narrative: 'Sesi pasca-observasi sering menjadi ajang kepala sekolah menceramahi kekurangan guru secara searah.',
    mindset: 'Kesadaran yang tumbuh dari refleksi mandiri guru jauh lebih berdaya tahan daripada seratus nasihat kepala sekolah.',
    style: 'constructivist',
    actions: [
      'Memulai dengan pertanyaan pemantik: "Bagaimana perasaan Bapak/Ibu setelah sesi tadi? Apa yang berjalan paling baik?"',
      'Menampilkan data catatan fakta interaksi siswa tanpa menghakimi.',
      'Mengajak guru menganalisis sendiri: "Menurut Bapak/Ibu, apa yang membuat anak di sudut belakang tadi pasif?"',
      'Menyepakati 1 rencana tindak lanjut eksperimen mengajar untuk pertemuan pekan depan.'
    ],
    reflectionPrompt: 'Berapa persen porsi bicara saya dibanding porsi bicara guru dalam sesi pasca-observasi ini?'
  },
  {
    day: 36,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Apresiasi Nyata untuk Guru Honorer di Balik Layar',
    narrative: 'Dua orang guru honorer muda bekerja lembur hingga malam mempersiapkan data akreditasi dan modul ajar tanpa pernah mengeluh atau menuntut imbalan.',
    mindset: 'Pemimpin yang tidak pernah melihat pengorbanan kecil pasukannya akan kehilangan kesetiaan mereka dalam perang besar.',
    style: 'servant',
    actions: [
      'Menuliskan surat ucapan terima kasih tulisan tangan pribadi kepada kedua guru honorer tersebut.',
      'Memberikan insentif tambahan dari dana operasional yang sah secara legal.',
      'Menyebutkan kontribusi konkret mereka di depan forum rapat dewan guru.',
      'Memberikan prioritas rekomendasi beasiswa/pelatihan pengembangan profesi bersertifikat.'
    ],
    reflectionPrompt: 'Kapan terakhir kali saya memberikan apresiasi personal yang menyentuh hati rekan kerja saya?'
  },
  {
    day: 37,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Menangani Masalah Pribadi Guru yang Berdampak pada Kelas',
    narrative: 'Seorang guru teladan tiba-tiba sering melamun, terlambat mengoreksi tugas siswa, dan tampak kurus karena sedang menghadapi masalah berat dalam rumah tangganya.',
    mindset: 'Sebelum kita menuntut kinerja profesional dari seorang guru, penuhi terlebih dahulu empati kemanusiaannya.',
    style: 'emotional',
    actions: [
      'Mengajak guru berbicara secara privat di luar lingkungan sekolah dalam suasana kekeluargaan.',
      'Menawarkan keringanan beban tugas tambahan sementara waktu tanpa memotong hak finansialnya.',
      'Menjaga kerahasiaan masalah pribadi guru secara ketat dari konsumsi publik sekolah.',
      'Memberikan dukungan moril dan memastikan guru merasa sekolah adalah keluarga yang selalu ada.'
    ],
    reflectionPrompt: 'Apakah kehadiran saya sebagai kepala sekolah menjadi pelindung atau menambah beban stres rekan kerja saya?'
  },
  {
    day: 38,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Menciptakan Ruang Kolaborasi Lintas Mata Pelajaran',
    narrative: 'Guru IPA, Bahasa Indonesia, dan Seni Budaya berjalan sendiri-sendiri, menganggap mata pelajarannya yang paling penting dan bersaing memperebutkan waktu tugas murid.',
    mindset: 'Ilmu pengetahuan di dunia nyata tidak pernah terkotak-kotak. Kolaborasi guru adalah kunci pembelajaran bermakna bagi murid.',
    style: 'transformational',
    actions: [
      'Mengumpulkan ketiga guru mata pelajaran dalam lokakarya santai perencanaan proyek bersama (PBL).',
      'Merumuskan 1 tema terpadu: misal "Kearifan Konservasi Sungai Lokal" yang memadukan ketiga disiplin ilmu.',
      'Menyepakati 1 asesmen bersama sehingga siswa tidak terbebani tugas berganda.',
      'Memberikan pendampingan selama perencanaan hingga pelaksanaan pameran karya siswa.'
    ],
    reflectionPrompt: 'Apakah saya sudah berhasil meruntuhkan ego sektoral mata pelajaran di dewan guru?'
  },
  {
    day: 39,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Menghadapi Desas-Desus dan Gosip Negatif di Ruang Staf',
    narrative: 'Beredar isu burung bahwa kepala sekolah memiliki guru kesayangan yang selalu diberi tugas dinas luar kota dan perjalanan menguntungkan.',
    mindset: 'Gosip mati saat berhadapan dengan fakta transparan dan keadilan distribusi kesempatan.',
    style: 'democratic',
    actions: [
      'Membuka data rotasi tugas luar dinas secara gamblang di papan pengumuman internal guru.',
      'Membuat kriteria objektif dan transparan untuk penugasan diklat luar kota berdasarkan kompetensi dan giliran.',
      'Membahas isu tersebut secara santai dan dewasa dalam temu teh mingguan: "Mari saling bertanya langsung jika ada keraguan."',
      'Memastikan setiap guru tanpa kecuali mendapatkan kesempatan mengembangkan kapasitas diri.'
    ],
    reflectionPrompt: 'Apakah ada keputusan saya yang secara tidak sadar memicu persepsi favoritisme?'
  },
  {
    day: 40,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Pelibatan Orang Tua dalam Program Belajar, Bukan Hanya Iuran',
    narrative: 'Pertemuan paguyuban kelas selama ini hanya dihadiri sedikit orang tua karena selalu diakhiri dengan permohonan sumbangan atau keluhan tentang anak nakal.',
    mindset: 'Orang tua menitipkan harta paling berharganya kepada sekolah. Rangkul mereka sebagai mitra asuh bersama.',
    style: 'constructivist',
    actions: [
      'Menggelar program "Kelas Inspirasi Orang Tua": mengundang wali murid berbagi profesi di depan kelas anak-anak.',
      'Membuat buku komunikasi dua arah berbasis digital/buku saku tanpa memungut biaya.',
      'Menghilangkan agenda pembicaraan uang dalam temu kelas; fokus pada kemajuan bakat dan karakter anak.',
      'Mengadakan sesi parenting bersama psikolog/pemerhati anak secara gratis di aula sekolah.'
    ],
    reflectionPrompt: 'Apakah orang tua murid merasa dihargai martabatnya saat melangkah masuk ke gerbang sekolah saya?'
  },
  {
    day: 41,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Mendampingi Guru yang Ditinggalkan oleh Perkembangan Teknologi',
    narrative: 'Seorang guru senior menjelang pensiun merasa stres dan rendah diri saat harus menggunakan platform digital atau aplikasi raport kurikulum merdeka.',
    mindset: 'Penguasaan teknologi adalah masalah latihan, namun kematangan kebijaksanaan adalah mutiara tak ternilai.',
    style: 'servant',
    actions: [
      'Memasangkan guru senior tersebut dengan 1 guru muda sebagai mentor digital personal (buddy system).',
      'Menghindari nada merendahkan dalam pelatihan internal teknologi sekolah.',
      'Menugaskan beliau pada peran-peran strategis yang membutuhkan kearifan mendalam: pembinaan karakter siswa.',
      'Memberikan apresiasi saat beliau berhasil mengunggah nilai perdananya secara mandiri.'
    ],
    reflectionPrompt: 'Apakah saya memandang guru senior sebagai beban transisi atau sebagai pilar moral sekolah?'
  },
  {
    day: 42,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Mengurai Seteru Lama Antara Dua Tokoh Guru Senior',
    narrative: 'Dua guru senior tidak saling bertegur sapa selama 3 tahun akibat perbedaan pilihan pemilihan organisasi profesi masa lampau, yang berimbas pada perpecahan kubu di ruang guru.',
    mindset: 'Perdamaian tidak bisa dipaksakan lewat SK dinas, tetapi bisa disemai melalui misi luhur bersama yang melampaui ego.',
    style: 'emotional',
    actions: [
      'Menugaskan kedua guru tersebut dalam satu kepanitiaan bersama untuk misi sosial amal sekolah.',
      'Mengadakan dialog informal santai tanpa membahas masa lalu secara menyudutkan.',
      'Mendorong keduanya saling berbagi peran kepemimpinan dalam acara pelepasan siswa atau hari besar.',
      'Memberikan apresiasi tulus saat keduanya mulai saling menyapa dan bekerja sama di meja yang sama.'
    ],
    reflectionPrompt: 'Bagaimana kemampuan diplomasi batin saya dalam menyatukan hati yang retak di lingkungan kerja?'
  },
  {
    day: 43,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Transparansi Kinerja: Kepala Sekolah Menerima Evaluasi Terbuka',
    narrative: 'Pemimpin yang menuntut guru terus berkembang harus bersedia membuka diri untuk dievaluasi oleh orang-orang yang dipimpinnya.',
    mindset: 'Kerendahan hati seorang pemimpin tercermin dari kesiapannya mendengar kelemahan dirinya dari lisan pasukannya.',
    style: 'democratic',
    actions: [
      'Menyebarkan kuesioner anonim umpan balik kepemimpinan kepala sekolah kepada seluruh guru dan staf.',
      'Menanyakan 3 hal sederhana: apa yang perlu dipertahankan, diperbaiki, dan dihentikan oleh kepala sekolah.',
      'Membaca seluruh masukan dengan hati lapang tanpa berupaya mencari tahu siapa pengirimnya.',
      'Menyampaikan komitmen perbaikan diri di depan dewan guru dalam pertemuan dinas berikutnya.'
    ],
    reflectionPrompt: 'Apakah ego saya terluka saat membaca kritik tajam dari staf, ataukah saya melihatnya sebagai cermin pembersih jiwa?'
  },
  {
    day: 44,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Membangkitkan Semangat Siswa Berprestasi Rendah',
    narrative: 'Kelompok siswa yang sering remedial dilabeli "anak bermasalah" oleh beberapa guru dan dijauhi dalam kegiatan perlombaan sekolah.',
    mindset: 'Tidak ada anak yang bodoh. Yang ada hanyalah anak yang belum menemukan cara belajar yang cocok dengan keunikannya.',
    style: 'transformational',
    actions: [
      'Mengumpulkan siswa-siswa yang sering remedial dalam sesi motivasi makan siang hangat bersama kepala sekolah.',
      'Mengidentifikasi bakat non-akademik mereka: kemampuan musik, olahraga, robotik, atau kepemimpinan sosial.',
      'Membuka panggung ekstrakurikuler baru yang memberi ruang tampil bagi mereka.',
      'Mengingatkan dewan guru untuk berhenti menggunakan label negatif yang membunuh rasa percaya diri anak.'
    ],
    reflectionPrompt: 'Apakah sekolah saya hanya merayakan anak berprestasi akademik dan melupakan mereka yang tertatih-tatih?'
  },
  {
    day: 45,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Evaluasi Tengah Semester: Refleksi Bersama Rapor Belajar',
    narrative: 'Tengah semester berjalan. Ada penurunan semangat kerja guru karena kejenuhan rutinitas harian dan beban administrasi.',
    mindset: 'Ritme kerja maraton membutuhkan stasiun penyegaran air minum agar pelari tidak tumbang sebelum garis finis.',
    style: 'constructivist',
    actions: [
      'Menyelenggarakan "Refleksi Jeda Semester" tanpa agenda rapat kaku di tempat yang teduh di sekolah.',
      'Memfasilitasi sesi curhat terbuka dan permainan tim (ice-breaking) yang memicu tawa riang.',
      'Mengevaluasi target semester: mana yang realistis diteruskan dan mana yang perlu dirasionalisasi.',
      'Memberikan kudapan sehat dan waktu istirahat yang cukup sebelum memulai paruh kedua.'
    ],
    reflectionPrompt: 'Sudahkah saya menjadi sumber energi positif yang mengisi ulang baterai kelelahan tim saya?'
  },
  {
    day: 46,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Kemitraan Sejati dengan Tokoh Agama & Komunitas Sekitar',
    narrative: 'Sekolah kerap dikeluhkan warga sekitar karena kebisingan suara bel atau sampah yang berserakan di parit perbatasan perumahan.',
    mindset: 'Sekolah adalah mercusuar kampung. Hubungan baik dengan tetangga adalah benteng pertahanan moral sekolah.',
    style: 'strategic',
    actions: [
      'Silaturahmi ke rumah RT/RW dan tokoh agama sekitar sekolah membawa bingkisan persaudaraan.',
      'Menyelenggarakan aksi bakti sosial jumat bersih siswa membersihkan parit dan fasilitas umum sekitar sekolah.',
      'Menyediakan fasilitas lapangan sekolah untuk kegiatan olahraga pemuda sekitar pada waktu yang ditentukan.',
      'Membuka komunikasi langsung jika ada warga yang merasa terganggu oleh operasional sekolah.'
    ],
    reflectionPrompt: 'Apakah warga sekitar merasakan keberkahan kehadiran sekolah ini atau justru menganggapnya gangguan?'
  },
  {
    day: 47,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Mitigasi Bencana & Simulasi Evakuasi Tanggap Darurat',
    narrative: 'Sekolah berada di daerah rawan gempa/banjir, namun jalur evakuasi tertutup gudang barang dan warga sekolah tidak tahu apa yang harus dilakukan.',
    mindset: 'Menjaga nyawa setiap insan di sekolah adalah amanah tertinggi kepemimpinan yang tak boleh ditawar.',
    style: 'authoritative',
    actions: [
      'Membuka seluruh akses darurat dan memasang penunjuk arah jalur evakuasi yang jelas dan kontras.',
      'Mengadakan simulasi gempa bumi/kebakaran mendadak bersama BPBD atau dinas pemadam kebakaran.',
      'Melatih seluruh guru tentang protap penyelamatan siswa berkebutuhan khusus saat darurat.',
      'Menyiapkan titik kumpul yang aman dengan pasokan logistik keselamatan memadai.'
    ],
    reflectionPrompt: 'Jika bencana terjadi hari ini, seberapa siap sistem perlindungan fisik yang saya bangun?'
  },
  {
    day: 48,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Penguatan Integritas Penilaian dan Rapor Siswa',
    narrative: 'Menjelang pembagian rapor, ada kecenderungan guru mendongkrak nilai siswa (katrol nilai) demi menjaga nama baik atau tuntutan kelulusan semu.',
    mindset: 'Nilai angka di atas kertas palsu adalah racun yang mengajarkan kecurangan sejak dini kepada generasi muda.',
    style: 'instructional',
    actions: [
      'Menegaskan standar penilaian autentik berbasis portofolio dan proses belajar anak sesungguhnya.',
      'Membuka sesi bedah asesmen: bantu guru merancang rubrik penilaian yang adil dan transparan.',
      'Meyakinkan guru bahwa kejujuran data jauh lebih mulia daripada angka tinggi yang menipu.',
      'Menolak intervensi apapun yang meminta pengubahan nilai secara tidak sah.'
    ],
    reflectionPrompt: 'Apakah saya lebih mementingkan citra angka sekolah di atas kertas atau kejujuran hakiki murid?'
  },
  {
    day: 49,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Mendukung Inovasi Guru yang Berani Mengambil Risiko',
    narrative: 'Seorang guru muda mencoba metode pembelajaran di luar kelas (outdoor learning) di sawah/taman kota, namun dikritik rekan guru lain karena dianggap membuang waktu.',
    mindset: 'Inovasi selalu tampak aneh bagi mereka yang terbiasa hidup dalam zona nyaman. Lindungi api inovasi guru Anda.',
    style: 'transformational',
    actions: [
      'Menemui guru muda tersebut dan menyatakan dukungan penuh secara resmi dan tertulis.',
      'Membantu menyusun prosedur keselamatan dan izin orang tua yang rapi dan legal.',
      'Hadir meninjau jalannya pembelajaran luar kelas dan memotret antusiasme belajar siswa.',
      'Meminta guru tersebut mempresentasikan dampak positif belajarnya di rapat dewan guru.'
    ],
    reflectionPrompt: 'Apakah saya menjadi peneduh bagi tumbuhnya tunas inovasi atau algojo yang memotongnya?'
  },
  {
    day: 50,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Peningkatan Kesejahteraan Batin Penjaga Malam & Satpam',
    narrative: 'Petugas keamanan sekolah sering kedinginan menjaga pos malam hari dengan sarana istirahat yang tidak manusiawi dan lampu mati.',
    mindset: 'Kenyamanan orang-orang yang menjaga sekolah saat kita tertidur lelap menentukan keselamatan seluruh aset kita.',
    style: 'servant',
    actions: [
      'Meremajakan pos satpam dengan lampu penerangan layak, jaket tebal, dan dispenser air hangat.',
      'Mengatur sistem shift jaga yang adil dan tidak memeras tenaga secara berlebihan.',
      'Mengunjungi pos satpam pada malam hari secara tak terduga untuk membawakan kopi dan mendengar cerita mereka.',
      'Menyediakan nomor darurat langsung ke Polsek dan rumah sakit terdekat di dinding pos.'
    ],
    reflectionPrompt: 'Seberapa peduli saya pada keringat orang-orang yang sering tidak terlihat oleh panggung formal?'
  },
  {
    day: 51,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Mediasi Kasus Guru Diprotes Orang Tua Karena Disiplin Tegas',
    narrative: 'Seorang guru menegur siswa yang merokok di luar jam sekolah, namun orang tua siswa tidak terima dan datang ke sekolah dengan nada mengancam.',
    mindset: 'Pimpinan wajib berdiri sebagai perisai bagi guru yang menegakkan kebenaran demi masa depan anak didik.',
    style: 'authoritative',
    actions: [
      'Mengambil alih penanganan kasus secara langsung dari ruang guru ke ruang kepala sekolah.',
      'Menjelaskan secara lugas bahwa tindakan guru adalah wujud kasih sayang penyelamatan masa depan anak.',
      'Menunjukkan bukti tata tertib yang telah ditandatangani orang tua saat awal masuk sekolah.',
      'Memberikan pendampingan konseling bagi siswa dengan mengedepankan pendekatan pemulihan (restoratif).'
    ],
    reflectionPrompt: 'Apakah guru-guru saya merasa terlindungi saat menghadapi tekanan dari luar dalam menjalankan tugas mulianya?'
  },
  {
    day: 52,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Membangun Sinergi Antar Tim Kesiswaan dan Bimbingan Konseling (BK)',
    narrative: 'Guru BK sering disalahpahami sebagai "polisi sekolah" yang bertugas menghukum, sementara tim tata tertib melempar seluruh kasus pelanggaran ke ruang BK.',
    mindset: 'BK adalah ruang penyembuhan jiwa dan pemetaan potensi, bukan sel penahanan siswa bersalah.',
    style: 'instructional',
    actions: [
      'Mengadakan lokakarya bersama antara tim kesiswaan, wali kelas, dan guru BK.',
      'Mereposisi peran BK: fokus pada asesmen bakat minat, konseling karir, dan pendampingan emosi.',
      'Menetapkan alur penanganan masalah siswa berjenjang: wali kelas -> kesiswaan -> BK (restoratif).',
      'Mempercantik ruang BK agar menjadi tempat yang nyaman dan ramah bagi siswa yang membutuhkan teman curhat.'
    ],
    reflectionPrompt: 'Apakah siswa saya memandang ruang BK dengan rasa ngeri atau sebagai oase tempat mencari pertolongan?'
  },
  {
    day: 53,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Penanganan Masalah Kesehatan Mental dan Burnout Guru',
    narrative: 'Beberapa guru mulai menunjukkan gejala keletihan emosional ekstrem (burnout): mudah marah di kelas, sering menangis di toilet, dan daya tahan tubuh menurun.',
    mindset: 'Gelas yang kosong tidak bisa menuangkan air ke cawan orang lain. Rawat kesehatan jiwa pendidik kita.',
    style: 'emotional',
    actions: [
      'Mengundang narasumber praktisi mindfulness/kesehatan mental dalam sesi kebersamaan guru.',
      'Menetapkan kebijakan "Bebas Pesan Kerja di Luar Jam 18.00" pada akhir pekan kecuali kondisi darurat.',
      'Menyediakan sudut relaksasi sederhana di ruang guru dengan buku-buku bacaan penenang jiwa.',
      'Melakukan sesi jalan pagi santai bersama dewan guru sebelum memulai rutinitas akhir pekan.'
    ],
    reflectionPrompt: 'Apakah saya menuntut produktivitas tanpa mempedulikan batas ketahanan fisik dan mental manusiawi staf saya?'
  },
  {
    day: 54,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Pengembangan Budaya Diskusi Profesional Berbasis Bukti',
    narrative: 'Rapat guru sering mandek dalam perdebatan kusir berdasarkan asumsi perasaan ("menurut saya murid sekarang malas") tanpa didukung data nyata.',
    mindset: 'Tinggalkan perdebatan opini tanpa dasar; biarkan karya siswa dan data capaian belajar yang berbicara.',
    style: 'constructivist',
    actions: [
      'Membiasakan membawa contoh sampel portofolio pekerjaan siswa ke meja diskusi rapat.',
      'Menganalisis hasil tes diagnostik bersama untuk menemukan pola kesulitan umum belajar.',
      'Membimbing guru menyusun hipotesis tindakan perbaikan berbasis data kelas.',
      'Mendorong dokumentasi video pembelajaran pendek sebagai bahan telaah refleksi bersama.'
    ],
    reflectionPrompt: 'Sejauh mana budaya ilmiah dan obyektivitas data sudah menjadi kebiasaan berdialog di sekolah ini?'
  },
  {
    day: 55,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Penguatan Peran OSIS dan Suara Siswa (Student Voice)',
    narrative: 'Pengurus OSIS hanya difungsikan sebagai pembawa nampan acara perpisahan atau tukang catat absensi upacara, tanpa pernah diajak merancang program mereka sendiri.',
    mindset: 'Kepemimpinan siswa dibentuk dengan memberi mereka kepercayaan memegang kemudi, bukan sekadar menjadi penumpang.',
    style: 'transformational',
    actions: [
      'Menghadiri rapat pengurus OSIS sebagai pendengar dan pembina yang menyemangati.',
      'Memberikan kebebasan kepada OSIS merancang 1 festival karya seni/literasi secara mandiri.',
      'Mengalokasikan anggaran kegiatan kesiswaan yang jelas dan dikelola secara akuntabel oleh siswa.',
      'Mendampingi mereka melakukan evaluasi pasca-acara tentang manajemen kepemimpinan dan komunikasi.'
    ],
    reflectionPrompt: 'Apakah saya sudah mempercayai anak-anak muda ini untuk memimpin sebaya mereka?'
  },
  {
    day: 56,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Pencegahan Gratifikasi & Penegakan Nilai Integritas',
    narrative: 'Menjelang kenaikan kelas atau kelulusan, ada tradisi pemberian bingkisan mahal dari orang tua kepada wali kelas tertentu yang memicu kecemburuan.',
    mindset: 'Pemberian hadiah pada posisi kekuasaan rentan melunturkan keadilan asesmen. Lindungi kehormatan guru dari gratifikasi.',
    style: 'authoritative',
    actions: [
      'Mengeluarkan surat edaran santun kepada orang tua murid tentang larangan pemberian gratifikasi.',
      'Mengalihkan ungkapan terima kasih orang tua ke dalam bentuk surat apresiasi atau donasi buku perpustakaan bersama.',
      'Membangun kesepakatan dewan guru untuk menolak pemberian pribadi dengan bahasa yang penuh kehormatan.',
      'Menegakkan teladan bahwa kepala sekolah menolak segala bentuk bingkisan pribadi dari vendor rekanan.'
    ],
    reflectionPrompt: 'Seberapa teguh komitmen saya menjaga kemurnian integritas institusi ini dari godaan kompromi?'
  },
  {
    day: 57,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Merawat Ekosistem Inklusi bagi Anak Berkebutuhan Khusus (ABK)',
    narrative: 'Ada 2 siswa dengan kebutuhan khusus lambat belajar (slow learner) yang sering ditinggalkan materi oleh gurunya dan diejek oleh teman-temannya.',
    mindset: 'Taraf peradaban sebuah sekolah diukur dari bagaimana ia memuliakan anak didiknya yang paling lemah.',
    style: 'servant',
    actions: [
      'Mengundang ahli pendidikan inklusi/psikolog untuk memberikan workshop singkat modifikasi modul ajar.',
      'Menyusun Program Pembelajaran Individual (PPI) sederhana untuk kedua siswa tersebut.',
      'Menanamkan budaya empati di kelas: menunjuk sahabat pendamping (peer buddy) di antara siswa.',
      'Merayakan setiap pencapaian kecil kemandirian anak-anak istimewa ini di hadapan orang tuanya.'
    ],
    reflectionPrompt: 'Sudahkah sekolah saya menjadi rumah yang ramah bagi setiap anak, tanpa peduli apapun keterbatasannya?'
  },
  {
    day: 58,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Refleksi Diri Pemimpin: Mengelola Luka Batin & Kesepian',
    narrative: 'Menjadi kepala sekolah kerap terasa sunyi. Anda menghadapi ekspektasi tinggi dari dinas, keluhan guru, dan tuntutan masyarakat yang datang bertubi-tubi.',
    mindset: 'Pemimpin yang bijak tahu kapan harus menepi untuk mengisi ulang sumur spiritual dan ketenangan batinnya.',
    style: 'emotional',
    actions: [
      'Menyisihkan 1 jam tenang di pagi hari tanpa gawai untuk berdoa, menulis jurnal pribadi, dan bernapas dalam.',
      'Menghubungi mentor atau sahabat sejawat kepala sekolah untuk saling menguatkan dan berbagi rasa.',
      'Mengingat kembali alasan pertama mengapa Anda memilih jalan hidup sebagai pendidik anak bangsa.',
      'Memaafkan diri sendiri atas keputusan yang belum sempurna dan berdamai dengan ketidaksempurnaan situasi.'
    ],
    reflectionPrompt: 'Apakah saya merawat jiwa saya sendiri dengan kasih sayang yang sama seperti saya merawat orang lain?'
  },
  {
    day: 59,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Mempersiapkan Landasan Komunitas Belajar (Kombel) Mandiri',
    narrative: 'Kepercayaan antar guru sudah terbangun baik. Saatnya mengarahkan energi kebersamaan ini menjadi sistem belajar berkelanjutan tanpa perlu disuruh.',
    mindset: 'Kombel yang berhasil bukan karena dipaksa surat tugas dinas, melainkan karena guru haus akan peningkatan mutu muridnya.',
    style: 'strategic',
    actions: [
      'Memetakan guru-guru penggerak yang memiliki dedikasi tinggi sebagai koordinator kelompok belajar.',
      'Menyediakan waktu khusus 1 jam setiap minggu yang dibebaskan dari jam mengajar untuk forum Kombel.',
      'Menyepakati siklus inkuiri bersama: telaah masalah belajar anak, rancang solusi, praktikkan, dan evaluasi.',
      'Menghilangkan formalitas administrasi pelaporan yang membebani esensi diskusi Kombel.'
    ],
    reflectionPrompt: 'Apakah ekosistem yang saya bangun siap melangkah ke tahap kemandirian kultur belajar?'
  },
  {
    day: 60,
    phase: 2,
    phaseName: 'Membangun Kepercayaan',
    title: 'Milestone 60 Hari: Laporan Evaluasi Fase 2 untuk Pengawas',
    narrative: 'Hari ke-60 menandai penuntasan Fase 2 (Membangun Kepercayaan). Hubungan kerja lebih hangat, supervisi klinis berjalan tanpa ketakutan, dan rasa saling percaya mengakar.',
    mindset: 'Kepercayaan adalah mata uang tertinggi dalam kepemimpinan. Tanpa kepercayaan, aturan sehebat apapun akan diabaikan.',
    style: 'strategic',
    actions: [
      'Menyusun dokumen laporan eksekutif 60 hari (Milestone 2: Membangun Kepercayaan).',
      'Mencetak dan mereviu portofolio kemajuan iklim kerja dan supervisi klinis untuk Pengawas Pembina.',
      'Mengadakan syukuran sederhana bersama guru: merefleksikan lompatan rasa saling percaya antar warga sekolah.',
      'Menyiapkan tekad dan peta aksi memasuki fase pamungkas: Membangun Kultur Sekolah Berkelanjutan.'
    ],
    reflectionPrompt: 'Apakah kepercayaan yang terbangun hari ini cukup kuat untuk menopang budaya baru sekolah hingga bertahun-tahun ke depan?'
  },

  // =========================================================================
  // FASE 3: MEMBANGUN KULTUR (HARI 61 - 90)
  // Fokus: Nilai Inti, Pembiasaan Mandiri, Suksesi, Kultur Berkelanjutan
  // =========================================================================
  {
    day: 61,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Transisi Fase: Dari Kepatuhan Menuju Kesadaran Kultur',
    narrative: 'Fase akhir dimulai. Tantangannya bukan lagi "apakah mereka mau patuh", melainkan "apakah nilai-nilai baik ini tetap berjalan ketika kepala sekolah tidak ada di tempat."',
    mindset: 'Kultur sejati adalah apa yang dilakukan warga sekolah ketika tidak ada satu pun orang yang mengawasi mereka.',
    style: 'transformational',
    actions: [
      'Menyampaikan pesan pembuka Fase 3 dalam apel pagi: "Sekolah ini milik kita bersama, martabatnya dijaga oleh kesadaran kita."',
      'Mengurangi pengumuman sanksi dan menggantinya dengan penanaman nilai intrinsik tanggung jawab.',
      'Menugaskan guru dan staf mengelola program harian secara mandiri tanpa harus meminta persetujuan mikro.',
      'Mengamati secara diam-diam bagaimana ketertiban sekolah berlangsung saat kepala sekolah menghadiri dinas luar.'
    ],
    reflectionPrompt: 'Apakah perilaku tertib di sekolah ini digerakkan oleh rasa takut dihukum atau kesadaran nilai?'
  },
  {
    day: 62,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Kombel Mandiri Bergerak: Sesi Telaah Karya Siswa',
    narrative: 'Komunitas Belajar guru berkumpul tanpa perlu diabsensi oleh kepala sekolah. Mereka antusias membawa hasil karangan tulisan siswa untuk dianalisis bersama.',
    mindset: 'Puncak kepuasan seorang pemimpin adalah saat ia melihat pasukannya belajar dan tumbuh tanpa perlu diperintah.',
    style: 'constructivist',
    actions: [
      'Hadir di ruang Kombel sebagai rekan pembelajar yang duduk setara di lantai karpet.',
      'Mengapresiasi inisiatif guru membedah capaian nalar kritis anak dari karya tulis mereka.',
      'Memfasilitasi penyediaan snack dan buku referensi pengayaan pedagogi yang bermutu.',
      'Mendokumentasikan insight terbaik Kombel untuk dipublikasikan di buletin mingguan sekolah.'
    ],
    reflectionPrompt: 'Seberapa besar kemandirian guru saya dalam mengidentifikasi dan memecahkan tantangan belajarnya sendiri?'
  },
  {
    day: 63,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Pembudayaan 5S (Senyum, Salam, Sapa, Sopan, Santun) yang Tulus',
    narrative: 'Budaya menyapa di lorong sekolah kerap berlangsung mekanis tanpa kontak mata dan kehangatan hati.',
    mindset: 'Keramahan yang tulus adalah magnet spiritual yang membuat anak betah berlama-lama di sekolah.',
    style: 'emotional',
    actions: [
      'Membiasakan menyapa dengan menyebut nama siswa dan guru secara personal saat berpapasan.',
      'Menghentikan sejenak langkah saat diajak bicara: berikan perhatian penuh 100% dengan tatap mata hangat.',
      'Mengedukasi siswa bahwa sopan santun bukan sikap tunduk yang kerdil, melainkan wujud jiwa yang beradab.',
      'Memberikan teladan bahwa kepala sekolah menyapa staf kebersihan dengan rasa hormat yang sama tingginya.'
    ],
    reflectionPrompt: 'Apakah senyum dan sapaan saya hari ini lahir dari ketulusan hati atau sekadar basa-basi protokoler?'
  },
  {
    day: 64,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Digitalisasi Ekosistem: Menghilangkan Rantai Birokrasi Lambat',
    narrative: 'Urusan izin dinas, pengajuan alat tulis kantor, dan laporan sarpras masih berbelit-belit dengan lembaran paraf manual yang menghambat eksekusi.',
    mindset: 'Birokrasi yang berbelit adalah pembunuh inovasi. Sederhanakan sistem agar energi fokus pada peningkatan mutu.',
    style: 'strategic',
    actions: [
      'Meluncurkan sistem persetujuan digital sederhana berbasis formulir online sekolah yang efisien.',
      'Menetapkan standar respon: setiap pengajuan logistik/izin wajib diputuskan dalam maksimal 4 jam kerja.',
      'Menghapus format-format manual ganda yang membebani staf administrasi.',
      'Memastikan transparansi status pengajuan barang agar guru tahu kapan sarana mereka tiba di kelas.'
    ],
    reflectionPrompt: 'Apakah sistem yang saya buat mempercepat pelayanan murid atau justru menciptakan antrean baru?'
  },
  {
    day: 65,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Kultur Berbagi: Gerakan Guru Mengajar Guru (Peer Coaching)',
    narrative: 'Guru yang memiliki keahlian khusus (misal asesmen berbasis IT atau manajemen kelas inklusi) mulai melatih rekan-rekannya secara berkala.',
    mindset: 'Sekolah yang hebat adalah universitas mini di mana setiap guru adalah profesor bagi rekan sejawatnya.',
    style: 'instructional',
    actions: [
      'Menjadwalkan sesi rutin mingguan "Kamis Berbagi": 1 guru berbagi praktik mengajar selama 20 menit.',
      'Membuka sesi simulasi mengajar (microteaching) mini tanpa tekanan penilaian.',
      'Mendorong budaya saling memberikan umpan balik hangat menggunakan teknik "Apresiasi & Saran Konstruktif".',
      'Mengalokasikan sertifikat penghargaan internal sekolah atas kontribusi pengembangan profesi rekan kerja.'
    ],
    reflectionPrompt: 'Sudahkah saya menumbuhkan rasa bangga pada guru-guru saya untuk menjadi sumber inspirasi bagi rekannya?'
  },
  {
    day: 66,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Membangun Budaya Literasi Finansial & Kejujuran Kantin',
    narrative: 'Kantin kejujuran di masa lalu bangkrut karena siswa belum memiliki kesadaran integritas dan pencatatan yang rapi.',
    mindset: 'Integritas moral anak bangsa tidak diuji di ruang ujian kertas, melainkan saat ia membayar kembalian tanpa diawasi di kantin.',
    style: 'servant',
    actions: [
      'Menata ulang kantin sekolah dengan sistem pembayaran digital (QRIS) dan sudut kasir mandiri.',
      'Menjadikan pengelola kantin sebagai mitra pembimbing karakter gizi dan etika antre siswa.',
      'Mengintegrasikan proyek kewirausahaan siswa dengan pengelolaan stan makanan sehat lokal.',
      'Membahas hasil transparansi omset kantin sebagai materi pembelajaran numerasi nyata di kelas.'
    ],
    reflectionPrompt: 'Bagaimana sekolah saya menanamkan nilai kejujuran riil dalam keseharian anak di luar ruang kelas?'
  },
  {
    day: 67,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Mendorong Kemerdekaan Berpikir dan Debat Santun Siswa',
    narrative: 'Siswa terbiasa diam saat ditanya guru di kelas karena takut salah atau dicap sok pintar oleh teman-temannya.',
    mindset: 'Murid yang berani berpendapat dengan argumen kuat adalah calon pemimpin masa depan yang tidak mudah dibodohi.',
    style: 'constructivist',
    actions: [
      'Membentuk klub debat dan forum diskusi publik mingguan di perpustakaan/selasar sekolah.',
      'Menginstruksikan para guru untuk mengganti pertanyaan tertutup ("apakah...") dengan pertanyaan terbuka ("mengapa dan bagaimana...").',
      'Menghapus tradisi menertawakan jawaban keliru di dalam kelas.',
      'Memberikan panggung bagi siswa untuk mengutarakan pandangan kritis tentang isu lingkungan hidup di sekolah.'
    ],
    reflectionPrompt: 'Apakah ruang kelas di sekolah ini melahirkan anak-anak yang patuh buta atau pemikir kritis yang beradab?'
  },
  {
    day: 68,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Mitigasi Perilaku Adiktif Gawai: Gerakan Literasi Tanpa Layar',
    narrative: 'Pada jam istirahat, siswa dan guru terpaku pada layar ponsel masing-masing, kehilangan interaksi sosial hangat dan kebersamaan di lapangan.',
    mindset: 'Teknologi adalah alat bantu berpikir, bukan majikan yang merampas kehangatan interaksi tatap muka kita.',
    style: 'democratic',
    actions: [
      'Menginisiasi kesepakatan bersama warga sekolah: "Jam Istirahat Bebas Layar, Aktif di Lapangan."',
      'Menyediakan aneka permainan tradisional (engklek, catur, congklak, bola basket) di area terbuka.',
      'Guru dan kepala sekolah ikut bermain catur atau sepak bola bersama siswa di lapangan.',
      'Melihat lonjakan percakapan hangat dan tawa riang anak-anak yang kembali menghiasi selasar sekolah.'
    ],
    reflectionPrompt: 'Apakah saya sendiri mampu melepaskan pandangan dari ponsel saat berinteraksi dengan warga sekolah?'
  },
  {
    day: 69,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Kemitraan Strategis dengan Dunia Usaha / Industri (DUDI) & Alumni',
    narrative: 'Hubungan dengan alumni hanya sebatas reuni nostalgia, sementara dunia usaha di sekitar sekolah belum dilibatkan untuk kemajuan pendidikan anak.',
    mindset: 'Pendidikan yang berdampak adalah pendidikan yang merajut jembatan kokoh antara bangku sekolah dengan dunia nyata.',
    style: 'strategic',
    actions: [
      'Menyelenggarakan "Forum Silaturahmi Alumni Peduli Almamater" dengan paparan program strategis sekolah.',
      'Menandatangani nota kesepahaman (MoU) kemitraan magang, beasiswa, atau guru tamu dengan 3 perusahaan lokal.',
      'Membentuk database alumni yang terstruktur untuk pendampingan karir siswa tingkat akhir.',
      'Melibatkan profesional alumni sebagai mentor inspirasi dalam pembentukan karakter kerja anak.'
    ],
    reflectionPrompt: 'Seberapa luas jejaring sosial yang berhasil saya buka untuk memperluas cakrawala masa depan murid?'
  },
  {
    day: 70,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Kultur Disiplin Positif: Menghapus Hukuman Fisik Selamanya',
    narrative: 'Masih ada sisa-sisa pola lama di mana siswa yang melanggar dijemur di terik matahari atau disuruh lari keliling lapangan hingga kelelahan.',
    mindset: 'Hukuman fisik merusak harga diri anak dan menanamkan dendam; disiplin positif menumbuhkan tanggung jawab dari dalam dada.',
    style: 'authoritative',
    actions: [
      'Mendeklarasikan penghapusan total segala bentuk sanksi fisik yang merendahkan martabat anak di sekolah.',
      'Menggantinya dengan segitiga restitusi: validasi kebutuhan, pengakuan konsekuensi, dan perbaikan kerugian nyata.',
      'Memberikan pendampingan bagi guru yang masih kesulitan mengelola kelas tanpa ancaman hukuman.',
      'Memantau penurunan tingkat pelanggaran berulang melalui pendekatan disiplin positif.'
    ],
    reflectionPrompt: 'Apakah ketertiban di sekolah ini dibangun di atas pondasi martabat kemanusiaan atau rasa takut?'
  },
  {
    day: 71,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Regenerasi Kepemimpinan: Mentoring Calon Wakil & Pemimpin Masa Depan',
    narrative: 'Banyak kepala sekolah bekerja sendiri tanpa pernah melatih kader penerus, sehingga ketika ia berpindah tugas, sekolah kembali mundur ke titik nol.',
    mindset: 'Ujian sejati kepemimpinan bukanlah seberapa banyak pengikut yang Anda miliki, melainkan seberapa banyak pemimpin baru yang berhasil Anda lahirkan.',
    style: 'transformational',
    actions: [
      'Memetakan 3 guru berpotensi kepemimpinan tinggi untuk dimentori secara intensif.',
      'Mendelegasikan kepemimpinan proyek-proyek strategis sekolah kepada mereka dengan supervisi suportif.',
      'Mengajak mereka menghadiri rapat anggaran dan perumusan kebijakan agar memahami gambaran makro manajemen sekolah.',
      'Memberikan ruang refleksi kepemimpinan: biarkan mereka mengambil keputusan dan belajar dari dinamikanya.'
    ],
    reflectionPrompt: 'Siapakah pemimpin-pemimpin masa depan yang sedang saya siapkan untuk meneruskan api perjuangan ini?'
  },
  {
    day: 72,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Kultur Apresiasi Spontan: Kartu Bintang Karakter Siswa',
    narrative: 'Perhatian guru kerap hanya terarah pada anak-anak yang membuat onar atau anak-anak juara olimpiade, sementara mayoritas anak yang santun luput dari pujian.',
    mindset: 'Setiap anak haus akan pengakuan bahwa keberadaan dirinya bermakna bagi dunia di sekitarnya.',
    style: 'servant',
    actions: [
      'Meluncurkan gerakan "Kartu Apresiasi Bintang": guru menuliskan pesan pujian spontan saat melihat kebaikan kecil siswa.',
      'Membagikan kartu tersebut langsung ke tangan anak: "Terima kasih telah menolong temanmu memungut buku tadi."',
      'Mengumumkan nama-nama duta kebaikan dalam apel pagi tanpa membeda-bedakan status akademik.',
      'Melihat wajah anak-anak yang berbinar bangga menyimpan kartu apresiasi tersebut di dalam saku seragamnya.'
    ],
    reflectionPrompt: 'Berapa banyak kebaikan hening di sekolah ini yang belum sempat saya berikan panggung kehormatan?'
  },
  {
    day: 73,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Pengelolaan Lingkungan Hidup: Sekolah Menuju Nol Sampah (Zero Waste)',
    narrative: 'Tong sampah sekolah selalu menggunung oleh plastik kemasan makanan instan, mengajarkan konsumerisme yang merusak bumi kepada generasi muda.',
    mindset: 'Cinta lingkungan bukan teori di buku IPA, melainkan pembiasaan memilah sampah dan membawa wadah makan sendiri setiap hari.',
    style: 'transformational',
    actions: [
      'Mencanangkan gerakan "Sekolah Bebas Botol Sekali Pakai": seluruh warga sekolah membawa tumbler pribadi.',
      'Menyediakan stasiun isi ulang air minum bersih dan gratis di setiap sudut koridor.',
      'Membangun instalasi komposter daun dan bank sampah terpadu yang dikelola oleh tim Adiwiyata siswa.',
      'Menghentikan penjualan minuman plastik berkemasan berbahaya di kantin sekolah melalui kemitraan sehat.'
    ],
    reflectionPrompt: 'Apakah jejak ekologis sekolah saya hari ini mengajarkan tanggung jawab bumi kepada generasi penerus?'
  },
  {
    day: 74,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Kultur Akuntabilitas Terbuka: Musyawarah Warga Sekolah',
    narrative: 'Di akhir kuartal, saatnya mengundang seluruh perwakilan pemangku kepentingan untuk melaporkan capaian kinerja secara jujur dan transparan.',
    mindset: 'Kekuatan terbesar sebuah institusi publik adalah ketika ia tidak memiliki rahasia yang perlu disembunyikan dari masyarakatnya.',
    style: 'democratic',
    actions: [
      'Menyelenggarakan musyawarah akuntabilitas terbuka di aula sekolah yang dihadiri perwakilan guru, murid, orang tua, dan tokoh masyarakat.',
      'Mempaparkan laporan realisasi anggaran belanja dan kemajuan indikator capaian belajar siswa.',
      'Membuka sesi tanya jawab kritis dan menampung rekomendasi prioritas untuk perbaikan tahun ajaran mendatang.',
      'Menutup musyawarah dengan penandatanganan pakta komitmen bersama menjaga muruah sekolah.'
    ],
    reflectionPrompt: 'Apakah saya berbicara dengan kejujuran mutlak saat memaparkan kondisi sekolah di depan publik?'
  },
  {
    day: 75,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Membangun Ketahanan Emosional Menghadapi Tahun Politik / Mutasi',
    narrative: 'Beredar kabar angin mutasi jabatan kepala sekolah atau intervensi politik lokal yang membuat konsentrasi guru terombang-ambing.',
    mindset: 'Nakhoda yang tangguh tidak larut dalam kegaduhan angin; ia fokus memegang kemudi agar kapal tetap melaju menuju pelabuhan.',
    style: 'authoritative',
    actions: [
      'Mengumpulkan dewan guru dan menenangkan keresahan dengan wibawa kepemimpinan yang kokoh.',
      'Menegaskan prinsip netralitas ASN dan profesionalisme pendidik: "Fokus kita tidak pernah bergeser dari senyum anak di kelas."',
      'Memastikan seluruh program belajar dan inovasi tetap berjalan tepat waktu tanpa terpengaruh dinamika luar.',
      'Membangun sistem operasional yang solid sehingga sekolah tetap kuat siapapun yang memimpin kelak.'
    ],
    reflectionPrompt: 'Apakah ketenangan batin saya mampu menjadi jangkar penyeimbang di saat badai ketidakpastian melanda?'
  },
  {
    day: 76,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Kultur Pembelajaran Berdiferensiasi yang Membumi di Kelas',
    narrative: 'Guru sudah memahami konsep kurikulum baru, namun masih bingung bagaimana menerapkannya secara nyata tanpa kerepotan membuat modul berlebihan.',
    mindset: 'Berdiferensiasi bukan berarti membuat 30 rencana pelajaran untuk 30 murid; itu adalah tentang memberikan pintu masuk yang berbeda menuju tujuan pemahaman yang sama.',
    style: 'instructional',
    actions: [
      'Menggelar simulasi kelas berdiferensiasi sederhana: variasi konten (visual/audio/kinestetik) dan proses kelompok kecil.',
      'Mendampingi guru menyusun rubrik asesmen berbasis minat dan tingkat kesiapan belajar anak.',
      'Mengajak guru merayakan kemajuan unik masing-masing siswa tanpa membanding-bandingkan dengan rekan sebangkunya.',
      'Meninjau implementasi di 3 kelas dan memberikan apresiasi atas keberanian guru bereksperimen.'
    ],
    reflectionPrompt: 'Sudahkah setiap anak di kelas merasa bahwa pelajaran yang disajikan dirancang untuk membantunya sukses?'
  },
  {
    day: 77,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Pemberdayaan Perpustakaan sebagai Jantung Intelektual Sekolah',
    narrative: 'Perpustakaan sepi, gelap, dan hanya dikunjungi siswa saat dihukum membersihkan rak buku atau mencari tempat tidur di jam kosong.',
    mindset: 'Perpustakaan adalah tempat di mana peradaban disemaikan. Ubah ruang hening yang menakutkan menjadi ruang inkubasi imajinasi anak.',
    style: 'servant',
    actions: [
      'Menata ulang interior perpustakaan: menghadirkan karpet santai, bean bag warna-warni, dan pencahayaan hangat.',
      'Meluncurkan kafe baca literasi dan akses internet cepat untuk riset proyek siswa.',
      'Mengadakan bedah buku mingguan dan temu penulis lokal yang menginspirasi anak-anak.',
      'Menjadikan kepala perpustakaan dan stafnya sebagai pahlawan literasi yang ramah menyambut setiap pengunjung.'
    ],
    reflectionPrompt: 'Apakah perpustakaan sekolah saya sudah menjadi tempat yang paling dirindukan oleh anak-anak?'
  },
  {
    day: 78,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Penguatan Karakter Guru: Menjaga Kata dan Janji (Walking the Talk)',
    narrative: 'Terkadang ada inkonsistensi kecil: guru melarang siswa terlambat tapi guru sendiri santai masuk kelas terlambat 10 menit.',
    mindset: 'Keteladanan seribu kali lebih bising daripada seribu kata nasihat. Jangan pernah menuntut apa yang belum kita contohkan.',
    style: 'emotional',
    actions: [
      'Mengadakan sesi refleksi etika profesi: "Menyelaraskan Kata dan Tindakan Pendidik."',
      'Mengajak guru saling mengingatkan secara santun jika melihat pelanggaran keteladanan rekan kerja.',
      'Kepala sekolah memberikan teladan paling disiplin dalam menepati setiap janji kepada guru dan murid.',
      'Membangun budaya minta maaf secara ksatria di hadapan siswa jika guru melakukan kekeliruan.'
    ],
    reflectionPrompt: 'Apakah seluruh tindakan saya hari ini sudah selaras dengan nilai-nilai luhur yang saya khotbahkan?'
  },
  {
    day: 79,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Pameran Karya Siswa (Panen Belajar) yang Menggugah Jiwa',
    narrative: 'Puncak pameran proyek profil pelajar Pancasila (P5) diselenggarakan. Seluruh karya seni, riset sains, dan wirausaha siswa dipamerkan untuk orang tua dan masyarakat.',
    mindset: 'Perayaan karya adalah momentum di mana rasa percaya diri anak membumbung tinggi melihat hasil jerih payahnya dihargai dunia.',
    style: 'transformational',
    actions: [
      'Membuka panen belajar dengan narasi yang menyentuh hati tentang proses perjuangan anak-anak.',
      'Mengundang pejabat dinas, tokoh masyarakat, dan orang tua murid untuk mengapresiasi langsung stan karya anak.',
      'Memastikan setiap anak memiliki peran tampil tanpa terkecuali, bukan hanya anak-anak yang menonjol.',
      'Menyaksikan air mata haru orang tua yang menyaksikan kemandirian dan kecerdasan putranya.'
    ],
    reflectionPrompt: 'Apakah panen belajar ini benar-benar mencerminkan proses tumbuh kembang anak atau sekadar panggung seremonial belaka?'
  },
  {
    day: 80,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Perumusan Cetak Biru Sekolah 3 Tahun ke Depan (Roadmap Mutu)',
    narrative: 'Kultur baru telah terbentuk kokoh. Kini saatnya memproyeksikan lompatan ini ke dalam dokumen peta jalan strategis jangka panjang.',
    mindset: 'Pemimpin visioner membangun fondasi yang kokoh agar generasi berikutnya bisa membangun lantai-lantai kemajuan yang lebih tinggi.',
    style: 'strategic',
    actions: [
      'Membentuk tim perumus rencana strategis jangka menengah (Renstra 3 Tahunan) sekolah.',
      'Menetapkan 4 pilar target utama: keunggulan karakter, literasi numerasi global, lingkungan berkelanjutan, dan kesejahteraan pendidik.',
      'Memastikan rencana strategis selaras dengan indikator kinerja Rapor Pendidikan dan kebutuhan masa depan murid.',
      'Mempresentasikan draf cetak biru kepada seluruh warga sekolah untuk mendapatkan legitimasi bersama.'
    ],
    reflectionPrompt: 'Apakah rancangan masa depan ini realistis, terukur, dan mampu memicu semangat juang jangka panjang?'
  },
  {
    day: 81,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Kultur Berpikir Solutif: Menghilangkan Budaya Menyalahkan (Blame Culture)',
    narrative: 'Ketika terjadi kekeliruan pengunggahan data atau kerusakan alat sekolah, reaksi pertama yang muncul kerap mencari kambing hitam.',
    mindset: 'Mencari siapa yang bersalah membuang energi; mencari apa perbaikan sistemnya menyelamatkan masa depan organisasi.',
    style: 'constructivist',
    actions: [
      'Menghentikan investigasi bernada menghakimi saat terjadi insiden kelalaian kerja staf.',
      'Mengalihkan pertanyaan dari "Siapa yang salah?" menjadi "Celah sistem mana yang membuat kekeliruan ini bisa terjadi?"',
      'Memperbaiki SOP dan memberikan pelatihan tambahan bagi staf yang bersangkutan.',
      'Membangun budaya belajar dari kegagalan sebagai laboratorium pembelajaran bersama.'
    ],
    reflectionPrompt: 'Apakah respons pertama saya saat terjadi krisis adalah menenangkan keadaan atau mencari orang untuk disalahkan?'
  },
  {
    day: 82,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Harmonisasi Kerja dan Kehangatan Keluarga Warga Sekolah',
    narrative: 'Menjelang akhir tahun ajaran, kesibukan administrasi dan ujian menguras tenaga hingga para staf lupa meluangkan waktu bersama keluarga tercinta.',
    mindset: 'Sekolah yang bahagia dibangun oleh manusia-manusia yang memiliki kehangatan dan kebahagiaan di rumahnya masing-masing.',
    style: 'emotional',
    actions: [
      'Menyelenggarakan "Family Gathering" santai piknik bersama keluarga guru, staf TU, dan penjaga sekolah.',
      'Mengenalkan anak-anak dan pasangan staf satu sama lain dalam suasana penuh keakraban persaudaraan.',
      'Memberikan bingkisan tanda terima kasih kepada pasangan guru yang setia mendukung tugas mulia pendidik di rumah.',
      'Merasakan ikatan batin yang semakin rekat melampaui batas hubungan formal atasan dan bawahan.'
    ],
    reflectionPrompt: 'Sudahkah saya menghormati hak kebahagiaan keluarga dari orang-orang yang bekerja bersama saya?'
  },
  {
    day: 83,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Pemberdayaan Peran Alumni Muda sebagai Mentor Karir Siswa',
    narrative: 'Siswa kelas akhir kerap merasa cemas menghadapi dunia kuliah dan kerja karena minimnya gambaran nyata rintangan di luar sana.',
    mindset: 'Kisah perjuangan kakak kelas yang telah berhasil menembus kerasnya kehidupan adalah lentera penuntun terbaik bagi adik-adiknya.',
    style: 'strategic',
    actions: [
      'Mengundang alumni muda yang berkuliah dan berwirausaha dalam sesi bincang santai "Bedah Realitas Masa Depan."',
      'Membuka sesi tanya jawab terbuka mengenai cara memilih jurusan, mengelola stres, dan mencari beasiswa.',
      'Memfasilitasi pembentukan jejaring bimbingan belajar kakak-adik asuh antar alumni dan siswa tingkat akhir.',
      'Menyaksikan bangkitnya rasa optimisme dan percaya diri siswa menghadapi seleksi kelanjutan studi.'
    ],
    reflectionPrompt: 'Apakah sekolah saya telah membekali siswa dengan kesiapan mental menghadapi dinamika zaman?'
  },
  {
    day: 84,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Audit Fasilitas Akhir: Memastikan Keberlanjutan Sarana Sekolah',
    narrative: 'Seluruh perbaikan fisik yang dilakukan sejak hari pertama (toilet, lab, taman, UKS) perlu dicek kembali agar tidak rusak kembali karena kelalaian perawatan.',
    mindset: 'Membangun sarana itu mudah, merawatnya dengan konsisten setiap hari adalah ujian kedewasaan kultur institusi.',
    style: 'transactional',
    actions: [
      'Melakukan inspeksi menyeluruh ke seluruh fasilitas sekolah bersama tim sarpras dan perwakilan siswa.',
      'Menetapkan buku catatan pemeliharaan preventif (preventive maintenance checklist) untuk setiap ruangan.',
      'Mengapresiasi petugas kebersihan dan tim sarana atas kerja keras menjaga keasrian fasilitas sekolah.',
      'Memastikan alokasi dana pemeliharaan rutin teranggarkan secara aman dalam RKAS tahun berikutnya.'
    ],
    reflectionPrompt: 'Sejauh mana sistem perawatan sarana sekolah ini dapat berjalan secara otomatis tanpa bergantung pada kehadiran saya?'
  },
  {
    day: 85,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Menuliskan Praktik Baik Kepemimpinan: Mengabadi dalam Karya',
    narrative: 'Banyak pengalaman berharga selama 85 hari kepemimpinan ini yang jika tidak dituliskan akan hilang ditelan waktu dan terlupakan oleh generasi berikutnya.',
    mindset: 'Mengikat ilmu dan hikmah kepemimpinan dengan tulisan adalah bentuk pertanggungjawaban peradaban kepada sejarah.',
    style: 'constructivist',
    actions: [
      'Menyusun artikel esai reflektif tentang transformasi kultur sekolah yang telah dilalui selama 90 hari.',
      'Mengajak para guru untuk ikut menuliskan 1 lembar kisah perubahan yang mereka rasakan di ruang kelasnya.',
      'Membukukan kumpulan tulisan tersebut menjadi antologi inspiratif "Kisah Perubahan Sekolah Kami."',
      'Membagikan buku tersebut kepada dinas pendidikan dan rekan-rekan kepala sekolah lainnya sebagai inspirasi.'
    ],
    reflectionPrompt: 'Hikmah apa yang paling berharga yang telah mengubah paradigma kepemimpinan saya selama perjalanan ini?'
  },
  {
    day: 86,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Refleksi Hubungan dengan Dinas Pendidikan & Pengawas Pembina',
    narrative: 'Hubungan dengan otoritas pembina telah bertransformasi dari sekadar pemeriksaan administratif menjadi kemitraan strategis yang saling mendukung.',
    mindset: 'Sekolah yang berprestasi dan berkarakter adalah kebanggaan daerah. Jalinlah komunikasi yang mengharumkan nama institusi pembina.',
    style: 'strategic',
    actions: [
      'Menyampaikan laporan berkala kemajuan indikator Rapor Pendidikan kepada Kepala Dinas Pendidikan setempat.',
      'Menjadikan sekolah sebagai laboratorium rujukan praktik baik bagi sekolah-sekolah lain di gugus/wilayah.',
      'Menyampaikan terima kasih yang tulus atas dukungan dan bimbingan pengawas sekolah selama masa transisi 90 hari.',
      'Menyiapkan diri untuk berbagi praktik baik dalam forum Musyawarah Kerja Kepala Sekolah (MKKS).'
    ],
    reflectionPrompt: 'Apakah sekolah saya sudah menjadi berkat dan inspirasi bagi ekosistem pendidikan yang lebih luas di daerah ini?'
  },
  {
    day: 87,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Kemandirian Siswa: Sekolah Dikelola Murid Selama Sehari',
    narrative: 'Sebagai bukti keberhasilan penanaman kultur disiplin dan tanggung jawab, diadakan kegiatan "Sehari Bersama Pemimpin Muda."',
    mindset: 'Percayalah pada potensi murid. Saat diberi tanggung jawab besar, mereka akan menjawabnya dengan kedewasaan yang mengejutkan kita.',
    style: 'transformational',
    actions: [
      'Menugaskan perwakilan siswa OSIS memegang peran manajerial harian: pengatur ketertiban, penyambut gerbang, dan petugas piket.',
      'Guru dan kepala sekolah bertindak sebagai mentor pendamping yang mengamati dari dekat.',
      'Menyaksikan kelancaran jalannya seluruh kegiatan belajar tanpa ada insiden pelanggaran kedisiplinan.',
      'Mengadakan sesi evaluasi sore bersama para siswa pengelola untuk merefleksikan arti amanah kepemimpinan.'
    ],
    reflectionPrompt: 'Bagaimana perasaan saya saat melihat anak-anak mampu memimpin sekolahnya dengan martabat dan kedewasaan?'
  },
  {
    day: 88,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Malam Renungan & Apresiasi Akbar Seluruh Warga Sekolah',
    narrative: 'Menjelang garis akhir 90 hari, seluruh warga sekolah berkumpul dalam malam keakraban yang syahdu di halaman sekolah di bawah temaram lampu.',
    mindset: 'Rasa syukur adalah puncak tertinggi dari segala ikhtiar manusia. Rayakan kebersamaan ini dengan hati yang lapang.',
    style: 'emotional',
    actions: [
      'Menayangkan video dokumenter perjalanan 90 hari transformasi sekolah dari hari pertama hingga hari ini.',
      'Memberikan penghargaan dan pelukan hangat kepada setiap guru, staf tata usaha, dan penjaga sekolah tanpa terkecuali.',
      'Menyampaikan permohonan maaf atas segala khilaf dan ketegasan dalam memimpin selama 90 hari terakhir.',
      'Berdoa bersama memohon keberkahan, kesehatan, dan keselamatan bagi seluruh keluarga besar sekolah tercinta.'
    ],
    reflectionPrompt: 'Apakah ikatan hati yang terjalin malam ini sudah menjadi keluarga sejati yang siap saling menjaga?'
  },
  {
    day: 89,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Pemberdayaan Tim Manajemen: Sekolah Berjalan Tanpa Kehadiran Anda',
    narrative: 'Hari ini Anda secara sengaja tidak berada di sekolah (menghadiri agenda studi tiru atau dinas luar) untuk menguji ketahanan kultur organisasi.',
    mindset: 'Ukuran keberhasilan kepemimpinan tertinggi adalah ketika organisasi tetap berkinerja sempurna tanpa kehadiran fisik sang pemimpin.',
    style: 'democratic',
    actions: [
      'Mempercayakan penuh operasional harian kepada para Wakil Kepala Sekolah dan dewan guru.',
      'Menahan diri dari mengirimkan pesan perintah atau menelpon menanyakan situasi secara berlebihan.',
      'Menerima laporan sore hari yang menunjukkan seluruh kegiatan belajar, disiplin, dan kebersihan berjalan sempurna.',
      'Mengirimkan pesan apresiasi bangga ke grup dinas: "Kalian adalah para pemimpin sejati yang sesungguhnya."'
    ],
    reflectionPrompt: 'Apakah saya bangga melihat tim saya mandiri, ataukah ego saya masih merasa ingin selalu dibutuhkan?'
  },
  {
    day: 90,
    phase: 3,
    phaseName: 'Membangun Kultur',
    title: 'Milestone 90 Hari: Pengukuhan Portofolio Kepala Sekolah Berdampak',
    narrative: 'Hari ke-90 telah tiba. Perjalanan intensif transformasi kepemimpinan situasional telah paripurna. Arah telah tegak, kepercayaan telah berakar, dan kultur sekolah berdampak telah bersemi mekar.',
    mindset: 'Hari ke-90 bukanlah garis akhir, melainkan garis start baru menuju pengabdian yang lebih luas bagi masa depan bangsa.',
    style: 'transformational',
    actions: [
      'Mencetak dan menuntaskan Portofolio Lengkap 90 Hari Evaluasi Kepemimpinan Kepala Sekolah Berdampak.',
      'Menyerahkan laporan resmi kepada Pengawas Sekolah dan Kepala Dinas Pendidikan sebagai bukti akuntabilitas prima.',
      'Mengukuhkan janji pribadi untuk terus merawat api semangat melayani murid, guru, dan masyarakat dengan rendah hati.',
      'Melangkah maju dengan ketenangan batin, kebijaksanaan matang, dan keyakinan bahwa setiap anak berhak atas sekolah yang hebat.'
    ],
    reflectionPrompt: 'Siapakah saya hari ini dibandingkan dengan saya di Hari ke-1, dan warisan kebaikan apa yang telah tertanam di hati warga sekolah ini?'
  }
];
