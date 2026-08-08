import React, { useState } from 'react';
import { EcoReward } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Wallet, Zap, ShoppingBag, Smartphone, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  reward: EcoReward | null;
  onClose: () => void;
}

export const RewardRedemptionModal: React.FC<Props> = ({ reward, onClose }) => {
  const { nasabah, redeemReward } = useApp();
  const [targetNumber, setTargetNumber] = useState(nasabah.phone);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!reward) return null;

  const getIcon = (category: string) => {
    switch (category) {
      case 'E-Wallet':
        return <Wallet className="w-6 h-6 text-emerald-600" />;
      case 'Token PLN':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'Voucher Sembako':
        return <ShoppingBag className="w-6 h-6 text-teal-600" />;
      default:
        return <Smartphone className="w-6 h-6 text-indigo-600" />;
    }
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!targetNumber.trim()) {
      setErrorMessage('Masukkan nomor HP atau ID Tujuan yang valid.');
      return;
    }

    const success = redeemReward(reward, targetNumber);
    if (success) {
      setIsSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setErrorMessage(`Poin Anda (${nasabah.rewardPoints} Poin) kurang dari syarat ${reward.pointsRequired} Poin.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-16 pb-12 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-slate-100 my-auto sm:my-0 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer border border-slate-200 z-20"
          title="Tutup Modal"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-800">Tukar Poin Berhasil!</h3>
            <p className="text-xs text-slate-600">
              <span className="font-bold text-slate-800">{reward.title}</span> sebesar <span className="font-bold text-emerald-700">Rp {reward.valueRp.toLocaleString('id-ID')}</span> diproses ke nomor <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{targetNumber}</span>.
            </p>

            <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-500 border border-slate-200">
              Sisa Poin Reward Anda sekarang: <span className="font-bold text-amber-600">{nasabah.rewardPoints} Poin</span>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
            >
              Selesai & Kembali
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                {getIcon(reward.category)}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {reward.category}
                </span>
                <h3 className="text-base font-bold text-slate-800">{reward.title}</h3>
                <p className="text-xs text-amber-600 font-semibold">{reward.pointsRequired} Poin Reward</p>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleRedeem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor HP / ID Akun Tujuan ({reward.category})
                </label>
                <input
                  type="text"
                  required
                  value={targetNumber}
                  onChange={e => setTargetNumber(e.target.value)}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
                />
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/60 p-3 rounded-xl text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Poin Anda Saat Ini:</span>
                  <span className="font-bold text-slate-800">{nasabah.rewardPoints} Poin</span>
                </div>
                <div className="flex justify-between">
                  <span>Poin Dibutuhkan:</span>
                  <span className="font-bold text-amber-600">-{reward.pointsRequired} Poin</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={nasabah.rewardPoints < reward.pointsRequired}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" /> Konfirmasi Penukaran
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
