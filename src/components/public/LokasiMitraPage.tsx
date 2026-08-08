import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MitraBank } from '../../types';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Star,
  Search,
  Filter,
  Truck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  X
} from 'lucide-react';

export const LokasiMitraPage: React.FC = () => {
  const { mitraList, setSelectedMitraForDetail, setIsPickupModalOpen, setUserRole } = useApp();

  const [selectedCity, setSelectedCity] = useState<string>('Semua');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMitraModal, setActiveMitraModal] = useState<MitraBank | null>(null);

  const cities = ['Semua', 'Jakarta Selatan', 'Bandung', 'Surabaya', 'Sleman / Yogyakarta'];
  const categories = ['Semua', 'Plastik', 'Kertas', 'Kaleng', 'Organik', 'Elektronik', 'Kaca'];

  const filteredMitra = mitraList.filter(m => {
    const matchesCity = selectedCity === 'Semua' || m.city === selectedCity;
    const matchesCat =
      selectedCategoryFilter === 'Semua' || m.acceptedTypes.includes(selectedCategoryFilter as any);
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-200 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/30">
            Jaringan Lokasi Mitra
          </span>
          <h1 className="text-3xl font-black tracking-tight">Temukan Mitra Bank Sampah Terdekat</h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Mitra Bank Sampah resmi yang terverifikasi untuk melayani penimbangan langsung di loket maupun penjemputan sampah terpilah ke rumah.
          </p>
        </div>

        <button
          onClick={() => {
            setUserRole('nasabah');
            setIsPickupModalOpen(true);
          }}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2 shrink-0 transition-transform transform hover:scale-105"
        >
          <Truck className="w-4 h-4 text-slate-950" />
          <span>Booking Penjemputan Langsung</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari nama mitra, jalan, kota..."
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
            />
          </div>

          {/* City Filter */}
          <div>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
            >
              {cities.map(c => (
                <option key={c} value={c}>
                  Wilayah: {c}
                </option>
              ))}
            </select>
          </div>

          {/* Waste type filter */}
          <div>
            <select
              value={selectedCategoryFilter}
              onChange={e => setSelectedCategoryFilter(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  Menerima Sampah: {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Simulated Interactive Map + Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Map Visualizer Box */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Simulasi Peta Sebaran Mitra</h3>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              Live Map GPS
            </span>
          </div>

          {/* Mock Map Canvas */}
          <div className="h-72 bg-slate-950 rounded-2xl relative overflow-hidden border border-slate-800 flex items-center justify-center p-4">
            {/* Map Grid Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-40"></div>

            {/* Simulated Map Road lines */}
            <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-2 opacity-50" fill="none">
              <path d="M 0 50 Q 150 100 300 40 T 600 120" />
              <path d="M 100 0 Q 80 150 200 300" />
              <path d="M 0 200 L 500 220" />
            </svg>

            {/* Animated Pin Markers */}
            {filteredMitra.map((mitra, idx) => (
              <button
                key={mitra.id}
                onClick={() => setActiveMitraModal(mitra)}
                style={{
                  top: `${20 + (idx * 22) % 60}%`,
                  left: `${15 + (idx * 28) % 70}%`
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/30 animate-ping absolute"></div>
                  <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white text-white flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="absolute top-9 bg-slate-900/90 text-white text-[9px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700">
                    {mitra.name} ({mitra.city})
                  </div>
                </div>
              </button>
            ))}

            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-[10px] text-slate-400 p-2 rounded-lg border border-slate-800">
              Klik pin hijau untuk melihat profil & lokasi lengkap mitra.
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center leading-relaxed">
            Semua mitra bank sampah di atas telah terverifikasi standar penimbangan digital From Waste To Wealth.
          </p>
        </div>

        {/* Partner List Grid */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              Daftar Mitra Bank Sampah ({filteredMitra.length})
            </h3>
            <span className="text-xs text-slate-500">Menampilkan hasil pencarian</span>
          </div>

          {filteredMitra.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
              Tidak ada mitra bank sampah yang cocok dengan filter lokasi atau jenis sampah ini.
            </div>
          ) : (
            filteredMitra.map(mitra => (
              <div
                key={mitra.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={mitra.imageUrl}
                      alt={mitra.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-base">{mitra.name}</h4>
                        {mitra.isVerified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-600" title="Terverifikasi" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {mitra.address}, {mitra.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{mitra.rating}</span>
                    <span className="text-slate-400 font-normal">({mitra.reviewsCount})</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="block text-[10px] text-slate-400">Jam Operasional</span>
                      <span className="font-semibold text-slate-800">{mitra.openDays} ({mitra.openHours})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="block text-[10px] text-slate-400">Kontak WhatsApp</span>
                      <span className="font-semibold text-slate-800">{mitra.whatsapp}</span>
                    </div>
                  </div>
                </div>

                {/* Accepted types tags */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Jenis Sampah Diterima:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mitra.acceptedTypes.map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-bold px-2 py-0.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setActiveMitraModal(mitra)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    Daftar Harga & Detail
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('nasabah');
                      setIsPickupModalOpen(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs flex items-center gap-1 transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" /> Request Penjemputan
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mitra Detail Modal */}
      {activeMitraModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 relative border border-slate-100 my-8 animate-in fade-in duration-200">
            <button
              onClick={() => setActiveMitraModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src={activeMitraModal.imageUrl}
                  alt={activeMitraModal.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-lg font-black text-slate-900">{activeMitraModal.name}</h3>
                  <p className="text-xs text-slate-500">{activeMitraModal.address}, {activeMitraModal.city}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs font-bold text-amber-600">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>{activeMitraModal.rating} / 5.0 ({activeMitraModal.reviewsCount} Ulasan Nasabah)</span>
                  </div>
                </div>
              </div>

              {/* Operational info */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Jam Operasional:</span>
                  <span className="font-bold text-slate-800">{activeMitraModal.openDays} ({activeMitraModal.openHours})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">No. WhatsApp / Telepon:</span>
                  <span className="font-bold text-emerald-700">{activeMitraModal.whatsapp}</span>
                </div>
              </div>

              {/* Price list table preview */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wider">
                  Daftar Harga Beli Sampah Mitra (Per Kg)
                </h4>
                <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs">
                  {activeMitraModal.prices.map(item => (
                    <div key={item.id} className="p-2.5 flex justify-between items-center bg-white hover:bg-slate-50">
                      <div>
                        <span className="font-bold text-slate-800 block">{item.subCategory}</span>
                        <span className="text-[10px] text-slate-400">{item.description}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-extrabold text-emerald-700 block">
                          Rp {item.pricePerUnit.toLocaleString('id-ID')} / {item.unit}
                        </span>
                        <span className="text-[10px] text-amber-600 font-semibold">+{item.pointPerUnit} Poin</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* External map link & CTA */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={`https://maps.google.com/?q=${activeMitraModal.lat},${activeMitraModal.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Buka Google Maps
                </a>

                <button
                  onClick={() => {
                    setActiveMitraModal(null);
                    setUserRole('nasabah');
                    setIsPickupModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Truck className="w-4 h-4" /> Request Penjemputan Ke Lokasi Ini
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
