import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  FileText,
  HardDrive,
  Database,
  ExternalLink,
  Tag,
  Calendar,
  Globe,
  Plus,
  Edit2,
  Trash2,
  ShieldCheck,
} from 'lucide-react';
import { PublicationItem, PageId } from '../types';
import {
  getAdminPublications,
  subscribeToAdminData,
} from '../services/adminDataService';
import { isAdminLoggedIn } from '../services/adminAuthService';

interface PublicationsPageProps {
  onNavigate: (page: PageId) => void;
}

export const PublicationsPage: React.FC<PublicationsPageProps> = ({ onNavigate }) => {
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  useEffect(() => {
    setPublications(getAdminPublications());
    const unsub = subscribeToAdminData(() => {
      setPublications(getAdminPublications());
    });
    return () => unsub();
  }, []);

  const types = ['all', 'Conference Paper', 'Book', 'Journal', 'Ebook'];
  const years = ['all', '2026', '2025', '2024', '2020', '2018'];

  const filtered = publications.filter(pub => {
    const q = search.toLowerCase();
    const matchQuery =
      pub.title.toLowerCase().includes(q) ||
      pub.summary.toLowerCase().includes(q) ||
      (pub.venue && pub.venue.toLowerCase().includes(q)) ||
      pub.tags.some(t => t.toLowerCase().includes(q));

    const matchType = selectedType === 'all' || pub.type === selectedType;
    const matchYear = selectedYear === 'all' || pub.year === selectedYear;

    return matchQuery && matchType && matchYear;
  });

  const handleOpenDrive = (url?: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    } else {
      onNavigate('drive');
    }
  };

  const handleOpenWebsite = (url?: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-16">
      {/* Header matching Image 1 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Kesarjanaan, Buku & Persidangan</span>
          </div>
          <h1 className="text-3xl font-black text-[#0c1f38] mt-1">Penerbitan & Penyelidikan</h1>
          <p className="text-sm text-slate-500">
            Penulisan akademik, artikel jurnal berwasit, prosiding persidangan antarabangsa, dan modul buku teks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <span className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
            {publications.length} Penerbitan Ilmiah & Penyelidikan
          </span>

          {isAdminLoggedIn() && (
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer hover:scale-102"
              title="Urus, Tambah & Padam Penyelidikan di Panel Pentadbir"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>CRUD Penyelidikan</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar matching Image 1 */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari penerbitan mengikut tajuk, kata kunci (cth: Generative AI, Pengakap, IR 5.0)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 cursor-pointer focus:outline-hidden"
            >
              <option value="all">Semua Kategori</option>
              <option value="Conference Paper">Kertas Persidangan</option>
              <option value="Book">Buku Teks / Cetak</option>
              <option value="Journal">Jurnal Berwasit</option>
              <option value="Ebook">E-Buku / Modul</option>
            </select>

            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 cursor-pointer focus:outline-hidden"
            >
              <option value="all">Semua Tahun</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2020">2020</option>
              <option value="2018">2018</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Menunjukkan <strong className="text-slate-900">{filtered.length}</strong> daripada {publications.length} penerbitan
          </span>
          {(search || selectedType !== 'all' || selectedYear !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedType('all');
                setSelectedYear('all');
              }}
              className="text-emerald-600 hover:underline font-semibold cursor-pointer"
            >
              Set Semula Penapis
            </button>
          )}
        </div>
      </div>

      {/* Publications List matching Image 1 */}
      <div className="space-y-4">
        {filtered.map(pub => (
          <div
            key={pub.id}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 group"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {pub.year}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {pub.type}
                </span>
                {pub.venue && (
                  <span className="text-xs font-medium text-slate-500">
                    • {pub.venue}
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {pub.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pub.summary}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {pub.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button: Hanya Pautan Web */}
            <div className="flex-shrink-0 flex items-center pt-2 md:pt-0">
              <button
                type="button"
                onClick={() => handleOpenWebsite(pub.websiteUrl || pub.driveUrl || '#')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-900 border border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                title="Buka Pautan Web"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Pautan Web</span>
                <ExternalLink className="w-3 h-3 text-blue-500 ml-0.5" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500">
            <p className="text-base font-bold text-slate-700">Tiada penerbitan dijumpai</p>
            <p className="text-xs text-slate-400 mt-1">Cuba tukar kriteria carian atau penapis kategori anda.</p>
          </div>
        )}
      </div>
    </div>
  );
};
