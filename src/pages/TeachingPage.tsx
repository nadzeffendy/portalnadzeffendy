import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Search,
  HardDrive,
  Database,
  Layers,
  CheckCircle,
  ExternalLink,
  Download,
  Globe,
  Edit2,
  Plus,
} from 'lucide-react';
import { TeachingCourse, PageId } from '../types';
import {
  getAdminCourses,
  subscribeToAdminData,
} from '../services/adminDataService';

interface TeachingPageProps {
  onNavigate: (page: PageId) => void;
}

export const TeachingPage: React.FC<TeachingPageProps> = ({ onNavigate }) => {
  const [courses, setCourses] = useState<TeachingCourse[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setCourses(getAdminCourses());
    const unsub = subscribeToAdminData(() => {
      setCourses(getAdminCourses());
    });
    return () => unsub();
  }, []);

  const filtered = courses.filter(c => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags?.some(t => t.toLowerCase().includes(q))
    );
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
      {/* Title & Banner matching Image 2 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Portfolio Akademik & Kurikulum</span>
          </div>
          <h1 className="text-3xl font-black text-[#0c1f38] mt-1">Pengajaran & Kursus Pengajian</h1>
          <p className="text-sm text-slate-500">
            Kursus-kursus yang dipertanggungjawabkan di bawah Jabatan Teknologi Maklumat dan Komunikasi (JTMK) & Asasi TVET PTSS.
          </p>
        </div>

        {/* Action buttons matching Image 2 + Admin CRUD access */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => handleOpenDrive('https://drive.google.com/drive/u/0/my-drive')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs cursor-pointer transition-all hover:scale-102"
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Folder Bahan Kuliah di Drive</span>
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 shadow-xs cursor-pointer transition-all hover:scale-102"
            title="Tambah atau edit kursus dan pautan Google Drive"
          >
            <Edit2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Urus / Edit Kursus (Admin)</span>
          </button>
        </div>
      </div>

      {/* Search Input matching Image 2 */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari kursus (cth: Network, Cybersecurity, Multimedia)..."
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 shadow-2xs"
        />
      </div>

      {/* Course Cards Grid matching Image 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(course => (
          <div
            key={course.id}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-mono font-bold border border-indigo-100">
                  {course.code}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {course.materialsCount || 12} Bahan Muat Turun
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                {course.name}
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-1 mb-3">
                {course.level}
              </p>

              <p className="text-xs text-slate-600 leading-relaxed">
                {course.description}
              </p>

              {course.tags && course.tags.length > 0 && (
                <div className="pt-4 flex flex-wrap gap-1.5">
                  {course.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions matching Image 2 with active Drive URL */}
            <div className="pt-6 border-t border-slate-100 mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenDrive(course.driveUrl)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title={course.driveUrl ? `Buka Drive: ${course.driveUrl}` : 'Buka Folder Google Drive'}
                >
                  <HardDrive className="w-3.5 h-3.5 text-amber-500" />
                  <span>Buka di Drive</span>
                  {course.driveUrl && <ExternalLink className="w-3 h-3 text-amber-600 ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                  title="Urus rekod kursus di Admin Portal"
                >
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                </button>
              </div>

              {course.websiteUrl && (
                <button
                  type="button"
                  onClick={() => handleOpenWebsite(course.websiteUrl)}
                  className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>Portal e-Learning / CIDOS</span>
                  <ExternalLink className="w-3 h-3 text-blue-500 ml-0.5" />
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500">
            <p className="text-base font-bold text-slate-700">Tiada kursus dijumpai</p>
            <p className="text-xs text-slate-400 mt-1">Cuba kata kunci lain atau tambah kursus baharu melalui Admin.</p>
          </div>
        )}
      </div>
    </div>
  );
};
