import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  Plus,
  Calculator,
  CheckCircle2,
  AlertCircle,
  Truck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RequestPickupModal: React.FC = () => {
  const {
    isPickupModalOpen,
    setIsPickupModalOpen,
    mitraList,
    wastePrices,
    addPickupRequest,
    nasabah,
    setActiveNavTab
  } = useApp();

  const [selectedMitraId, setSelectedMitraId] = useState(mitraList[0]?.id || '');
  const [pickupDate, setPickupDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  });
  const [timeSlot, setTimeSlot] = useState('09:00 - 11:00 WIB');
  const [address, setAddress] = useState(nasabah.address);
  const [phone, setPhone] = useState(nasabah.phone);
  const [notes, setNotes] = useState('');

  // Selected items array
  const [items, setItems] = useState<Array<{ categoryId: string; categoryName: string; estimatedKg: number }>>([
    { categoryId: wastePrices[0]?.id || 'p1', categoryName: wastePrices[0]?.subCategory || 'Botol Plastik PET', estimatedKg: 10 }
  ]);

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdReqCode, setCreatedReqCode] = useState('');

  if (!isPickupModalOpen) return null;

  const selectedMitra = mitraList.find(m => m.id === selectedMitraId) || mitraList[0];

  const handleAddItem = () => {
    const nextItem = wastePrices.find(p => !items.some(i => i.categoryId === p.id)) || wastePrices[0];
    if (nextItem) {
      setItems(prev => [
        ...prev,
        { categoryId: nextItem.id, categoryName: nextItem.subCategory, estimatedKg: 5 }
      ]);
    }
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleItemCategoryChange = (index: number, categoryId: string) => {
    const priceObj = wastePrices.find(p => p.id === categoryId);
    if (!priceObj) return;

    setItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, categoryId, categoryName: priceObj.subCategory } : item
      )
    );
  };

  const handleItemKgChange = (index: number, kg: number) => {
    setItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, estimatedKg: Math.max(1, kg) } : item))
    );
  };

  // Calculations
  const totalEstimatedKg = items.reduce((acc, curr) => acc + curr.estimatedKg, 0);

  const totalEstimatedRp = items.reduce((acc, item) => {
    const priceObj = wastePrices.find(p => p.id === item.categoryId);
    return acc + (priceObj ? priceObj.pricePerUnit * item.estimatedKg : 0);
  }, 0);

  const totalEstimatedPoints = Math.floor(totalEstimatedRp / 500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReq = addPickupRequest({
      nasabahId: nasabah.id,
      nasabahName: nasabah.name,
      nasabahPhone: phone,
      mitraId: selectedMitra.id,
      mitraName: selectedMitra.name,
      address,
      pickupDate,
      timeSlot,
      items,
      notes
    });

    setCreatedReqCode(newReq.code);
    setIsSuccess(true);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-16 pb-12 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative border border-slate-100 my-auto sm:my-0 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => {
            setIsPickupModalOpen(false);
            setIsSuccess(false);
          }}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer border border-slate-200 z-20"
          title="Tutup Modal"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Permintaan Penjemputan Terkirim!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Jadwal Anda dengan kode <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{createdReqCode}</span> telah berhasil dibuat dan dikirim ke <span className="font-semibold text-slate-800">{selectedMitra.name}</span>.
            </p>

            <div className="bg-slate-50 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal & Jam:</span>
                <span className="font-semibold text-slate-800">{pickupDate} ({timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimasi Berat:</span>
                <span className="font-semibold text-slate-800">{totalEstimatedKg} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimasi Tabungan:</span>
                <span className="font-bold text-emerald-700">Rp {totalEstimatedRp.toLocaleString('id-ID')} (+{totalEstimatedPoints} Poin)</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setIsPickupModalOpen(false);
                  setIsSuccess(false);
                  setActiveNavTab('portal_nasabah');
                }}
                className="bg-emerald-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Lihat di Status Penjemputan
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Form Request Penjemputan Sampah</h3>
                <p className="text-xs text-slate-500">Tim kurir mitra bank sampah akan menjemput sampah terpisah di alamat Anda.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Select Partner Waste Bank */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Mitra Bank Sampah</label>
                <select
                  value={selectedMitraId}
                  onChange={e => setSelectedMitraId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                >
                  {mitraList.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.city}) - Rating {m.rating} ★
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" /> {selectedMitra.address}, {selectedMitra.city}
                </p>
              </div>

              {/* Items list with estimations */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">Estimasi Kategori & Berat Sampah</label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-emerald-700 hover:text-emerald-800 text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Kategori
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto p-1">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <select
                        value={item.categoryId}
                        onChange={e => handleItemCategoryChange(idx, e.target.value)}
                        className="flex-1 text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                      >
                        {wastePrices.map(p => (
                          <option key={p.id} value={p.id}>
                            [{p.category}] {p.subCategory} - Rp {p.pricePerUnit.toLocaleString('id-ID')}/kg
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center gap-1 w-28">
                        <input
                          type="number"
                          min="1"
                          max="200"
                          value={item.estimatedKg}
                          onChange={e => handleItemKgChange(idx, parseFloat(e.target.value) || 1)}
                          className="w-16 text-xs p-2 bg-white border border-slate-200 rounded-lg text-center font-bold text-slate-800"
                        />
                        <span className="text-xs font-semibold text-slate-500">kg</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        disabled={items.length <= 1}
                        className="text-slate-400 hover:text-rose-600 disabled:opacity-30 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Estimation Summary Box */}
              <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-xl p-3.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-[10px] text-emerald-200 uppercase tracking-wider block font-semibold">Estimasi Hasil Tabungan</span>
                    <span className="text-xs font-bold text-white">{totalEstimatedKg} kg Sampah Terpilah</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-amber-300">
                    Rp {totalEstimatedRp.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-emerald-200 block">+ {totalEstimatedPoints} Poin Reward</span>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Tanggal Penjemputan
                  </label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={e => setPickupDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" /> Sesi Waktu (Slot)
                  </label>
                  <select
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                  >
                    <option value="09:00 - 11:00 WIB">Pagi (09:00 - 11:00 WIB)</option>
                    <option value="11:00 - 13:00 WIB">Siang (11:00 - 13:00 WIB)</option>
                    <option value="13:00 - 15:00 WIB">Sore (13:00 - 15:00 WIB)</option>
                    <option value="15:00 - 17:00 WIB">Sore Akhir (15:00 - 17:00 WIB)</option>
                  </select>
                </div>
              </div>

              {/* Address & Phone */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap Penjemputan</label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Contoh: Jl. Melati No. 42, RT 02/RW 05..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp Aktif</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Patokan Lokasi</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Misal: Pagar hitam, dekat pos satpam"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPickupModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 flex items-center transition-all"
                >
                  Kirim Request Penjemputan
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
