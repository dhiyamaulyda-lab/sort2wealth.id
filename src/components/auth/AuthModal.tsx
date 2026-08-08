import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Building2,
  Lock,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Recycle,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Nasabah } from '../../types';
import logoImg from '../../assets/images/from_waste_to_wealth_logo_1786154775483.jpg';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authInitialTab,
    authInitialMode,
    setUserRole,
    setActiveNavTab,
    nasabah,
    nasabahList,
    setActiveNasabahId,
    deleteNasabahAccount,
    updateNasabah,
    addNasabahAccount,
    loginAsNasabah,
    addMitraBank,
    setActiveMitraAdminId,
    mitraList
  } = useApp();

  const [activeTab, setActiveTab] = useState<'nasabah' | 'mitra'>('nasabah');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Nasabah Form state
  const [deletingNasabahId, setDeletingNasabahId] = useState<string | null>(null);
  const [nasabahName, setNasabahName] = useState('');
  const [nasabahEmail, setNasabahEmail] = useState('');
  const [nasabahPhone, setNasabahPhone] = useState('');
  const [nasabahAddress, setNasabahAddress] = useState('');
  const [nasabahPassword, setNasabahPassword] = useState('');
  const [nasabahConfirmPassword, setNasabahConfirmPassword] = useState('');

  // Mitra Form state
  const [mitraName, setMitraName] = useState('');
  const [mitraAdminName, setMitraAdminName] = useState('');
  const [mitraEmail, setMitraEmail] = useState('');
  const [mitraPhone, setMitraPhone] = useState('');
  const [mitraCity, setMitraCity] = useState('Jakarta Selatan');
  const [mitraDistrict, setMitraDistrict] = useState('');
  const [mitraAddress, setMitraAddress] = useState('');
  const [mitraOpenHours, setMitraOpenHours] = useState('08:00 - 16:00 WIB');
  const [mitraOpenDays, setMitraOpenDays] = useState('Senin - Sabtu');
  const [mitraTypes, setMitraTypes] = useState<Array<'Plastik' | 'Kertas' | 'Kaleng' | 'Organik' | 'Elektronik' | 'Kaca'>>([
    'Plastik',
    'Kertas',
    'Kaleng'
  ]);
  const [mitraPassword, setMitraPassword] = useState('');
  const [mitraConfirmPassword, setMitraConfirmPassword] = useState('');

  useEffect(() => {
    if (isAuthModalOpen) {
      setActiveTab(authInitialTab || 'nasabah');
      setMode(authInitialMode || 'login');
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  }, [isAuthModalOpen, authInitialTab, authInitialMode]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleTypeToggle = (type: 'Plastik' | 'Kertas' | 'Kaleng' | 'Organik' | 'Elektronik' | 'Kaca') => {
    if (mitraTypes.includes(type)) {
      if (mitraTypes.length === 1) return; // keep at least 1
      setMitraTypes(prev => prev.filter(t => t !== type));
    } else {
      setMitraTypes(prev => [...prev, type]);
    }
  };

  // Nasabah Login Submit
  const handleNasabahLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nasabahEmail || !nasabahPassword) {
      setErrorMessage('Harap isi Email/No. Handphone dan Kata Sandi.');
      return;
    }

    loginAsNasabah(nasabahEmail);

    setSuccessMessage(`Selamat datang kembali di From Waste To Wealth!`);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  // Nasabah Register Submit
  const handleNasabahRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nasabahName || !nasabahEmail || !nasabahPhone || !nasabahPassword) {
      setErrorMessage('Harap lengkapi semua data pendaftaran nasabah.');
      return;
    }

    if (nasabahPassword !== nasabahConfirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    // Save newly registered nasabah
    const createdNasabah = addNasabahAccount({
      name: nasabahName,
      email: nasabahEmail,
      phone: nasabahPhone,
      address: nasabahAddress || 'Jl. Pemuda No. 123, Jakarta'
    });

    setUserRole('nasabah');
    setActiveNavTab('portal_nasabah');

    setSuccessMessage(`Pendaftaran berhasil! Akun ${createdNasabah.name} telah aktif (+Bonus Rp 25.000 & 50 Poin).`);
    setTimeout(() => {
      handleClose();
    }, 1200);
  };

  // Mitra Login Submit
  const handleMitraLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mitraEmail || !mitraPassword) {
      setErrorMessage('Harap isi Email/Kode Mitra dan Kata Sandi.');
      return;
    }

    const defaultMitra = mitraList[0];
    if (defaultMitra) {
      setActiveMitraAdminId(defaultMitra.id);
    }

    setSuccessMessage(`Login Mitra Berhasil! Mengalihkan ke Dashboard Admin...`);
    setTimeout(() => {
      setUserRole('admin_mitra');
      setActiveNavTab('dashboard_mitra');
      handleClose();
    }, 1000);
  };

  // Mitra Register Submit
  const handleMitraRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mitraName || !mitraEmail || !mitraPhone || !mitraAddress || !mitraPassword) {
      setErrorMessage('Harap lengkapi data profil Bank Sampah Mitra Anda.');
      return;
    }

    if (mitraPassword !== mitraConfirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak sesuai.');
      return;
    }

    const createdMitra = addMitraBank({
      name: mitraName,
      address: mitraAddress,
      district: mitraDistrict || 'Kecamatan Pusat',
      city: mitraCity,
      phone: mitraPhone,
      whatsapp: mitraPhone,
      openHours: mitraOpenHours,
      openDays: mitraOpenDays,
      acceptedTypes: mitraTypes,
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80'
    });

    setSuccessMessage(`Selamat! ${createdMitra.name} berhasil terdaftar sebagai Mitra Resmi From Waste To Wealth.`);
    setTimeout(() => {
      setUserRole('admin_mitra');
      setActiveNavTab('dashboard_mitra');
      handleClose();
    }, 1200);
  };

  // Quick Demo Logins
  const loginDemoNasabah = (accountToUse?: Nasabah) => {
    const targetNasabah = accountToUse || nasabah;
    setActiveNasabahId(targetNasabah.id);
    setSuccessMessage(`Masuk sebagai ${targetNasabah.name}...`);
    setTimeout(() => {
      setUserRole('nasabah');
      setActiveNavTab('portal_nasabah');
      handleClose();
    }, 600);
  };

  const loginDemoMitra = () => {
    if (mitraList.length > 0) {
      setActiveMitraAdminId(mitraList[0].id);
    }
    setSuccessMessage(`Masuk sebagai Demo Mitra (${mitraList[0]?.name || 'Bank Sampah Peduli Bumi'})...`);
    setTimeout(() => {
      setUserRole('admin_mitra');
      setActiveNavTab('dashboard_mitra');
      handleClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-16 pb-12 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden relative my-auto sm:my-0">
        {/* Header Header Bar */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all cursor-pointer border border-white/15 shadow-sm active:scale-95 z-20"
            title="Tutup Modal"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white p-0.5 shadow-xs overflow-hidden shrink-0 flex items-center justify-center">
              <img src={logoImg} alt="From Waste To Wealth Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-300">
              Portal Akses From Waste To Wealth
            </span>
          </div>

          <h2 className="text-xl font-black tracking-tight text-white">
            {mode === 'login' ? 'Masuk ke Akun Anda' : 'Pendaftaran Akun Baru'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {mode === 'login'
              ? 'Akses portal nasabah atau dashboard manajemen bank sampah mitra.'
              : 'Bergabunglah dalam gerakan daur ulang cerdas & nikmati manfaat ekonomi.'}
          </p>

          {/* User Type Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
            <button
              onClick={() => {
                setActiveTab('nasabah');
                setErrorMessage(null);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'nasabah'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>Nasabah / Warga</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('mitra');
                setErrorMessage(null);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'mitra'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Mitra Bank Sampah</span>
            </button>
          </div>
        </div>

        {/* Mode Switcher Bar (Masuk / Daftar) */}
        <div className="flex items-center border-b border-slate-100 bg-slate-50 px-6 py-2.5 justify-between">
          <div className="flex gap-4 text-xs font-bold">
            <button
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
              }}
              className={`pb-1 transition-all ${
                mode === 'login'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Masuk (Login)
            </button>
            <button
              onClick={() => {
                setMode('register');
                setErrorMessage(null);
              }}
              className={`pb-1 transition-all ${
                mode === 'register'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Daftar Akun Baru
            </button>
          </div>

          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Role: {activeTab === 'nasabah' ? 'Nasabah' : 'Admin Mitra'}
          </span>
        </div>

        {/* Modal Body / Form Area */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Notifications / Alerts */}
          {successMessage && (
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ==================== 1. NASABAH LOGIN ==================== */}
          {activeTab === 'nasabah' && mode === 'login' && (
            <form onSubmit={handleNasabahLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Lengkap, Email, atau No. HP
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={nasabahEmail}
                    onChange={e => setNasabahEmail(e.target.value)}
                    placeholder="Contoh: Budi Santoso / budi@gmail.com / 08123456789"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Ketik nama atau email Anda di sini untuk langsung masuk.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">Kata Sandi</label>
                  <button type="button" className="text-[11px] text-emerald-600 hover:underline">
                    Lupa sandi?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={nasabahPassword}
                    onChange={e => setNasabahPassword(e.target.value)}
                    placeholder="Masukkan kata sandi akun nasabah"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative px-3 bg-white text-[11px] font-semibold text-slate-400">
                  AKUN TERDAFTAR SEBELUMNYA
                </span>
              </div>

              <div className="space-y-1.5">
                {nasabahList.map(nItem => (
                  <div
                    key={nItem.id}
                    className="group w-full py-2 px-3 bg-slate-50 hover:bg-emerald-50/70 hover:border-emerald-300 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-between gap-2"
                  >
                    {deletingNasabahId === nItem.id ? (
                      <div className="flex items-center justify-between w-full py-0.5">
                        <span className="text-[11px] font-bold text-rose-600 truncate">
                          Hapus akun {nItem.name}?
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNasabahAccount(nItem.id);
                              setDeletingNasabahId(null);
                            }}
                            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            Ya, Hapus
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletingNasabahId(null);
                            }}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[10px] px-2 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => loginDemoNasabah(nItem)}
                          className="flex items-center gap-2 flex-1 text-left cursor-pointer min-w-0"
                        >
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                            {nItem.name[0]}
                          </div>
                          <div className="truncate">
                            <span className="font-bold text-slate-800 block truncate">{nItem.name}</span>
                            <span className="text-[10px] text-slate-400 block truncate">{nItem.email || nItem.phone}</span>
                          </div>
                        </button>
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setDeletingNasabahId(nItem.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                          title="Hapus Akun Ini"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500 hover:text-rose-700" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-slate-500 pt-2">
                Belum punya akun nasabah?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Daftar gratis di sini
                </button>
              </p>
            </form>
          )}

          {/* ==================== 2. NASABAH REGISTER ==================== */}
          {activeTab === 'nasabah' && mode === 'register' && (
            <form onSubmit={handleNasabahRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={nasabahName}
                    onChange={e => setNasabahName(e.target.value)}
                    placeholder="Contoh: Rina Wijaya"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={nasabahEmail}
                      onChange={e => setNasabahEmail(e.target.value)}
                      placeholder="rina@gmail.com"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">No. WhatsApp / HP</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={nasabahPhone}
                      onChange={e => setNasabahPhone(e.target.value)}
                      placeholder="081234567890"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap Rumah</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={nasabahAddress}
                    onChange={e => setNasabahAddress(e.target.value)}
                    placeholder="Jl. Merdeka No. 45, RT 02/05, Kelurahan Mawar"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={nasabahPassword}
                    onChange={e => setNasabahPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Konfirmasi Sandi</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={nasabahConfirmPassword}
                    onChange={e => setNasabahConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Daftar Akun Nasabah Sekarang</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <p className="text-center text-xs text-slate-500 pt-1">
                Sudah memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Masuk di sini
                </button>
              </p>
            </form>
          )}

          {/* ==================== 3. MITRA LOGIN ==================== */}
          {activeTab === 'mitra' && mode === 'login' && (
            <form onSubmit={handleMitraLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Operasional / ID Mitra Bank Sampah
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={mitraEmail}
                    onChange={e => setMitraEmail(e.target.value)}
                    placeholder="Contoh: admin@banksampah.org / MITRA-01"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">Kata Sandi Admin Mitra</label>
                  <button type="button" className="text-[11px] text-emerald-600 hover:underline">
                    Bantuan Akses?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={mitraPassword}
                    onChange={e => setMitraPassword(e.target.value)}
                    placeholder="Masukkan sandi portal mitra"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Masuk Dashboard Mitra Admin</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative px-3 bg-white text-[11px] font-semibold text-slate-400">
                  AKSES DEMO INSTAN
                </span>
              </div>

              <button
                type="button"
                onClick={loginDemoMitra}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Masuk Cepat Demo Mitra ({mitraList[0]?.name || 'Bank Sampah Peduli Bumi'})</span>
              </button>

              <p className="text-center text-xs text-slate-500 pt-2">
                Ingin mendaftarkan Bank Sampah baru?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Daftarkan unit usaha Anda di sini
                </button>
              </p>
            </form>
          )}

          {/* ==================== 4. MITRA REGISTER ==================== */}
          {activeTab === 'mitra' && mode === 'register' && (
            <form onSubmit={handleMitraRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Bank Sampah / Instansi Unit
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={mitraName}
                    onChange={e => setMitraName(e.target.value)}
                    placeholder="Contoh: Bank Sampah Berkah Mandiri"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Pengelola / PJ</label>
                  <input
                    type="text"
                    value={mitraAdminName}
                    onChange={e => setMitraAdminName(e.target.value)}
                    placeholder="Bapak/Ibu Ketua"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">No. WhatsApp Operasional</label>
                  <input
                    type="tel"
                    value={mitraPhone}
                    onChange={e => setMitraPhone(e.target.value)}
                    placeholder="085778013586"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={mitraEmail}
                    onChange={e => setMitraEmail(e.target.value)}
                    placeholder="admin@banksampah.org"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kota / Wilayah</label>
                  <select
                    value={mitraCity}
                    onChange={e => setMitraCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  >
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Surabaya">Surabaya</option>
                    <option value="Sleman / Yogyakarta">Sleman / Yogyakarta</option>
                    <option value="Kebumen / Gombong">Kebumen / Gombong</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Operasional Bank Sampah</label>
                <input
                  type="text"
                  value={mitraAddress}
                  onChange={e => setMitraAddress(e.target.value)}
                  placeholder="Jl. Raya Utama No. 88, Kebumen"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Multi-select Category Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Jenis Sampah yang Diterima
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Plastik', 'Kertas', 'Kaleng', 'Organik', 'Elektronik', 'Kaca'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleTypeToggle(type)}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1 ${
                        mitraTypes.includes(type)
                          ? 'bg-emerald-500 text-slate-950 border-emerald-600 font-bold shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={mitraPassword}
                    onChange={e => setMitraPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Konfirmasi Sandi</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={mitraConfirmPassword}
                    onChange={e => setMitraConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Daftarkan Mitra Bank Sampah</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <p className="text-center text-xs text-slate-500 pt-1">
                Sudah memiliki akun mitra?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Masuk di sini
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Sistem Keamanan Data Terenkripsi
          </span>
          <span>From Waste To Wealth v2.4</span>
        </div>
      </div>
    </div>
  );
};
