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
  Award,
  ShieldCheck,
} from 'lucide-react';
import { TeachingCourse, ExpertiseItem, PageId } from '../types';
import {
  getAdminCourses,
  getAdminExpertise,
  subscribeToAdminData,
} from '../services/adminDataService';
import { isAdminLoggedIn } from '../services/adminAuthService';

interface TeachingPageProps {
  onNavigate: (page: PageId) => void;
}

export const TeachingPage: React.FC<TeachingPageProps> = ({ onNavigate }) => {
  const [courses, setCourses] = useState<TeachingCourse[]>([]);
  const [expertise, setExpertise] = useState<ExpertiseItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setCourses(getAdminCourses());
    setExpertise(getAdminExpertise());
    const unsub = subscribeToAdminData(() => {
      setCourses(getAdminCourses());
      setExpertise(getAdminExpertise());
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
            <span>Kepakaran, Kurikulum & Portfolio Akademik</span>
          </div>
          <h1 className="text-3xl font-black text-[#0c1f38] mt-1">Bidang Kepakaran & Pengajaran</h1>
          <p className="text-sm text-slate-500">
            Fokus kepakaran profesional, persijilan industri, dan kursus pengajian di bawah JTMK & Asasi TVET PTSS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
            {expertise.length} Bidang Kepakaran & Kemahiran
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
            {courses.length} Kursus Pengajian
          </span>

          {isAdminLoggedIn() && (
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer hover:scale-102"
              title="Urus, Tambah & Padam Kepakaran di Panel Pentadbir"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>CRUD Kepakaran</span>
            </button>
          )}
        </div>
      </div>

      {/* Showcase Grid: Bidang Kepakaran TVET (From Admin Data) */}
      {expertise.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Bidang Kepakaran & Kemahiran ({expertise.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {expertise.map(exp => (
              <div
                key={exp.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {exp.category}
                    </span>
                    {exp.level && !exp.level.toLowerCase().includes('pakar') && (
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/80">
                        {exp.level}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">{exp.title}</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{exp.description}</p>

                  {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {exp.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {exp.badge && (
                  <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-indigo-700 font-semibold">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{exp.badge}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kursus-Kursus Pengajian Section */}
      <div className="pt-6 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Senarai Kursus Pengajian JTMK & TVET ({courses.length})
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Modul-modul pengajaran yang dikendalikan di peringkat Diploma dan Asasi Politeknik.
        </p>
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

            {/* Bottom Action: Hanya Pautan Web */}
            <div className="pt-4 border-t border-slate-100 mt-6">
              <button
                type="button"
                onClick={() => handleOpenWebsite(course.websiteUrl || course.driveUrl || '#')}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
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
          <div className="col-span-full p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500">
            <p className="text-base font-bold text-slate-700">Tiada kursus dijumpai</p>
            <p className="text-xs text-slate-400 mt-1">Cuba kata kunci lain atau tambah kursus baharu melalui Admin.</p>
          </div>
        )}
      </div>
    </div>
  );
};
