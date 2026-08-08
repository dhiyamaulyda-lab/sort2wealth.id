import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/public/LandingPage';
import { EdukasiPage } from './components/public/EdukasiPage';
import { LokasiMitraPage } from './components/public/LokasiMitraPage';
import { NasabahPortal } from './components/nasabah/NasabahPortal';
import { MitraDashboard } from './components/mitra/MitraDashboard';
import { RequestPickupModal } from './components/nasabah/RequestPickupModal';
import { AuthModal } from './components/auth/AuthModal';

const AppContent: React.FC = () => {
  const { userRole, activeNavTab } = useApp();

  const renderCurrentView = () => {
    if (userRole === 'admin_mitra' || activeNavTab === 'dashboard_mitra') {
      return <MitraDashboard />;
    }

    switch (activeNavTab) {
      case 'edukasi':
        return <EdukasiPage />;
      case 'lokasi':
        return <LokasiMitraPage />;
      case 'portal_nasabah':
        return <NasabahPortal />;
      case 'beranda':
        return <LandingPage />;
      default:
        return userRole === 'nasabah' ? <NasabahPortal /> : <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main className="flex-1">{renderCurrentView()}</main>
      <Footer />
      <RequestPickupModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
