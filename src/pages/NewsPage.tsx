import React, { useState } from 'react';
import { Newspaper, Calendar, ArrowRight, Tag, ExternalLink, Sparkles, Award } from 'lucide-react';
import { PageId } from '../types';

interface NewsPageProps {
  onNavigate: (page: PageId) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const newsItems = [
    {
      id: 'news-1',
      date: 'Oktober 2026',
      title: 'Pelancaran Portal Akademik Interaktif Bersepadu Nadz Effendy',
      category: 'Inovasi Digital',
      summary:
        'Portal rasmi berasaskan seni bina amirulhelmi.my telah dilancarkan secara rasmi dengan integrasi Google Drive API, pangkalan data dinamik, serta modul paparan CV infografik 4-halaman lengkap.',
      badge: 'Terkini',
      highlights: ['Integrasi Google Drive REST v3', 'CV Infografik 4 Halaman', 'Pangkalan Data Kursus TVET'],
    },
    {
      id: 'news-2',
      date: 'September 2026',
      title: 'Kajian JACoIT 2026: Kecerdasan Buatan dan Analitik Perniagaan PKS Diterbitkan',
      category: 'Penyelidikan',
      summary:
        'Kertas kajian bibliometrik bertajuk "Artificial Intelligence and Business Intelligence in Small and Medium Enterprises" telah berjaya diterbitkan dalam Journal of Applied Computing and Information Technology.',
      badge: 'Penerbitan',
      highlights: ['Journal of Applied Computing', 'Kajian Bibliometrik', 'Impak TVET PKS'],
    },
    {
      id: 'news-3',
      date: 'Ogos 2026',
      title: 'Sistem Inovasi SISPEN3K Diperkasakan Untuk Penilaian Kursus Kemahiran Kelana PTSS',
      category: 'Inovasi TVET',
      summary:
        'Sistem Penilaian Bersepadu Kursus Kemahiran Kelana (SISPEN3K) di Daerah KSM PTSS menerima maklum balas positif dalam mempercepatkan proses penggredan dan pensijilan kelanasiswa.',
      badge: 'Inovasi',
      highlights: ['SISPEN3K', 'Pentaksiran Berkomputer', 'KSM PTSS'],
    },
    {
      id: 'news-4',
      date: 'Julai 2026',
      title: 'Bengkel AI Mastery & Prompt Engineering Bersama Pelajar JTMK PTSS',
      category: 'Latihan Akademik',
      summary:
        'Siri latihan praktikal berasaskan buku "CHATGPT HEROES: Panduan Pintar Pelajar" telah diadakan bagi meningkatkan kemahiran pemanfaatan Generative AI dalam penyelesaian masalah pengkomputeran.',
      badge: 'Bengkel',
      highlights: ['ChatGPT Heroes', 'Generative AI', 'Literasi Pelajar'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Newspaper className="w-3.5 h-3.5" />
          <span>BERITA & ACARA TERKINI</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0c1f38] tracking-tight">
          News & Perkembangan Akademik
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
          Arkib berita, liputan aktiviti penyelidikan, pencapaian inovasi digital, dan maklumat kursus terkini oleh Nasrul Effendy di Politeknik Tuanku Syed Sirajuddin.
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsItems.map(item => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-blue-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">{item.category}</p>

              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {item.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.highlights.map((hl, hIdx) => (
                  <span
                    key={hIdx}
                    className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                  >
                    #{hl}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-400">Liputan Rasmi Portal</span>
              <button
                onClick={() => onNavigate('publications')}
                className="text-xs font-bold text-[#0c1f38] hover:text-blue-600 flex items-center gap-1 transition-colors"
              >
                <span>Lihat Penerbitan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
