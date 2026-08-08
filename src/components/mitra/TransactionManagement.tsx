import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WastePriceItem } from '../../types';
import {
  FileText,
  Plus,
  Edit2,
  Save,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Tag,
  Search
} from 'lucide-react';

export const TransactionManagement: React.FC = () => {
  const {
    transactions,
    addTransaction,
    wastePrices,
    updateWastePriceItem,
    activeMitraAdmin,
    nasabah
  } = useApp();

  const [activeTab, setActiveTab] = useState<'prices' | 'add_deposit' | 'all_tx'>('prices');

  // Edit Waste Price State
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<number>(0);
  const [editPointVal, setEditPointVal] = useState<number>(0);

  // New Deposit State
  const [depositNasabahName, setDepositNasabahName] = useState(nasabah.name);
  const [depositCategory, setDepositCategory] = useState(wastePrices[0]?.id || '');
  const [depositWeightKg, setDepositWeightKg] = useState<number>(15);
  const [depositNotes, setDepositNotes] = useState('Setoran langsung di loket Bank Sampah');
  const [isDepositSuccess, setIsDepositSuccess] = useState(false);

  const selectedPriceObj = wastePrices.find(p => p.id === depositCategory) || wastePrices[0];
  const calculatedTotalRp = (depositWeightKg || 0) * (selectedPriceObj?.pricePerUnit || 0);
  const calculatedPoints = Math.floor(calculatedTotalRp / 500);

  const handleSavePriceEdit = (id: string) => {
    updateWastePriceItem(id, editPriceVal, editPointVal);
    setEditingPriceId(null);
  };

  const handleCreateDeposit = (e: React.FormEvent) => {
    e.preventDefault();

    addTransaction({
      nasabahId: nasabah.id,
      nasabahName: depositNasabahName,
      mitraId: activeMitraAdmin.id,
      mitraName: activeMitraAdmin.name,
      type: 'SETORAN',
      details: [
        {
          categoryName: selectedPriceObj.subCategory,
          weightKg: depositWeightKg,
          pricePerKg: selectedPriceObj.pricePerUnit,
          subtotalRp: calculatedTotalRp
        }
      ],
      totalWeightKg: depositWeightKg,
      totalRp: calculatedTotalRp,
      pointsEarned: calculatedPoints,
      paymentStatus: 'Lunas',
      notes: depositNotes
    });

    setIsDepositSuccess(true);
    setTimeout(() => {
      setIsDepositSuccess(false);
      setActiveTab('all_tx');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Kelola Transaksi & Harga Beli Sampah</h2>
          <p className="text-xs text-slate-500">Atur standar tarif beli sampah per kg dan catat setoran manual nasabah.</p>
        </div>

        {/* Sub tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('prices')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'prices'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Pengaturan Harga Beli (/kg)
          </button>
          <button
            onClick={() => setActiveTab('add_deposit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'add_deposit'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            + Catat Setoran Loket
          </button>
          <button
            onClick={() => setActiveTab('all_tx')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'all_tx'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Semua Transaksi ({transactions.length})
          </button>
        </div>
      </div>

      {/* TAB 1: EDIT PRICES PER KG */}
      {activeTab === 'prices' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Daftar Kategori & Harga Beli Mitra
            </h3>
            <span className="text-[10px] text-emerald-700 font-bold">Terupdate Sesuai Pasar Daur Ulang</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {wastePrices.map(item => (
              <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-200">
                      {item.category}
                    </span>
                    <span className="font-bold text-slate-800 text-sm">{item.subCategory}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                </div>

                {editingPriceId === item.id ? (
                  <div className="flex items-center gap-2 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold block">Harga / kg (Rp):</span>
                      <input
                        type="number"
                        value={editPriceVal}
                        onChange={e => setEditPriceVal(parseInt(e.target.value) || 0)}
                        className="w-24 text-xs font-bold p-1 bg-white border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold block">Poin / kg:</span>
                      <input
                        type="number"
                        value={editPointVal}
                        onChange={e => setEditPointVal(parseInt(e.target.value) || 0)}
                        className="w-16 text-xs font-bold p-1 bg-white border border-slate-300 rounded"
                      />
                    </div>
                    <button
                      onClick={() => handleSavePriceEdit(item.id)}
                      className="bg-emerald-700 text-white font-bold p-2 rounded-lg hover:bg-emerald-800 ml-1"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="text-left sm:text-right">
                      <span className="font-extrabold text-emerald-700 text-sm block">
                        Rp {item.pricePerUnit.toLocaleString('id-ID')} / {item.unit}
                      </span>
                      <span className="text-[10px] text-amber-600 font-bold">+{item.pointPerUnit} Poin / kg</span>
                    </div>

                    <button
                      onClick={() => {
                        setEditingPriceId(item.id);
                        setEditPriceVal(item.pricePerUnit);
                        setEditPointVal(item.pointPerUnit);
                      }}
                      className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit Harga"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MANUAL DEPOSIT FORM */}
      {activeTab === 'add_deposit' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 max-w-xl mx-auto shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100">
            Form Catat Setoran Sampah Loket Mitra
          </h3>

          {isDepositSuccess ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 text-emerald-900 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-bold">Setoran Sampah Berhasil Dicatat!</p>
              <p>Saldo dan poin telah dikreditkan otomatis ke akun nasabah.</p>
            </div>
          ) : (
            <form onSubmit={handleCreateDeposit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Nasabah Penyetor</label>
                <input
                  type="text"
                  required
                  value={depositNasabahName}
                  onChange={e => setDepositNasabahName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategori Sampah</label>
                <select
                  value={depositCategory}
                  onChange={e => setDepositCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                >
                  {wastePrices.map(p => (
                    <option key={p.id} value={p.id}>
                      [{p.category}] {p.subCategory} - Rp {p.pricePerUnit.toLocaleString('id-ID')}/kg
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Berat Hasil Timbang (kg)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={depositWeightKg}
                    onChange={e => setDepositWeightKg(parseFloat(e.target.value) || 1)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Tabungan (Rp)</label>
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl font-extrabold text-emerald-800 text-sm">
                    Rp {calculatedTotalRp.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Loket</label>
                <input
                  type="text"
                  value={depositNotes}
                  onChange={e => setDepositNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs"
                >
                  Simpan Transaksi & Cetak
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 3: ALL TRANSACTIONS */}
      {activeTab === 'all_tx' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider">Semua Catatan Transaksi Mitra</span>
            <span className="text-slate-500">{transactions.length} Entri</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {transactions.map(tx => (
              <div key={tx.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{tx.code}</span>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      {tx.type}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium mt-0.5">
                    Nasabah: <strong>{tx.nasabahName}</strong> • {tx.date}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-sm font-extrabold text-emerald-700 block">
                    Rp {tx.totalRp.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold">
                    +{tx.pointsEarned} Poin ({tx.totalWeightKg} kg)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
