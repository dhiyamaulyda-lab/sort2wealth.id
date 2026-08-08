import React from 'react';
import { Transaction } from '../../types';
import { X, Printer, CheckCircle2, QrCode, Recycle, Download, Share2 } from 'lucide-react';

interface Props {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionReceiptModal: React.FC<Props> = ({ transaction, onClose }) => {
  if (!transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-16 pb-12 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-slate-100 my-auto sm:my-0 animate-in fade-in zoom-in-95 duration-200 print:shadow-none print:border-none print:m-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer border border-slate-200 z-20 print:hidden"
          title="Tutup Modal"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Receipt */}
        <div className="text-center pb-4 border-b border-dashed border-slate-300">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <Recycle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight">From Waste To Wealth</h3>
          <p className="text-xs text-slate-500 font-medium">{transaction.mitraName}</p>
          <div className="mt-2 inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> RESI SETORAN VALID
          </div>
        </div>

        {/* Transaction Meta */}
        <div className="py-4 space-y-2 text-xs border-b border-dashed border-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-500">Kode Transaksi:</span>
            <span className="font-mono font-bold text-slate-800">{transaction.code}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tanggal & Waktu:</span>
            <span className="font-semibold text-slate-700">{transaction.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Nama Nasabah:</span>
            <span className="font-semibold text-slate-800">{transaction.nasabahName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tipe Layanan:</span>
            <span className="font-bold text-emerald-700">{transaction.type}</span>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-4 border-b border-dashed border-slate-300">
          <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Rincian Sampah Disetor</h4>
          <div className="space-y-2 text-xs">
            {transaction.details.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-700">
                <div>
                  <p className="font-semibold">{item.categoryName}</p>
                  <p className="text-[10px] text-slate-400">
                    {item.weightKg} kg × Rp {item.pricePerKg.toLocaleString('id-ID')}
                  </p>
                </div>
                <span className="font-bold text-slate-900">
                  Rp {item.subtotalRp.toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Points */}
        <div className="py-4 space-y-2 text-xs border-b border-slate-200">
          <div className="flex justify-between text-slate-600">
            <span>Total Berat Sampah:</span>
            <span className="font-bold text-slate-800">{transaction.totalWeightKg} kg</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Poin Reward Diperoleh:</span>
            <span className="font-bold text-amber-600">+{transaction.pointsEarned} Poin</span>
          </div>
          <div className="flex justify-between items-center text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
            <span>Total Nilai Tabungan:</span>
            <span className="text-base text-emerald-700">
              Rp {transaction.totalRp.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Simulated QR Code Verification */}
        <div className="py-4 text-center bg-slate-50 rounded-xl mt-3 flex items-center justify-center gap-3">
          <div className="w-14 h-14 bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
            <QrCode className="w-12 h-12 text-slate-800" />
          </div>
          <div className="text-left text-[10px] text-slate-500">
            <p className="font-bold text-slate-700">Verifikasi Resi Digital</p>
            <p>Pindai untuk memverifikasi autentisitas catatan pada sistem From Waste To Wealth.</p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-5 flex items-center justify-between gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" /> Cetak Resi
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
