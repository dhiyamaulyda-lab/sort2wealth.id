import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/images/from_waste_to_wealth_logo_1786154775483.jpg';
import {
  Recycle,
  MapPin,
  BookOpen,
  UserCheck,
  Building2,
  Bell,
  CheckCircle2,
  Calendar,
  Wallet,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  LogIn
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    userRole,
    setUserRole,
    logout,
    activeNavTab,
    setActiveNavTab,
    nasabah,
    activeMitraAdmin,
    notifications,
    markNotificationAsRead,
    setIsPickupModalOpen,
    openAuthModal
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  const handleRoleToggle = (newRole: 'public' | 'nasabah' | 'admin_mitra') => {
    if (newRole === 'nasabah') {
      setUserRole('nasabah');
      setActiveNavTab('portal_nasabah');
    } else if (newRole === 'admin_mitra') {
      setUserRole('admin_mitra');
      setActiveNavTab('dashboard_mitra');
    } else {
      setUserRole('public');
      setActiveNavTab('beranda');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner Competition Badge */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center">
        <span>Platform Inovasi Digital Bank Sampah Terpadu</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => {
              setActiveNavTab('beranda');
              if (userRole === 'admin_mitra') setUserRole('public');
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-white border border-emerald-200 p-0.5 shadow-xs overflow-hidden group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center">
              <img src={logoImg} alt="From Waste To Wealth Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-emerald-950 leading-none">
                FROM WASTE TO WEALTH
              </span>
              <span className="text-[9px] font-bold text-emerald-700 tracking-wider uppercase mt-0.5">
                Smart Waste Management
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <button
              onClick={() => {
                setActiveNavTab('beranda');
                if (userRole === 'admin_mitra') setUserRole('public');
              }}
              className={`py-2 transition-colors ${
                activeNavTab === 'beranda' && userRole !== 'admin_mitra'
                  ? 'text-emerald-600 font-black border-b-2 border-emerald-600'
                  : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              Beranda
            </button>

            <button
              onClick={() => {
                setActiveNavTab('edukasi');
                if (userRole === 'admin_mitra') setUserRole('public');
              }}
              className={`py-2 transition-colors flex items-center gap-1.5 ${
                activeNavTab === 'edukasi'
                  ? 'text-emerald-600 font-black border-b-2 border-emerald-600'
                  : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              Edukasi & Quiz
            </button>

            <button
              onClick={() => {
                setActiveNavTab('lokasi');
                if (userRole === 'admin_mitra') setUserRole('public');
              }}
              className={`py-2 transition-colors flex items-center gap-1.5 ${
                activeNavTab === 'lokasi'
                  ? 'text-emerald-600 font-black border-b-2 border-emerald-600'
                  : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Mitra Kami
            </button>

            <button
              onClick={() => handleRoleToggle('nasabah')}
              className={`py-2 transition-colors flex items-center gap-1.5 ${
                activeNavTab === 'portal_nasabah' || userRole === 'nasabah'
                  ? 'text-emerald-600 font-black border-b-2 border-emerald-600'
                  : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              Profil Nasabah
            </button>
          </nav>

          {/* Right Area: Pickup Action, Notification, Role Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Request Pickup Button for Nasabah */}
            <button
              onClick={() => {
                setUserRole('nasabah');
                setIsPickupModalOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs tracking-wider uppercase px-4 py-2 rounded-full shadow-xs flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Jemput Sampah</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Bell className="w-3.5 h-3.5 text-emerald-600" /> Notifikasi
                    </h4>
                    <span className="text-[10px] text-slate-500">{notifications.length} Pesan</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">Belum ada notifikasi.</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                            n.isRead ? 'bg-slate-50 text-slate-600' : 'bg-emerald-50/70 border-l-2 border-emerald-500 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between font-semibold mb-0.5">
                            <span>{n.title}</span>
                            <span className="text-[9px] text-slate-400 font-normal">{n.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Session / Authentication Controls */}
            {userRole === 'public' ? (
              <button
                onClick={() => openAuthModal('nasabah', 'login')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                <span>Masuk / Daftar</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/80 px-3 py-1.5 rounded-xl text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                  {userRole === 'nasabah' ? (nasabah.name?.[0] || 'N') : (activeMitraAdmin.name?.[0] || 'M')}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-slate-800 leading-tight truncate max-w-[110px]">
                    {userRole === 'nasabah' ? nasabah.name : activeMitraAdmin.name}
                  </span>
                  <span className="text-[9px] text-emerald-700 font-semibold uppercase">
                    {userRole === 'nasabah' ? 'Nasabah' : 'Admin Mitra'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="ml-1 text-[10px] font-bold text-slate-500 hover:text-rose-600 px-2 py-1 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition-colors cursor-pointer"
                  title="Keluar dari Akun"
                >
                  Keluar
                </button>
              </div>
            )}

            {/* Role Navigation Switcher */}
            <div className="p-1 bg-slate-100 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                onClick={() => handleRoleToggle('nasabah')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  userRole === 'nasabah'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Portal Nasabah</span>
              </button>

              <button
                onClick={() => handleRoleToggle('admin_mitra')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  userRole === 'admin_mitra'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Dashboard Mitra</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-600 rounded-lg"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] rounded-full flex items-center justify-center">
                  {unreadNotifsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setActiveNavTab('beranda');
                setUserRole('public');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50"
            >
              Beranda
            </button>

            <button
              onClick={() => {
                setActiveNavTab('edukasi');
                setUserRole('public');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50"
            >
              Edukasi & Quiz
            </button>

            <button
              onClick={() => {
                setActiveNavTab('lokasi');
                setUserRole('public');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50"
            >
              Lokasi Mitra
            </button>

            <button
              onClick={() => handleRoleToggle('nasabah')}
              className="text-left py-2 px-3 rounded-lg text-sm font-medium text-emerald-700 font-semibold hover:bg-emerald-50"
            >
              Profil Nasabah
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openAuthModal('nasabah', 'login');
              }}
              className="mt-2 text-center py-2.5 px-3 rounded-xl text-xs font-extrabold text-white bg-slate-900 hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-emerald-400" />
              <span>Masuk / Daftar Akun Baru</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pilih Tampilan Demo:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleRoleToggle('nasabah')}
                className={`p-2.5 rounded-lg text-xs font-semibold text-center border ${
                  userRole === 'nasabah'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                Mode Nasabah
              </button>
              <button
                onClick={() => handleRoleToggle('admin_mitra')}
                className={`p-2.5 rounded-lg text-xs font-semibold text-center border ${
                  userRole === 'admin_mitra'
                    ? 'bg-emerald-800 border-emerald-800 text-white'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                Dashboard Mitra Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
