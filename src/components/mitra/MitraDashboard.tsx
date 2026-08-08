import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PickupManagement } from './PickupManagement';
import { TransactionManagement } from './TransactionManagement';
import { EduManagement } from './EduManagement';
import { MitraProfileEditor } from './MitraProfileEditor';
import {
  LayoutDashboard,
  Truck,
  DollarSign,
  BookOpen,
  Building2,
  Users,
  TrendingUp,
  Recycle,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const MitraDashboard: React.FC = () => {
  const {
    activeMitraAdmin,
    pickupRequests,
    transactions,
    selectedMitraTab,
    setSelectedMitraTab,
    setUserRole,
    setActiveNavTab
  } = useApp();

  const mitraPickups = pickupRequests.filter(req => req.mitraId === activeMitraAdmin.id);
  const pendingPickupsCount = mitraPickups.filter(req => req.status === 'Menunggu Konfirmasi').length;

  const totalWasteKg = transactions.reduce((acc, t) => acc + t.totalWeightKg, 0);
  const totalPayoutRp = transactions.reduce((acc, t) => acc + t.totalRp, 0);

  // Chart Mock Monthly Data
  const monthlyData = [
    { month: 'Jan', kg: 1200, payoutRp: 5200000 },
    { month: 'Feb', kg: 1450, payoutRp: 6100000 },
    { month: 'Mar', kg: 1800, payoutRp: 7800000 },
    { month: 'Apr', kg: 2100, payoutRp: 8900000 },
    { month: 'Mei', kg: 2400, payoutRp: 10200000 },
    { month: 'Jun', kg: 2900, payoutRp: 12500000 },
    { month: 'Jul', kg: 3400, payoutRp: 14800000 },
    { month: 'Agu', kg: 3850, payoutRp: 16900000 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Admin Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-800/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
            <Building2 className="w-3.5 h-3.5" /> Dashboard Pengelola Mitra
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{activeMitraAdmin.name}</h1>
          <p className="text-xs text-slate-300">
            {activeMitraAdmin.address}, {activeMitraAdmin.city} • Telepon: {activeMitraAdmin.phone}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setUserRole('nasabah');
              setActiveNavTab('portal_nasabah');
            }}
            className="bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
          >
            ← Kembalikan ke Mode Nasabah
          </button>
        </div>
      </div>

      {/* Dashboard Sub-navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedMitraTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
            selectedMitraTab === 'overview'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Ringkasan Statistik</span>
        </button>

        <button
          onClick={() => setSelectedMitraTab('pickups')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap relative ${
            selectedMitraTab === 'pickups'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Jadwal Penjemputan</span>
          {pendingPickupsCount > 0 && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {pendingPickupsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setSelectedMitraTab('transactions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
            selectedMitraTab === 'transactions'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Kelola Transaksi & Harga</span>
        </button>

        <button
          onClick={() => setSelectedMitraTab('education')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
            selectedMitraTab === 'education'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Kelola Edukasi</span>
        </button>

        <button
          onClick={() => setSelectedMitraTab('profile')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
            selectedMitraTab === 'profile'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Profil Mitra</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW STATS & CHARTS */}
      {selectedMitraTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Sampah Terkumpul</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Recycle className="w-4 h-4" />
                </div>
              </div>
              <span className="text-2xl font-black text-slate-900 block">{totalWasteKg.toFixed(1)} kg</span>
              <p className="text-[10px] text-emerald-700 font-semibold">↑ +14.2% dari bulan lalu</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Pencairan Tabungan</span>
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <span className="text-2xl font-black text-slate-900 block">Rp {totalPayoutRp.toLocaleString('id-ID')}</span>
              <p className="text-[10px] text-amber-700 font-semibold">Tersalurkan ke nasabah</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Antrean Penjemputan</span>
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
              <span className="text-2xl font-black text-slate-900 block">{pendingPickupsCount} Permintaan</span>
              <p className="text-[10px] text-indigo-700 font-semibold">Membutuhkan konfirmasi</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nasabah Aktif Mitra</span>
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <span className="text-2xl font-black text-slate-900 block">128 Nasabah</span>
              <p className="text-[10px] text-teal-700 font-semibold">Wilayah {activeMitraAdmin.district}</p>
            </div>
          </div>

          {/* Recharts Analytics Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Tren Volume Pengumpulan Sampah (kg/Bulan)</h3>
                <p className="text-xs text-slate-500">Statistik penerimaan sampah terpilah pada Bank Sampah Mitra tahun 2026</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Pertumbuhan Positif
              </span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorKg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px', fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="kg" stroke="#059669" fillOpacity={1} fill="url(#colorKg)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Aksi Cepat Pengelola</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedMitraTab('pickups')}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 transition-colors flex items-center justify-between text-xs font-semibold text-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    Tinjau {pendingPickupsCount} Request Penjemputan Baru
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => setSelectedMitraTab('transactions')}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 transition-colors flex items-center justify-between text-xs font-semibold text-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    Catat Setoran Loket Manual
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-5 rounded-2xl space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Standar Kualitas From Waste To Wealth</span>
              <h4 className="font-extrabold text-sm">Pastikan Timbangan Terkalibrasi Digital</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                From Waste To Wealth menggunakan sistem verifikasi resi terenkripsi. Selalu pastikan berat dan jenis sampah terpilah sesuai dengan entri loket.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PICKUP MANAGEMENT */}
      {selectedMitraTab === 'pickups' && <PickupManagement />}

      {/* TAB 3: TRANSACTION & PRICE MANAGEMENT */}
      {selectedMitraTab === 'transactions' && <TransactionManagement />}

      {/* TAB 4: EDU CONTENT CMS */}
      {selectedMitraTab === 'education' && <EduManagement />}

      {/* TAB 5: PROFILE EDITOR */}
      {selectedMitraTab === 'profile' && <MitraProfileEditor />}
    </div>
  );
};
