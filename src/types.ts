export type UserRole = 'public' | 'nasabah' | 'admin_mitra';

export interface Nasabah {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  balanceRp: number;
  rewardPoints: number;
  totalWasteKg: number;
  level: string;
  memberSince: string;
  co2SavedKg: number;
  treesSaved: number;
}

export interface WastePriceItem {
  id: string;
  category: 'Plastik' | 'Kertas' | 'Kaleng' | 'Organik' | 'Elektronik' | 'Kaca';
  subCategory: string;
  unit: string; // e.g. 'kg'
  pricePerUnit: number; // in Rp
  pointPerUnit: number;
  iconName: string;
  description: string;
}

export interface MitraBank {
  id: string;
  name: string;
  slug: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  whatsapp: string;
  openHours: string;
  openDays: string;
  rating: number;
  reviewsCount: number;
  lat: number;
  lng: number;
  acceptedTypes: Array<'Plastik' | 'Kertas' | 'Kaleng' | 'Organik' | 'Elektronik' | 'Kaca'>;
  prices: WastePriceItem[];
  imageUrl: string;
  isVerified: boolean;
}

export type PickupStatus = 'Menunggu Konfirmasi' | 'Disetujui' | 'Penjemputan Berlangsung' | 'Selesai' | 'Dibatalkan';

export interface PickupItemEstimate {
  categoryId: string;
  categoryName: string;
  estimatedKg: number;
}

export interface PickupRequest {
  id: string;
  code: string;
  nasabahId: string;
  nasabahName: string;
  nasabahPhone: string;
  mitraId: string;
  mitraName: string;
  address: string;
  pickupDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g., '09:00 - 11:00'
  items: PickupItemEstimate[];
  notes?: string;
  status: PickupStatus;
  createdAt: string;
  driverName?: string;
  driverPhone?: string;
  finalWeightKg?: number;
  finalAmountRp?: number;
  finalPoints?: number;
}

export interface Transaction {
  id: string;
  code: string;
  date: string;
  nasabahId: string;
  nasabahName: string;
  mitraId: string;
  mitraName: string;
  type: 'SETORAN' | 'PENJEMPUTAN' | 'PENARIKAN_SALDO' | 'PENUKARAN_POIN';
  details: {
    categoryName: string;
    weightKg: number;
    pricePerKg: number;
    subtotalRp: number;
  }[];
  totalWeightKg: number;
  totalRp: number;
  pointsEarned: number;
  paymentStatus: 'Lunas' | 'Proses';
  notes?: string;
}

export interface EduArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Panduan Memilah' | 'Inovasi Daur Ulang' | 'Gaya Hidup' | 'Kebijakan & Dampak';
  summary: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  views: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface EcoReward {
  id: string;
  title: string;
  category: 'E-Wallet' | 'Token PLN' | 'Voucher Sembako' | 'Pulsa';
  pointsRequired: number;
  valueRp: number;
  icon: string;
  description: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'pickup' | 'transaction' | 'reward' | 'info';
}
