import {
  Nasabah,
  MitraBank,
  WastePriceItem,
  PickupRequest,
  Transaction,
  EduArticle,
  QuizQuestion,
  EcoReward,
  AppNotification
} from '../types';

export const initialWastePrices: WastePriceItem[] = [
  {
    id: 'p1',
    category: 'Plastik',
    subCategory: 'Botol Plastik Bening (PET)',
    unit: 'kg',
    pricePerUnit: 4500,
    pointPerUnit: 10,
    iconName: 'Bottle',
    description: 'Botol air mineral, jus, botol bening bersih tanpa tutup/label'
  },
  {
    id: 'p2',
    category: 'Plastik',
    subCategory: 'Plastik Keras / Tutup Botol (HDPE)',
    unit: 'kg',
    pricePerUnit: 3800,
    pointPerUnit: 8,
    iconName: 'Box',
    description: 'Botol sampo, deterjen, galon sekali pakai'
  },
  {
    id: 'p3',
    category: 'Kertas',
    subCategory: 'Kardus Bekas Cokelat',
    unit: 'kg',
    pricePerUnit: 2400,
    pointPerUnit: 5,
    iconName: 'FileText',
    description: 'Kardus kemasan paket, karton tebal kering'
  },
  {
    id: 'p4',
    category: 'Kertas',
    subCategory: 'Kertas HVS & Bintang HVS',
    unit: 'kg',
    pricePerUnit: 3000,
    pointPerUnit: 6,
    iconName: 'Files',
    description: 'Kertas dokumen cetak, majalah, koran kering'
  },
  {
    id: 'p5',
    category: 'Kaleng',
    subCategory: 'Kaleng Alumunium Minuman',
    unit: 'kg',
    pricePerUnit: 14500,
    pointPerUnit: 25,
    iconName: 'Zap',
    description: 'Kaleng soda, kaleng susu alumunium bersih'
  },
  {
    id: 'p6',
    category: 'Kaleng',
    subCategory: 'Besi / Seng Tua',
    unit: 'kg',
    pricePerUnit: 4200,
    pointPerUnit: 8,
    iconName: 'Hammer',
    description: 'Paku, pagar besi tua, potongan seng'
  },
  {
    id: 'p7',
    category: 'Elektronik',
    subCategory: 'Kabel & Komponen Bekas (E-Waste)',
    unit: 'kg',
    pricePerUnit: 18000,
    pointPerUnit: 35,
    iconName: 'Cpu',
    description: 'Komponen HP bekas, motherboard, kabel tembaga'
  },
  {
    id: 'p8',
    category: 'Organik',
    subCategory: 'Minyak Goreng Bekas (Jelantah)',
    unit: 'kg',
    pricePerUnit: 7500,
    pointPerUnit: 15,
    iconName: 'Droplet',
    description: 'Minyak goreng bekas dalam wadah tertutup rapat'
  }
];

export const initialNasabah: Nasabah = {
  id: 'nas-001',
  name: 'Budi Santoso',
  email: 'budi.santoso@email.com',
  phone: '0812-3456-7890',
  address: 'Jl. Melati No. 42, Kebayoran Baru, Jakarta Selatan',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  balanceRp: 345000,
  rewardPoints: 1250,
  totalWasteKg: 148.5,
  level: 'Pahlawan Hijau Senior',
  memberSince: '12 Januari 2024',
  co2SavedKg: 215.3,
  treesSaved: 11
};

