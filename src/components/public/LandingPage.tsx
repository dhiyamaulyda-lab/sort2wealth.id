import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Recycle,
  Truck,
  Wallet,
  MapPin,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Sparkles,
  Users,
  Leaf,
  CheckCircle2,
  Calculator,
  ChevronRight,
  Star,
  UserPlus,
  Building2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveNavTab, setUserRole, setIsPickupModalOpen, openAuthModal, mitraList, wastePrices } = useApp();

  // Calculator State
  const [calcPlasticKg, setCalcPlasticKg] = useState(12);
  const [calcPaperKg, setCalcPaperKg] = useState(18);
  const [calcJelantahLiter, setCalcJelantahLiter] = useState(4);

  const estPlasticRp = calcPlasticKg * 4500;
  const estPaperRp = calcPaperKg * 2400;
  const estJelantahRp = calcJelantahLiter * 7500;
  const totalEstRp = estPlasticRp + estPaperRp + estJelantahRp;
  const totalEstPoints = Math.floor(totalEstRp / 500);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-emerald-50/70 border-b border-emerald-100 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* LEFT SIDE: Public & Nasabah Concept */}
            <div className="lg:col-span-7 flex flex-col justify-between py-2">
              <div>
                <p className="text-emerald-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
                  REVOLUSI PENGELOLAAN SAMPAH
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tighter mb-6 text-slate-900 uppercase">
                  UBAH <span className="text-emerald-500">SAMPAH</span><br />
                  MENJADI SUMBER PENGHASILAN.
                </h1>
                <p className="text-slate-600 text-sm sm:text-base max-w-md leading-relaxed mb-8">
                  Platform manajemen sampah cerdas yang menghubungkan rumah tangga dengan bank sampah lokal. Kelola limbah Anda secara profesional dan raih keuntungan ekonomi.
                </p>

                {/* Primary Actions */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <button
                    onClick={() => {
                      setUserRole('nasabah');
                      setIsPickupModalOpen(true);
                    }}
                    className="px-6 py-3.5 text-xs font-black uppercase tracking-widest bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    <span>JEMPUT SAMPAH</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserRole('nasabah');
                      setActiveNavTab('portal_nasabah');
                    }}
                    className="px-6 py-3.5 text-xs font-black uppercase tracking-widest border-2 border-emerald-300 text-emerald-900 rounded-full hover:bg-emerald-100 transition-all cursor-pointer"
                  >
                    PROFIL NASABAH
                  </button>
                </div>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-xs border border-emerald-100/80">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="font-black text-sm uppercase tracking-tight text-slate-900">128 Lokasi</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Mitra bank sampah terdekat di kota Anda.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-xs border border-emerald-100/80">
                  <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <p className="font-black text-sm uppercase tracking-tight text-slate-900">Edukasi</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Pelajari cara memilah sampah yang benar.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-xs border border-emerald-100/80">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-3">
                    <Truck className="w-5 h-5" />
                  </div>
                  <p className="font-black text-sm uppercase tracking-tight text-slate-900">Penjemputan</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Request kurir langsung dari pintu rumah.</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Admin Dashboard Preview */}
            <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 text-white flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
                  <div>
                    <h2 className="text-white font-black text-xl tracking-tight">DASHBOARD MITRA</h2>
                    <p className="text-emerald-400 text-[10px] uppercase font-extrabold tracking-widest mt-0.5">UNIT: BS LESTARI JAYA</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserRole('admin_mitra');
                      setActiveNavTab('dashboard_mitra');
                    }}
                    className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
                  >
                    Buka App
                  </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700/60">
                    <p className="text-slate-400 text-[9px] font-extrabold uppercase tracking-widest">Total Tabungan</p>
                    <p className="text-emerald-400 text-2xl font-black mt-1">Rp 12.4M</p>
                  </div>
                  <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700/60">
                    <p className="text-slate-400 text-[9px] font-extrabold uppercase tracking-widest">Volume Sampah</p>
                    <p className="text-white text-2xl font-black mt-1">4.2 Ton</p>
                  </div>
                </div>

                {/* Schedule List */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    Jadwal Penjemputan Hari Ini
                  </h3>
                  <div className="space-y-2">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center font-black text-xs shrink-0">
                        09:00
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-xs font-bold truncate">Jl. Melati No. 12</p>
                        <p className="text-slate-400 text-[10px] truncate">Nasabah: Budi Santoso (Plastik/Kertas)</p>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-500/20 text-teal-400 rounded-lg flex items-center justify-center font-black text-xs shrink-0">
                        10:30
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-xs font-bold truncate">Perum Graha Indah B4</p>
                        <p className="text-slate-400 text-[10px] truncate">Nasabah: Siti Aminah (Kaleng/Kaca)</p>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center font-black text-xs shrink-0">
                        13:00
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-xs font-bold truncate">Apartemen Green Bay</p>
                        <p className="text-slate-400 text-[10px] truncate">Nasabah: Kevin Tan (Elektronik)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Footer */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setUserRole('admin_mitra');
                    setActiveNavTab('dashboard_mitra');
                  }}
                  className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Input Transaksi
                </button>
                <button
                  onClick={() => {
                    setUserRole('admin_mitra');
                    setActiveNavTab('dashboard_mitra');
                  }}
                  className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  Kelola Edukasi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Impact Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">12.450+</span>
            <p className="text-xs font-bold text-slate-700">Kg Sampah Terkelola</p>
            <p className="text-[10px] text-slate-400">Terdaftar di Sistem Mitra</p>
          </div>

          <div className="space-y-1 border-l border-slate-100 pl-4">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">Rp 185,2 Juta</span>
            <p className="text-xs font-bold text-slate-700">Total Tabungan Disalurkan</p>
            <p className="text-[10px] text-slate-400">Langsung ke Nasabah</p>
          </div>

          <div className="space-y-1 border-l border-slate-100 pl-4">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">{mitraList.length} Bank Sampah</span>
            <p className="text-xs font-bold text-slate-700">Mitra Aktif Bekerjasama</p>
            <p className="text-[10px] text-slate-400">Jabodetabek, Bandung, Surabaya</p>
          </div>

          <div className="space-y-1 border-l border-slate-100 pl-4">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">18,1 Ton</span>
            <p className="text-xs font-bold text-slate-700">Estimasi CO2 Terkurangi</p>
            <p className="text-[10px] text-slate-400">Dampak Lingkungan Sirkular</p>
          </div>
        </div>
      </section>

      {/* Workflow - Cara Kerja Platform */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Alur Kerja Sederhana
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            4 Langkah Mudah Menabung Sampah
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Proses transparan dan terintegrasi dari rumah hingga diterima mitra bank sampah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative hover:border-emerald-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-sm mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Pilah Sampah</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pisahkan plastik botol (PET), kardus, kaleng, dan minyak jelantah dari tempat sampah rumah tangga Anda.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative hover:border-emerald-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center text-sm mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Setor / Request Penjemputan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pilih lokasi mitra bank sampah terdekat atau gunakan fitur Request Penjemputan Tim Kurir langsung ke rumah.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative hover:border-emerald-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-extrabold flex items-center justify-center text-sm mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Timbang & Catat Resi Digital</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Petugas menimbang sampah secara terbuka dan menginput transaksi langsung ke aplikasi From Waste To Wealth.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative hover:border-emerald-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 font-extrabold flex items-center justify-center text-sm mb-4">
              04
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Cairkan Saldo & Reward</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Saldo otomatis masuk ke akun nasabah dan bisa dicairkan ke e-Wallet, token PLN, atau voucher belanja.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Waste Valuation Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-800/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Simulasi Potensi Tabungan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hitung Estimasi Pendapatan Sampah Anda
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Geser penggeser di bawah ini untuk mengestimasi berapa nilai rupiah dan poin reward dari akumulasi sampah bulanan rumah tangga Anda.
            </p>

            <div className="space-y-4 pt-2">
              {/* Slider 1: Botol Plastik PET */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>Botol Plastik PET (Rp 4.500/kg)</span>
                  <span className="text-emerald-400 font-mono">{calcPlasticKg} kg</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={calcPlasticKg}
                  onChange={e => setCalcPlasticKg(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Slider 2: Kardus Bekas */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>Kardus Bekas Kering (Rp 2.400/kg)</span>
                  <span className="text-emerald-400 font-mono">{calcPaperKg} kg</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={calcPaperKg}
                  onChange={e => setCalcPaperKg(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Slider 3: Minyak Jelantah */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>Minyak Jelantah (Rp 7.500/Liter)</span>
                  <span className="text-emerald-400 font-mono">{calcJelantahLiter} Liter</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={calcJelantahLiter}
                  onChange={e => setCalcJelantahLiter(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl text-center space-y-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Estimasi Tabungan Bulanan</span>

              <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
                Rp {totalEstRp.toLocaleString('id-ID')}
              </div>

              <div className="inline-block bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                + {totalEstPoints} Poin Reward Tambahan
              </div>

              <div className="grid grid-cols-3 gap-2 text-left pt-2 text-[11px] text-slate-400 border-t border-slate-700/80">
                <div>
                  <span className="block font-semibold text-slate-300">Plastik:</span>
                  <span>Rp {estPlasticRp.toLocaleString('id-ID')}</span>
                </div>
                <div>
                  <span className="block font-semibold text-slate-300">Kardus:</span>
                  <span>Rp {estPaperRp.toLocaleString('id-ID')}</span>
                </div>
                <div>
                  <span className="block font-semibold text-slate-300">Jelantah:</span>
                  <span>Rp {estJelantahRp.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setUserRole('nasabah');
                  setIsPickupModalOpen(true);
                }}
                className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Jemput Sampah Sekarang & Kumpulkan Tabungan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Partner Waste Banks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Jaringan Mitra
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Mitra Bank Sampah Terpercaya</h2>
          </div>
          <button
            onClick={() => setActiveNavTab('lokasi')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            Lihat Semua Mitra ({mitraList.length}) <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mitraList.slice(0, 4).map(mitra => (
            <div
              key={mitra.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all group"
            >
              <div className="h-36 relative overflow-hidden bg-slate-100">
                <img
                  src={mitra.imageUrl}
                  alt={mitra.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-emerald-800/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-300 fill-amber-300" /> {mitra.rating}
                </span>
              </div>

              <div className="p-4 space-y-3">
                <h3 className="font-bold text-sm text-slate-800 line-clamp-1">{mitra.name}</h3>
                <p className="text-xs text-slate-500 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{mitra.address}, {mitra.city}</span>
                </p>

                <div className="flex flex-wrap gap-1">
                  {mitra.acceptedTypes.map((type, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 text-[9px] font-semibold px-2 py-0.5 rounded">
                      {type}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveNavTab('lokasi')}
                  className="w-full mt-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs py-2 rounded-xl text-center transition-colors"
                >
                  Lihat Detail & Lokasi
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registration & Login Call-to-Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Bergabung dalam Ekosistem Daur Ulang Digital
            </span>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Belum Memiliki Akun di From Waste To Wealth?
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Daftar sekarang secara gratis! Baik sebagai warga (nasabah) yang ingin menabung sampah, maupun pengelola bank sampah (mitra) yang ingin mendigitalisasi operasional dan penjemputan sampah.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => openAuthModal('nasabah', 'register')}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Akun Nasabah</span>
              </button>

              <button
                onClick={() => openAuthModal('mitra', 'register')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Daftarkan Unit Bank Sampah</span>
              </button>

              <button
                onClick={() => openAuthModal('nasabah', 'login')}
                className="text-xs font-bold text-slate-300 hover:text-white underline px-3 py-3.5 cursor-pointer"
              >
                Sudah punya akun? Masuk di sini →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
