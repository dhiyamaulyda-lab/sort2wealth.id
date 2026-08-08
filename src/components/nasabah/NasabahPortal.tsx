import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Transaction, EcoReward } from '../../types';
import { initialEcoRewards } from '../../data/mockData';
import { TransactionReceiptModal } from './TransactionReceiptModal';
import { RewardRedemptionModal } from './RewardRedemptionModal';
import {
  Wallet,
  Award,
  Truck,
  History,
  Gift,
  User,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  ChevronRight,
  TrendingUp,
  Leaf,
  Sparkles,
  MapPin,
  Calendar,
  ArrowLeft,
  Trash2
} from 'lucide-react';

export const NasabahPortal: React.FC = () => {
  const {
    nasabah,
    nasabahList,
    setActiveNasabahId,
    deleteNasabahAccount,
    updateNasabah,
    pickupRequests,
    transactions,
    setIsPickupModalOpen,
    wastePrices,
    setUserRole,
    setActiveNavTab,
    openAuthModal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pickups' | 'transactions' | 'rewards' | 'profile'>('pickups');
  const [selectedReceiptTx, setSelectedReceiptTx] = useState<Transaction | null>(null);
  const [selectedReward, setSelectedReward] = useState<EcoReward | null>(null);

  // Profile Edit Form State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(nasabah.name);
  const [phoneInput, setPhoneInput] = useState(nasabah.phone);
  const [addressInput, setAddressInput] = useState(nasabah.address);

  const myPickups = pickupRequests.filter(req => req.nasabahId === nasabah.id);
  const myTransactions = transactions.filter(tx => tx.nasabahId === nasabah.id);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateNasabah({
      name: nameInput,
      phone: phoneInput,
      address: addressInput
    });
    setIsEditingProfile(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Menunggu Konfirmasi':
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Menunggu Konfirmasi</span>;
      case 'Disetujui':
        return <span className="bg-sky-100 text-sky-800 border border-sky-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Disetujui (Jadwal Siap)</span>;
      case 'Penjemputan Berlangsung':
        return <span className="bg-indigo-100 text-indigo-800 border border-indigo-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Truck className="w-3 h-3" /> Driver Dalam Perjalanan</span>;
      case 'Selesai':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Selesai</span>;
      default:
        return <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><XCircle className="w-3 h-3" /> Dibatalkan</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Navigation / Return Home & Account Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <button
          onClick={() => {
            setActiveNavTab('beranda');
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold shrink-0">
            Akun Aktif:
          </span>
          <select
            value={nasabah.id}
            onChange={(e) => {
              if (e.target.value === 'NEW') {
                openAuthModal('nasabah', 'login');
              } else {
                setActiveNasabahId(e.target.value);
              }
            }}
            className="bg-emerald-50 border border-emerald-300 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {nasabahList.map(nItem => (
              <option key={nItem.id} value={nItem.id}>
                {nItem.name} ({nItem.email || nItem.phone})
              </option>
            ))}
            <option value="NEW">+ Masuk / Daftar Akun Baru...</option>
          </select>
        </div>
      </div>

      {/* Overview Balance & Stat Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={nasabah.avatar}
              alt={nasabah.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400/80 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold">{nasabah.name}</h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {nasabah.level}
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {nasabah.address}
              </p>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex-1 sm:w-48 shadow-inner">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Saldo Tabungan Sampah
              </span>
              <span className="text-2xl font-black text-amber-300 block mt-0.5">
                Rp {nasabah.balanceRp.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex-1 sm:w-44 shadow-inner">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Poin Reward Eco
              </span>
              <span className="text-xl font-extrabold text-emerald-300 flex items-center gap-1.5 mt-0.5">
                <Award className="w-5 h-5 text-amber-400" /> {nasabah.rewardPoints} Poin
              </span>
            </div>

            <button
              onClick={() => setIsPickupModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 transition-transform transform hover:-translate-y-0.5 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Request Penjemputan</span>
            </button>
          </div>
        </div>

        {/* Environmental Impact Metrics Strip */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">Total Sampah Disetor</span>
            <span className="font-bold text-white text-sm">{nasabah.totalWasteKg} kg</span>
          </div>
          <div className="border-l border-slate-800">
            <span className="text-[10px] text-slate-400 block">Emisi CO2 Diselamatkan</span>
            <span className="font-bold text-emerald-400 text-sm">{nasabah.co2SavedKg} kg</span>
          </div>
          <div className="border-l border-slate-800">
            <span className="text-[10px] text-slate-400 block">Ekivalen Pohon Diselamatkan</span>
            <span className="font-bold text-amber-300 text-sm">{nasabah.treesSaved} Pohon</span>
          </div>
        </div>
      </div>

      {/* Tabs Sub-Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('pickups')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'pickups'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Status Penjemputan Sampah ({myPickups.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'transactions'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Riwayat & Resi Transaksi ({myTransactions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'rewards'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Tukar Eco-Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profil Nasabah</span>
        </button>
      </div>

      {/* TAB 1: PICKUP REQUESTS */}
      {activeTab === 'pickups' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800">Daftar Request Penjemputan Anda</h3>
            <button
              onClick={() => setIsPickupModalOpen(true)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Buat Request Baru
            </button>
          </div>

          {myPickups.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
              Belum ada permintaan penjemputan. Klik tombol di atas untuk menjadwalkan penjemputan sampah.
            </div>
          ) : (
            <div className="space-y-4">
              {myPickups.map(req => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4 hover:border-emerald-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-xs text-slate-900">{req.code}</span>
                        <span className="text-[10px] text-slate-400">({req.createdAt})</span>
                      </div>
                      <p className="text-xs font-bold text-emerald-800 mt-0.5">{req.mitraName}</p>
                    </div>

                    <div>{getStatusBadge(req.status)}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Jadwal & Waktu Sesi:</span>
                      <span className="font-bold text-slate-800">{req.pickupDate} ({req.timeSlot})</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Alamat Penjemputan:</span>
                      <span className="font-semibold text-slate-800 line-clamp-1">{req.address}</span>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Estimasi Item Sampah:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {req.items.map((item, idx) => (
                        <span key={idx} className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-semibold">
                          {item.categoryName}: <strong className="text-emerald-700">{item.estimatedKg} kg</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Driver info if assigned */}
                  {req.driverName && (
                    <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Kurir Bertugas</span>
                        <span className="font-bold text-slate-900">{req.driverName} ({req.driverPhone})</span>
                      </div>
                      <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">Dalam Tugas</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TRANSACTIONS & DIGITAL RECEIPTS */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800">Riwayat Setoran & Transaksi</h3>
            <span className="text-xs text-slate-500">Klik transaksi untuk melihat resi digital</span>
          </div>

          {myTransactions.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
              Belum ada data transaksi setoran sampah.
            </div>
          ) : (
            <div className="space-y-3">
              {myTransactions.map(tx => (
                <div
                  key={tx.id}
                  onClick={() => setSelectedReceiptTx(tx)}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-800">{tx.code}</span>
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                          {tx.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{tx.mitraName} • {tx.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-0 pt-2 sm:pt-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <span className="text-sm font-black text-emerald-700 block">
                        +Rp {tx.totalRp.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-amber-600 font-bold">+{tx.pointsEarned} Poin ({tx.totalWeightKg} kg)</span>
                    </div>

                    <button className="bg-slate-100 text-slate-700 p-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ECO-REWARDS REDEMPTION */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800">Tukar Poin Reward From Waste To Wealth</h3>
              <p className="text-xs text-slate-500">Tukarkan poin reward hasil menabung sampah dengan saldo e-Wallet, PLN, atau sembako.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl">
              Poin Anda: {nasabah.rewardPoints} Poin
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialEcoRewards.map(reward => (
              <div
                key={reward.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {reward.category}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mt-1">{reward.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{reward.description}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Syarat Poin:</span>
                    <span className="font-bold text-amber-600">{reward.pointsRequired} Poin</span>
                  </div>

                  <button
                    onClick={() => setSelectedReward(reward)}
                    disabled={nasabah.rewardPoints < reward.pointsRequired}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Tukar Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 max-w-2xl mx-auto space-y-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">Detail Profil Nasabah</h3>
            {!isEditingProfile ? (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                Edit Informasi
              </button>
            ) : (
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-xs font-bold text-slate-400 hover:underline"
              >
                Batal
              </button>
            )}
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  required
                  value={phoneInput}
                  onChange={e => setPhoneInput(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Domisili</label>
                <textarea
                  rows={2}
                  required
                  value={addressInput}
                  onChange={e => setAddressInput(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">Nama Lengkap:</span>
                  <span className="font-bold text-slate-800 text-sm">{nasabah.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Email:</span>
                  <span className="font-semibold text-slate-800">{nasabah.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Nomor Telepon/WA:</span>
                  <span className="font-semibold text-slate-800">{nasabah.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Tanggal Bergabung:</span>
                  <span className="font-semibold text-slate-800">{nasabah.memberSince}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Alamat Penjemputan Utama:</span>
                <p className="font-semibold text-slate-800 mt-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {nasabah.address}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                {showDeleteConfirm ? (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-rose-800">
                      Apakah Anda yakin ingin menghapus akun &quot;{nasabah.name}&quot; secara permanen?
                    </p>
                    <p className="text-[11px] text-rose-600">
                      Tindakan ini tidak dapat dibatalkan. Riwayat transaksi dan saldo akun ini akan dihapus.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          deleteNasabahAccount(nasabah.id);
                        }}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Ya, Hapus Akun Ini
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="text-xs text-slate-500 font-medium">
                      <span className="font-bold text-slate-700 block">Zona Bahaya</span>
                      Hapus akun nasabah ini jika sudah tidak digunakan.
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-4 py-2 rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Hapus Akun Ini</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Transaction Receipt Modal */}
      <TransactionReceiptModal
        transaction={selectedReceiptTx}
        onClose={() => setSelectedReceiptTx(null)}
      />

      {/* Reward Redemption Modal */}
      <RewardRedemptionModal
        reward={selectedReward}
        onClose={() => setSelectedReward(null)}
      />
    </div>
  );
};