export const initialMitraList: MitraBank[] = [
  {
    id: 'mitra-01',
    name: 'Bank Sampah Bersih Mandiri',
    slug: 'bersih-mandiri',
    address: 'Jl. Mampang Prapatan VIII No. 15',
    district: 'Kebayoran Baru',
    city: 'Jakarta Selatan',
    phone: '021-7918234',
    whatsapp: '0813-8899-7711',
    openHours: '08:00 - 16:00 WIB',
    openDays: 'Senin - Sabtu',
    rating: 4.9,
    reviewsCount: 128,
    lat: -6.2415,
    lng: 106.8229,
    acceptedTypes: ['Plastik', 'Kertas', 'Kaleng', 'Elektronik', 'Organik'],
    prices: initialWastePrices,
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    isVerified: true
  },
  {
    id: 'mitra-02',
    name: 'Bank Sampah Green Harmony',
    slug: 'green-harmony',
    address: 'Jl. Nasional III',
    district: 'Coblong',
    city: 'Bandung',
    phone: '022-2501122',
    whatsapp: '0812-2233-4455',
    openHours: '08:30 - 15:30 WIB',
    openDays: 'Selasa - Minggu',
    rating: 4.8,
    reviewsCount: 94,
    lat: -6.8856,
    lng: 107.6139,
    acceptedTypes: ['Plastik', 'Kertas', 'Kaleng', 'Kaca'],
    prices: initialWastePrices,
    imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=80',
    isVerified: true
  },
  {
    id: 'mitra-03',
    name: 'Bank Sampah Asri Jaya',
    slug: 'asri-jaya',
    address: 'Jl. Raya Gubeng No. 88',
    district: 'Gubeng',
    city: 'Surabaya',
    phone: '031-5034567',
    whatsapp: '0857-1122-3344',
    openHours: '08:00 - 17:00 WIB',
    openDays: 'Senin - Jumat',
    rating: 4.7,
    reviewsCount: 82,
    lat: -7.2756,
    lng: 112.7541,
    acceptedTypes: ['Plastik', 'Kertas', 'Kaleng', 'Organik', 'Elektronik'],
    prices: initialWastePrices,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    isVerified: true
  },
  {
    id: 'mitra-04',
    name: 'Bank Sampah EcoLestari Jogja',
    slug: 'ecolestari-jogja',
    address: 'Jl. Kaliurang Km 5.5 No. 12',
    district: 'Depok',
    city: 'Sleman / Yogyakarta',
    phone: '0274-512345',
    whatsapp: '0819-9988-7766',
    openHours: '09:00 - 16:00 WIB',
    openDays: 'Senin - Sabtu',
    rating: 4.9,
    reviewsCount: 156,
    lat: -7.7583,
    lng: 110.3808,
    acceptedTypes: ['Plastik', 'Kertas', 'Kaleng', 'Elektronik'],
    prices: initialWastePrices,
    imageUrl: 'https://images.unsplash.com/photo-1604186837056-8e7c286766f2?w=600&auto=format&fit=crop&q=80',
    isVerified: true
  }
];

