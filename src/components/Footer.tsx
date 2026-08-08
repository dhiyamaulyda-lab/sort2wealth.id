import React from 'react';
import { ShieldCheck, Heart, MapPin, Mail, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/images/from_waste_to_wealth_logo_1786154775483.jpg';

export const Footer: React.FC = () => {
  const { setActiveNavTab, setUserRole } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-sm overflow-hidden shrink-0 flex items-center justify-center">
                <img src={logoImg} alt="From Waste To Wealth Logo" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-white leading-tight">From Waste To Wealth</span>
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">Smart Waste Management</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Platform manajemen sampah cerdas yang menghubungkan rumah tangga dengan bank sampah lokal untuk menciptakan ekosistem sirkular bersih dan bernilai ekonomi tinggi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setUserRole('public');
                    setActiveNavTab('beranda');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Beranda & Panduan
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('public');
                    setActiveNavTab('edukasi');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Modul Edukasi & Quiz Pilah Sampah
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('public');
                    setActiveNavTab('lokasi');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Peta Lokasi Mitra Bank Sampah
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('nasabah');
                    setActiveNavTab('portal_nasabah');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Profil Nasabah & Penjemputan
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('admin_mitra');
                    setActiveNavTab('dashboard_mitra');
                  }}
                  className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold"
                >
                  Dashboard Admin Mitra Bank Sampah
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Kategori Sampah Diterima</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Plastik PET & HDPE (Botol/Galon)</li>
              <li>• Kertas & Kardus Kering</li>
              <li>• Logam, Besi, & Kaleng Alumunium</li>
              <li>• Minyak Goreng Bekas (Jelantah)</li>
              <li>• Perangkat Elektronik Bekas (E-Waste)</li>
              <li>• Sampah Organik Komposting</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Kontak & Layanan</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Universitas Muhammadiyah Gombong</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>kontak@fromwastetowealth.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+62 857-7801-3586 / WA 0857-7801-3586</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 From Waste To Wealth.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Data Terenkripsi
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Heart className="w-4 h-4 text-rose-500" /> Dibuat Untuk Indonesia Hijau
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
