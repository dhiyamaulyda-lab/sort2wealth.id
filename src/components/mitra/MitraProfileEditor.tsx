import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Save, MapPin, Phone, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const MitraProfileEditor: React.FC = () => {
  const { activeMitraAdmin, updateMitraAdmin } = useApp();

  const [name, setName] = useState(activeMitraAdmin.name);
  const [address, setAddress] = useState(activeMitraAdmin.address);
  const [district, setDistrict] = useState(activeMitraAdmin.district);
  const [city, setCity] = useState(activeMitraAdmin.city);
  const [phone, setPhone] = useState(activeMitraAdmin.phone);
  const [whatsapp, setWhatsapp] = useState(activeMitraAdmin.whatsapp);
  const [openHours, setOpenHours] = useState(activeMitraAdmin.openHours);
  const [openDays, setOpenDays] = useState(activeMitraAdmin.openDays);

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMitraAdmin({
      name,
      address,
      district,
      city,
      phone,
      whatsapp,
      openHours,
      openDays
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-800">Pengaturan Profil & Operasional Mitra</h2>
          <p className="text-xs text-slate-500">Ubah informasi publik bank sampah yang tampil pada peta pencarian nasabah.</p>
        </div>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Informasi mitra berhasil diperbarui!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Nama Bank Sampah Mitra</label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Kecamatan / Wilayah</label>
            <input
              type="text"
              required
              value={district}
              onChange={e => setDistrict(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Kota / Kabupaten</label>
            <input
              type="text"
              required
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Alamat Lengkap Loket Penimbangan</label>
          <textarea
            rows={2}
            required
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Telepon Kantor</label>
            <input
              type="text"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp Layanan</label>
            <input
              type="text"
              required
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Hari Operasional</label>
            <input
              type="text"
              required
              value={openDays}
              onChange={e => setOpenDays(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Jam Operasional</label>
            <input
              type="text"
              required
              value={openHours}
              onChange={e => setOpenHours(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-2xs flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Simpan Perubahan Profil
          </button>
        </div>
      </form>
    </div>
  );
};