export const initialPickupRequests: PickupRequest[] = [
  {
    id: 'req-101',
    code: 'PKP-20260805-01',
    nasabahId: 'nas-001',
    nasabahName: 'Budi Santoso',
    nasabahPhone: '0812-3456-7890',
    mitraId: 'mitra-01',
    mitraName: 'Bank Sampah Bersih Mandiri',
    address: 'Jl. Melati No. 42, Kebayoran Baru, Jakarta Selatan',
    pickupDate: '2026-08-08',
    timeSlot: '09:00 - 11:00 WIB',
    items: [
      { categoryId: 'p1', categoryName: 'Botol Plastik PET', estimatedKg: 12 },
      { categoryId: 'p3', categoryName: 'Kardus Bekas Cokelat', estimatedKg: 18 },
      { categoryId: 'p5', categoryName: 'Kaleng Alumunium', estimatedKg: 3.5 }
    ],
    notes: 'Mohon hubungi sebelum sampai, sampah sudah dipilah dalam karung terpisah.',
    status: 'Menunggu Konfirmasi',
    createdAt: '2026-08-06 14:30'
  },
  {
    id: 'req-100',
    code: 'PKP-20260801-09',
    nasabahId: 'nas-001',
    nasabahName: 'Budi Santoso',
    nasabahPhone: '0812-3456-7890',
    mitraId: 'mitra-01',
    mitraName: 'Bank Sampah Bersih Mandiri',
    address: 'Jl. Melati No. 42, Kebayoran Baru, Jakarta Selatan',
    pickupDate: '2026-08-02',
    timeSlot: '13:00 - 15:00 WIB',
    items: [
      { categoryId: 'p1', categoryName: 'Botol Plastik PET', estimatedKg: 15 },
      { categoryId: 'p8', categoryName: 'Minyak Jelantah', estimatedKg: 5 }
    ],
    notes: 'Minyak jelantah ditaruh dalam jerigen 5 Liter.',
    status: 'Selesai',
    createdAt: '2026-08-01 09:15',
    driverName: 'Pak Supri (Kurir Penjemputan)',
    driverPhone: '0852-1100-2233',
    finalWeightKg: 20,
    finalAmountRp: 105000,
    finalPoints: 225
  },
  {
    id: 'req-102',
    code: 'PKP-20260806-03',
    nasabahId: 'nas-002',
    nasabahName: 'Siti Rahmawati',
    nasabahPhone: '0813-9988-1122',
    mitraId: 'mitra-01',
    mitraName: 'Bank Sampah Bersih Mandiri',
    address: 'Griya Asri Blok D3 No. 12, Mampang',
    pickupDate: '2026-08-07',
    timeSlot: '10:00 - 12:00 WIB',
    items: [
      { categoryId: 'p4', categoryName: 'Kertas HVS Bekas', estimatedKg: 25 },
      { categoryId: 'p7', categoryName: 'Kabel & E-Waste', estimatedKg: 2 }
    ],
    notes: 'Lantai 2 rumah pagar hijau.',
    status: 'Disetujui',
    createdAt: '2026-08-06 16:45',
    driverName: 'Mas Agus',
    driverPhone: '0811-3322-4455'
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: 'trx-301',
    code: 'TRX-20260802-088',
    date: '02 Agu 2026, 14:10',
    nasabahId: 'nas-001',
    nasabahName: 'Budi Santoso',
    mitraId: 'mitra-01',
    mitraName: 'Bank Sampah Bersih Mandiri',
    type: 'PENJEMPUTAN',
    details: [
      { categoryName: 'Botol Plastik PET', weightKg: 15, pricePerKg: 4500, subtotalRp: 67500 },
      { categoryName: 'Minyak Jelantah', weightKg: 5, pricePerKg: 7500, subtotalRp: 37500 }
    ],
    totalWeightKg: 20,
    totalRp: 105000,
    pointsEarned: 225,
    paymentStatus: 'Lunas',
    notes: 'Penjemputan sukses via Tim Bersih Mandiri'
  },
  {
    id: 'trx-300',
    code: 'TRX-20260725-042',
    date: '25 Jul 2026, 10:30',
    nasabahId: 'nas-001',
    nasabahName: 'Budi Santoso',
    mitraId: 'mitra-01',
    mitraName: 'Bank Sampah Bersih Mandiri',
    type: 'SETORAN',
    details: [
      { categoryName: 'Kardus Bekas Cokelat', weightKg: 32, pricePerKg: 2400, subtotalRp: 76800 },
      { categoryName: 'Kaleng Alumunium', weightKg: 4.5, pricePerKg: 14500, subtotalRp: 65250 }
    ],
    totalWeightKg: 36.5,
    totalRp: 142050,
    pointsEarned: 272,
    paymentStatus: 'Lunas',
    notes: 'Setoran langsung di loket Bank Sampah'
  },
  {
    id: 'trx-299',
    code: 'TRX-20260710-019',
    date: '10 Jul 2026, 11:15',
    nasabahId: 'nas-001',
    nasabahName: 'Budi Santoso',
    mitraId: 'mitra-01',
    mitraName: 'Bank Sampah Bersih Mandiri',
    type: 'SETORAN',
    details: [
      { categoryName: 'Plastik Keras HDPE', weightKg: 18, pricePerKg: 3800, subtotalRp: 68400 },
      { categoryName: 'Kertas HVS Bekas', weightKg: 9.5, pricePerKg: 3000, subtotalRp: 28500 }
    ],
    totalWeightKg: 27.5,
    totalRp: 96900,
    pointsEarned: 201,
    paymentStatus: 'Lunas',
    notes: 'Setoran rutin bulanan'
  }
];

