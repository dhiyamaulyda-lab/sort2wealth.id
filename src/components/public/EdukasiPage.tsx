import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { quizQuestions } from '../../data/mockData';
import {
  BookOpen,
  Search,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  HelpCircle,
  Tag,
  Clock,
  User,
  Eye,
  ChevronRight,
  Share2,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EdukasiPage: React.FC = () => {
  const { eduArticles, updateNasabah, nasabah } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeArticleModalId, setActiveArticleModalId] = useState<string | null>(null);

  // Interactive Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [claimedPoints, setClaimedPoints] = useState(false);

  const categories = ['Semua', 'Panduan Memilah', 'Inovasi Daur Ulang', 'Gaya Hidup', 'Kebijakan & Dampak'];

  const filteredArticles = eduArticles.filter(art => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'Semua' || art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const activeModalArticle = eduArticles.find(a => a.id === activeArticleModalId);

  // Quiz logic
  const currentQ = quizQuestions[currentQuestionIdx];

  const handleOptionSelect = (idx: number) => {
    if (isQuizSubmitted) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsQuizSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsQuizSubmitted(false);
    } else {
      setQuizCompleted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleClaimQuizReward = () => {
    const earnedPoints = quizScore * 50;
    updateNasabah({
      rewardPoints: nasabah.rewardPoints + earnedPoints
    });
    setClaimedPoints(true);
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setQuizScore(0);
    setIsQuizSubmitted(false);
    setQuizCompleted(false);
    setClaimedPoints(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-700/80 border border-emerald-500/30 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
            <BookOpen className="w-4 h-4 text-emerald-300" /> Modul Edukasi & Quiz Interaktif
          </div>
          <h1 className="text-3xl font-black tracking-tight">Pusat Pengetahuan Bank Sampah</h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Pelajari panduan memilah sampah rumah tangga, kode jenis plastik, pembuatan komposting, serta ikuti quiz singkat untuk menambah Poin Reward akun Anda!
          </p>
        </div>
      </div>

      {/* Interactive Quiz Game Banner Section */}
      <section className="bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-emerald-200/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Mini Game Edukasi
              </span>
              <h2 className="text-xl font-black text-slate-800">Quiz Pilah Sampah Berhadiah Poin</h2>
              <p className="text-xs text-slate-600">Uji pengetahuan pemilahan sampah Anda & dapatkan 50 Poin per jawaban benar!</p>
            </div>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl border border-emerald-200 shadow-2xs text-xs font-bold text-slate-800 flex items-center gap-2">
            <span>Status Poin Anda:</span>
            <span className="text-amber-600 font-extrabold">{nasabah.rewardPoints} Poin</span>
          </div>
        </div>

        {/* Quiz Body */}
        {!quizCompleted ? (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span className="font-semibold text-emerald-800">Pertanyaan {currentQuestionIdx + 1} dari {quizQuestions.length}</span>
              <span className="font-bold text-amber-600">Skor: {quizScore} Benar</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50/60";
                if (selectedOption === idx) {
                  btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold";
                }
                if (isQuizSubmitted) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = "bg-emerald-600 border-emerald-600 text-white font-bold";
                  } else if (selectedOption === idx && idx !== currentQ.correctIndex) {
                    btnStyle = "bg-rose-100 border-rose-400 text-rose-800 font-semibold";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isQuizSubmitted && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                    )}
                    {isQuizSubmitted && selectedOption === idx && idx !== currentQ.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submit */}
            {isQuizSubmitted && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
                <p className="font-bold">Penjelasan Edukasi:</p>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Controls */}
            <div className="pt-2 flex justify-end gap-3">
              {!isQuizSubmitted ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  Jawab & Periksa
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1"
                >
                  <span>Pertanyaan Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">Quiz Selesai!</h3>
            <p className="text-sm text-slate-600">
              Hasil Anda: <span className="font-extrabold text-emerald-700">{quizScore} dari {quizQuestions.length}</span> jawaban benar.
            </p>

            {quizScore > 0 ? (
              <div className="p-4 bg-emerald-50 rounded-2xl max-w-sm mx-auto border border-emerald-200 text-xs">
                <span className="font-bold text-slate-800 block mb-1">Bonus Poin Reward:</span>
                <span className="text-xl font-black text-amber-600">+{quizScore * 50} Poin</span>
                {!claimedPoints ? (
                  <button
                    onClick={handleClaimQuizReward}
                    className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-4 h-4 text-white" /> Klaim Poin ke Akun Nasabah
                  </button>
                ) : (
                  <p className="mt-2 text-emerald-700 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Poin Telah Ditambahkan ke Akun!
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Coba ulangi quiz untuk mendapatkan poin reward.</p>
            )}

            <button
              onClick={handleResetQuiz}
              className="text-xs font-bold text-emerald-700 hover:underline pt-2 inline-block"
            >
              Ulangi Quiz Dari Awal
            </button>
          </div>
        )}
      </section>

      {/* Article Search & Filter Bar */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories pill list */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari artikel, tips, plastik..."
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(art => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-44 relative overflow-hidden bg-slate-100">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-900/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {art.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readTime}</span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 line-clamp-2 hover:text-emerald-700 cursor-pointer" onClick={() => setActiveArticleModalId(art.id)}>
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveArticleModalId(art.id)}
                  className="w-full bg-slate-50 hover:bg-emerald-50 text-emerald-800 font-bold text-xs py-2.5 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Detail Modal */}
      {activeModalArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative border border-slate-100 my-8 animate-in fade-in duration-200">
            <button
              onClick={() => setActiveArticleModalId(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {activeModalArticle.category}
              </span>

              <h2 className="text-2xl font-black text-slate-900">{activeModalArticle.title}</h2>

              <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-3">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-emerald-600" /> {activeModalArticle.author}</span>
                <span>•</span>
                <span>{activeModalArticle.date}</span>
                <span>•</span>
                <span>{activeModalArticle.readTime}</span>
              </div>

              <img
                src={activeModalArticle.imageUrl}
                alt={activeModalArticle.title}
                className="w-full h-56 object-cover rounded-2xl"
              />

              <div className="prose prose-sm text-slate-700 space-y-3 leading-relaxed text-xs sm:text-sm">
                <p className="font-semibold text-slate-900">{activeModalArticle.summary}</p>
                <div className="whitespace-pre-line text-slate-600">
                  {activeModalArticle.content}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {activeModalArticle.tags.map((t, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Tag className="w-3 h-3 text-emerald-600" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
