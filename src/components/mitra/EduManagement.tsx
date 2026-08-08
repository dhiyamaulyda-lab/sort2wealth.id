import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EduArticle } from '../../types';
import { BookOpen, Plus, Trash2, Edit3, X, Save } from 'lucide-react';

export const EduManagement: React.FC = () => {
  const { eduArticles, addEduArticle, deleteEduArticle } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EduArticle['category']>('Panduan Memilah');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Tim Mitra Bank Sampah');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEduArticle({
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      category,
      summary,
      content,
      author,
      readTime: '3 menit',
      imageUrl,
      tags: ['Edukasi Mitra', 'Zero Waste']
    });

    setIsAdding(false);
    setTitle('');
    setSummary('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Kelola Konten Edukasi</h2>
          <p className="text-xs text-slate-500">Publikasikan artikel, tips pemilahan, dan panduan lingkungan untuk nasabah.</p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0 shadow-2xs"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAdding ? 'Batal' : 'Tambah Artikel Baru'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">Buat Konten Edukasi Baru</h3>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Judul Artikel</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Contoh: Cara Membuat Pupuk Organik dari Sisa Dapur"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori Konten</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
              >
                <option value="Panduan Memilah">Panduan Memilah</option>
                <option value="Inovasi Daur Ulang">Inovasi Daur Ulang</option>
                <option value="Gaya Hidup">Gaya Hidup</option>
                <option value="Kebijakan & Dampak">Kebijakan & Dampak</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Penulis / Institusi</label>
              <input
                type="text"
                required
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Ringkasan Singkat</label>
            <textarea
              rows={2}
              required
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="Ringkasan 1-2 kalimat..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Isi Artikel Lengkap</label>
            <textarea
              rows={5}
              required
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Tuliskan panduan atau artikel di sini..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-2xs"
            >
              Publikasikan Artikel
            </button>
          </div>
        </form>
      )}

      {/* List of articles */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
          Daftar Artikel Edukasi ({eduArticles.length})
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {eduArticles.map(art => (
            <div key={art.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div>
                  <span className="bg-emerald-50 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                    {art.category}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm mt-0.5">{art.title}</h4>
                  <p className="text-[10px] text-slate-400">Penulis: {art.author} • {art.date}</p>
                </div>
              </div>

              <button
                onClick={() => deleteEduArticle(art.id)}
                className="text-slate-400 hover:text-rose-600 p-2 rounded-lg transition-colors"
                title="Hapus Artikel"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