export const initialEduArticles: EduArticle[] = [
  {
    id: 'edu-01',
    title: 'Panduan Memilah Sampah Rumah Tangga: 5 Kategori Utama',
    slug: 'panduan-memilah-sampah-5-kategori',
    category: 'Panduan Memilah',
    summary: 'Langkah praktis memilah sampah organik, anorganik plastik, kertas, B3, dan minyak jelantah langsung dari dapur rumah.',
    content: `
      ### Mengapa Memilah Sampah dari Rumah Sangat Penting?
      Sampah yang tercampur sulit di daur ulang dan sering berakhir membusuk di TPA. Dengan memilah sampah menjadi 5 kelompok utama, kita membantu mitra bank sampah mengolahnya secara efisien dan meningkatkan nilai ekonomis hasil tabungan Anda.

      #### 1. Sampah Organik (Mudah Membusuk)
      - Contoh: Sisa sayuran, buah-buahan, ampas kopi, dedaunan.
      - Manfaat: Sangat cocok dijadikan kompo rumahan atau bahan cairan Eco-Enzyme.

      #### 2. Anorganik Plastik & Kemasan
      - Contoh: Botol PET bening, wadah deterjen HDPE, kantong plastik bening.
      - Tips: Bilas dengan sedikit air agar bebas sisa makanan, keringkan, lalu pipihkan sebelum disetor.

      #### 3. Kertas & Kardus
      - Contoh: Kardus paket, kertas HVS bekas, koran, majalah.
      - Tips: Jaga agar tetap kering dan ikat rapi. Kertas basah akan menurunkan kelas kualitasnya.

      #### 4. Kaleng & Kaca
      - Contoh: Kaleng alumunium, paku, botol sirup kaca.
      - Tips: Simpan dalam wadah terpisah agar aman dari risiko pecah atau tajam.

      #### 5. B3 & Minyak Jelantah
      - Contoh: Baterai bekas, lampu neon, minyak bekas pakai.
      - Tips: Kumpulkan minyak jelantah dalam jerigen tertutup. Jangan sekali-kali membuangnya ke saluran air!
    `,
    author: 'Tim From Waste To Wealth',
    date: '04 Agustus 2026',
    readTime: '4 menit',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    tags: ['Memilah Sampah', 'Tips Dapur', 'Rumah Tangga', 'Zero Waste'],
    views: 1420
  },
  {
    id: 'edu-02',
    title: 'Mengenal Kode Segitiga Daur Ulang Plastik (1 sampai 7)',
    slug: 'mengenal-kode-daur-ulang-plastik',
    category: 'Inovasi Daur Ulang',
    summary: 'Pahami arti angka di dalam segitiga daur ulang pada botol dan wadah plastik agar tahu mana yang berharga tinggi di Bank Sampah.',
    content: `
      Setiap produk plastik memiliki simbol segitiga Panah (RIC / Resin Identification Code) di bagian bawah. Berikut penjelasannya:

      - **Kode 1 (PET / PETE):** Botol air mineral & jus. Nilai ekonomi sangat tinggi!
      - **Kode 2 (HDPE):** Botol sampo, botol susu, jerigen. Sangat dicari pemproses daur ulang.
      - **Kode 3 (PVC):** Pipa air, kabel. Perlu penanganan khusus.
      - **Kode 4 (LDPE):** Plastik kresek, bubble wrap.
      - **Kode 5 (PP):** Wadah makanan tahan panas, sedotan.
      - **Kode 6 (PS):** Styrofoam. Sebaiknya dikurangi pemakaiannya.
      - **Kode 7 (OTHER):** Bahan campuran komposit.
    `,
    author: 'Ir. Ratna Dewi, M.Env',
    date: '28 Juli 2026',
    readTime: '5 menit',
    imageUrl: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=600&auto=format&fit=crop&q=80',
    tags: ['Daur Ulang', 'Plastik PET', 'Edukasi Lingkungan'],
    views: 980
  },
  {
    id: 'edu-03',
    title: 'Mengubah Minyak Jelantah Jadi Tabungan & Biodiesel',
    slug: 'mengubah-minyak-jelantah-jadi-tabungan',
    category: 'Gaya Hidup',
    summary: 'Jangan buang minyak jelantah ke wastafel! Selain merusak pipa, jelantah bernilai tinggi di Bank Sampah Mitra.',
    content: `
      1 liter minyak jelantah dapat ditukar dengan nilai Rp 7.500 di mitra Bank Sampah. Minyak ini akan diolah lebih lanjut menjadi bahan bakar ramah lingkungan (Biodiesel).

      **Cara Mengumpulkan:**
      1. Biarkan minyak dingin setelah memasak.
      2. Saring sisa makanan dengan kain/saringan halus.
      3. Tuang ke dalam botol bekas atau jerigen.
      4. Kumpulkan hingga 3-5 Liter lalu manfaatkan layanan penjemputan mitra.
    `,
    author: 'Komunitas Zero Waste Indo',
    date: '15 Juli 2026',
    readTime: '3 menit',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    tags: ['Minyak Jelantah', 'Biodiesel', 'Cegah Pencemaran'],
    views: 2150
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Wadah minyak goreng bekas (Jelantah) sebaiknya disetor dalam kondisi bagaimana?',
    options: [
      'Dibuang langsung ke saluran air dapur',
      'Disaring dan disimpan dalam botol/jerigen rapat',
      'Dicampur bersama sisa sayuran di tempat sampah',
      'Dibakar di pekarangan rumah'
    ],
    correctIndex: 1,
    explanation: 'Minyak jelantah yang disaring dan ditampung di jerigen rapat bernilai ekonomis tinggi (Rp 7.500/kg) dan diolah menjadi biodiesel!'
  },
  {
    id: 2,
    question: 'Botol plastik air mineral bening bertanda angka "1" di dalam segitiga termasuk jenis plastik...',
    options: ['HDPE', 'PET / PETE', 'PVC', 'Styrofoam'],
    correctIndex: 1,
    explanation: 'Angka 1 adalah PET (Polyethylene Terephthalate), jenis plastik yang paling mudah didaur ulang dan dicari di Bank Sampah.'
  },
  {
    id: 3,
    question: 'Mengapa kardus atau kertas yang disetor ke Bank Sampah harus dalam kondisi KERING?',
    options: [
      'Agar tidak berat saat ditimbang',
      'Kertas basah mudah merusak mesin pencacah & menurunkan grade daur ulang',
      'Kertas basah berbau wangi',
      'Hanya aturan biasa tanpa alasan'
    ],
    correctIndex: 1,
    explanation: 'Kertas & kardus basah merusak kualitas serat selulosa dan dapat memicu jamur sehingga nilai belinya drop.'
  }
];

