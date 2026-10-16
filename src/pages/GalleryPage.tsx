import React, { useState } from 'react';
import { Image as GalleryIcon, Award, Sparkles, Filter, Users, BookOpen, ExternalLink, X } from 'lucide-react';
import { PageId } from '../types';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [previewImage, setPreviewImage] = useState<{ title: string; category: string; description: string } | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Koleksi' },
    { id: 'akademik', label: 'Akademik & Pengajaran' },
    { id: 'inovasi', label: 'Inovasi Digital & Pameran' },
    { id: 'anugerah', label: 'Anugerah & Pengiktirafan' },
    { id: 'pengakap', label: 'Kokurikulum & Pengakap' },
  ];

  const galleryItems = [
    {
      id: 'gal-1',
      title: 'Pameran & Pembentangan Inovasi iPMAS',
      category: 'inovasi',
      date: '2026',
      description: 'Sesi demonstrasi Intelligent Paperwork Management System (iPMAS) di hadapan pengurusan tertinggi dan panel penilai inovasi.',
      color: 'from-blue-600 to-indigo-900',
      badge: 'Inovasi AI',
    },
    {
      id: 'gal-2',
      title: 'Majlis Penganugerahan APC Kementerian Pengajian Tinggi',
      category: 'anugerah',
      date: 'APC 2015 & 2008',
      description: 'Penerimaan Anugerah Perkhidmatan Cemerlang (APC) atas komitmen dan sumbangan cemerlang dalam pendidikan TVET kebangsaan.',
      color: 'from-amber-600 to-amber-900',
      badge: 'APC KPT',
    },
    {
      id: 'gal-3',
      title: 'Sesi Praktikal Network Security & Wireshark Lab JTMK',
      category: 'akademik',
      date: '2025/2026',
      description: 'Pengendalian sesi amali rangkaian komputer dan analisis paket data keselamatan siber bersama pelajar Diploma Teknologi Maklumat.',
      color: 'from-emerald-600 to-teal-900',
      badge: 'Makmal JTMK',
    },
    {
      id: 'gal-4',
      title: 'Perkhemahan & Penilaian Kursus Kemahiran Kelana (SISPEN3K)',
      category: 'pengakap',
      date: '2024',
      description: 'Pengujian kemahiran kelanasiswa dan pelaksanaan sistem pemarkahan bersepadu SISPEN3K di Daerah KSM PTSS.',
      color: 'from-purple-600 to-slate-900',
      badge: 'KSM PTSS',
    },
    {
      id: 'gal-5',
      title: 'Penerbitan Buku Panduan CHATGPT HEROES',
      category: 'akademik',
      date: '2024',
      description: 'Pelancaran modul panduan pintar pemanfaatan kecerdasan buatan untuk pelajar institusi pengajian tinggi.',
      color: 'from-cyan-600 to-blue-900',
      badge: 'Buku AI',
    },
    {
      id: 'gal-6',
      title: 'Bengkel Keusahawanan AI & ViralPreneur Bersama NCER',
      category: 'inovasi',
      date: '2023',
      description: 'Penyampaian ceramah kepakaran berkaitan strategi pemasaran digital dan pemerkasaan teknologi AI untuk usahawan Zon Utara.',
      color: 'from-rose-600 to-slate-900',
      badge: 'NCER / CIDB',
    },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <GalleryIcon className="w-3.5 h-3.5" />
          <span>GALERI FOTO & AKTIVITI</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0c1f38] tracking-tight">
          Galeri Aktiviti & Dokumentasi
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
          Dokumentasi bergambar sesi pameran inovasi, bengkel latihan kebangsaan, aktiviti pengajaran makmal JTMK, serta majlis penganugerahan rasmi.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0c1f38] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => setPreviewImage(item)}
            className="group cursor-pointer bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            {/* Visual Header / Banner */}
            <div className={`h-48 bg-gradient-to-tr ${item.color} p-6 flex flex-col justify-between text-white relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-md text-white">
                  {item.date}
                </span>
                <span className="text-[10px] font-extrabold uppercase bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base leading-snug text-white group-hover:underline">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-700">
                <span>Klik untuk maklumat terperinci</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
              DOKUMENTASI FOTO & AKTIVITI
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {previewImage.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {previewImage.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-medium">Politeknik Tuanku Syed Sirajuddin</span>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-4 py-2 bg-[#0c1f38] text-white text-xs font-bold rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
