import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PickupRequest, PickupStatus } from '../../types';
import {
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  UserCheck,
  Phone,
  Calendar,
  AlertCircle,
  Check,
  ChevronDown
} from 'lucide-react';

export const PickupManagement: React.FC = () => {
  const { pickupRequests, updatePickupStatus, activeMitraAdmin } = useApp();

  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('Semua');
  const [activeModalReq, setActiveModalReq] = useState<PickupRequest | null>(null);

  // Driver assign modal states
  const [driverNameInput, setDriverNameInput] = useState('Pak Supri (Kurir Penjemputan)');
  const [driverPhoneInput, setDriverPhoneInput] = useState('0852-1100-2233');

  // Complete pickup modal states
  const [finalKgInput, setFinalKgInput] = useState<number>(20);
  const [finalRpInput, setFinalRpInput] = useState<number>(105000);

  const mitraRequests = pickupRequests.filter(req => req.mitraId === activeMitraAdmin.id);

  const filteredRequests = mitraRequests.filter(req => {
    if (selectedStatusFilter === 'Semua') return true;
    return req.status === selectedStatusFilter;
  });

  const handleApprove = (req: PickupRequest) => {
    updatePickupStatus(req.id, 'Disetujui', {
      driverName: driverNameInput,
      driverPhone: driverPhoneInput
    });
    setActiveModalReq(null);
  };

  const handleComplete = (req: PickupRequest) => {
    const calculatedPoints = Math.floor(finalRpInput / 500);
    updatePickupStatus(req.id, 'Selesai', {
      finalWeightKg: finalKgInput,
      finalAmountRp: finalRpInput,
      finalPoints: calculatedPoints
    });
    setActiveModalReq(null);
  };

  const handleCancel = (req: PickupRequest) => {
    updatePickupStatus(req.id, 'Dibatalkan');
    setActiveModalReq(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Manajemen Jadwal Penjemputan</h2>
          <p className="text-xs text-slate-500">Kelola konfirmasi, penugasan kurir, dan penyelesaian penjemputan nasabah.</p>
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['Semua', 'Menunggu Konfirmasi', 'Disetujui', 'Selesai', 'Dibatalkan'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedStatusFilter === st
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
          Tidak ada antrean penjemputan dengan filter status ini.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map(req => (
            <div
              key={req.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4 hover:border-emerald-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-xs text-slate-900">{req.code}</span>
                    <span className="text-[10px] text-slate-400">Dibuat: {req.createdAt}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mt-0.5">
                    Nasabah: {req.nasabahName} ({req.nasabahPhone})
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full border bg-slate-50 border-slate-200 text-slate-700">
                    Status: {req.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-600">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Jadwal Penjemputan</span>
                  <span className="font-bold text-slate-800">{req.pickupDate} ({req.timeSlot})</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Alamat Penjemputan</span>
                  <span className="font-semibold text-slate-800 line-clamp-1">{req.address}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Catatan Nasabah</span>
                  <span className="font-medium text-slate-700">{req.notes || 'Tidak ada catatan'}</span>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                  Item Kategori & Estimasi Berat:
                </span>
                <div className="flex flex-wrap gap-2">
                  {req.items.map((item, idx) => (
                    <span key={idx} className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-semibold">
                      {item.categoryName}: <strong className="text-emerald-700">{item.estimatedKg} kg</strong>
                    </span>
                  ))}
                </div>
              </div>

              {/* Driver and action controls */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  {req.driverName ? (
                    <span className="font-semibold text-emerald-800">
                      Kurir Bertugas: {req.driverName} ({req.driverPhone})
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium">Belum ada kurir ditugaskan.</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {req.status === 'Menunggu Konfirmasi' && (
                    <>
                      <button
                        onClick={() => {
                          setActiveModalReq(req);
                          setDriverNameInput('Pak Supri (Kurir Penjemputan)');
                          setDriverPhoneInput('0852-1100-2233');
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-2xs"
                      >
                        Setujui & Assign Kurir
                      </button>

                      <button
                        onClick={() => handleCancel(req)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-3 py-2 rounded-xl border border-rose-200"
                      >
                        Tolak
                      </button>
                    </>
                  )}

                  {req.status === 'Disetujui' && (
                    <button
                      onClick={() => {
                        setActiveModalReq(req);
                        const estKg = req.items.reduce((a, b) => a + b.estimatedKg, 0);
                        setFinalKgInput(estKg);
                        setFinalRpInput(estKg * 4200);
                      }}
                      className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-2xs"
                    >
                      Selesaikan Penjemputan (Timbang & Catat)
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Modal for Assigning / Completing */}
      {activeModalReq && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-100 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-800">
              {activeModalReq.status === 'Menunggu Konfirmasi' ? 'Tugaskan Kurir Penjemputan' : 'Selesaikan Penjemputan'}
            </h3>

            {activeModalReq.status === 'Menunggu Konfirmasi' ? (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Kurir / Petugas</label>
                  <input
                    type="text"
                    value={driverNameInput}
                    onChange={e => setDriverNameInput(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp Kurir</label>
                  <input
                    type="text"
                    value={driverPhoneInput}
                    onChange={e => setDriverPhoneInput(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveModalReq(null)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-semibold rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleApprove(activeModalReq)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl shadow-2xs"
                  >
                    Konfirmasi Assign
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hasil Timbang Riil Total (kg)</label>
                  <input
                    type="number"
                    value={finalKgInput}
                    onChange={e => setFinalKgInput(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Saldo Tabungan Disetorkan (Rp)</label>
                  <input
                    type="number"
                    value={finalRpInput}
                    onChange={e => setFinalRpInput(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-700"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveModalReq(null)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-semibold rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleComplete(activeModalReq)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl shadow-2xs"
                  >
                    Simpan & Kredit Saldo Nasabah
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