export const initialEcoRewards: EcoReward[] = [
  {
    id: 'rew-1',
    title: 'Saldo GoPay / OVO / DANA Rp 25.000',
    category: 'E-Wallet',
    pointsRequired: 500,
    valueRp: 25000,
    icon: 'Wallet',
    description: 'Transfer saldo langsung ke dompet digital Anda secara instan.'
  },
  {
    id: 'rew-2',
    title: 'Token Listrik PLN Rp 50.000',
    category: 'Token PLN',
    pointsRequired: 950,
    valueRp: 50000,
    icon: 'Zap',
    description: 'Kode token 20 digit dikirim melalui WhatsApp & SMS.'
  },
  {
    id: 'rew-3',
    title: 'Voucher Sembako Indomaret Rp 50.000',
    category: 'Voucher Sembako',
    pointsRequired: 900,
    valueRp: 50000,
    icon: 'ShoppingBag',
    description: 'Voucher belanja digital yang dapat digunakan di seluruh gerai Indomaret.'
  },
  {
    id: 'rew-4',
    title: 'Pulsa All Operator Rp 20.000',
    category: 'Pulsa',
    pointsRequired: 400,
    valueRp: 20000,
    icon: 'Smartphone',
    description: 'Pulsa reguler untuk Telkomsel, Indosat, XL, Tri, dan Smartfren.'
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Permintaan Penjemputan Terkirim',
    message: 'Jadwal penjemputan PKP-20260805-01 sedang ditinjau oleh Bank Sampah Bersih Mandiri.',
    timestamp: '2 jam yang lalu',
    isRead: false,
    type: 'pickup'
  },
  {
    id: 'notif-2',
    title: 'Setoran Sampah Berhasil Ditambahkan',
    message: 'Anda mendapatkan saldo Rp 105.000 dan 225 Poin dari transaksi TRX-20260802-088.',
    timestamp: '5 hari yang lalu',
    isRead: true,
    type: 'transaction'
  }
];
