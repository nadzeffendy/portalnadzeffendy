import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Lightbulb, GraduationCap, ArrowRight, User } from 'lucide-react';
import { PageId } from '../types';
import { PUBLICATIONS, INNOVATIONS, TEACHING_COURSES } from '../data/nadzEffendyData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredPubs = q
    ? PUBLICATIONS.filter(p => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)))
    : [];

  const filteredInno = q
    ? INNOVATIONS.filter(i => i.title.toLowerCase().includes(q) || i.acronym.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
    : [];

  const filteredCourses = q
    ? TEACHING_COURSES.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
    : [];

  const hasResults = filteredPubs.length > 0 || filteredInno.length > 0 || filteredCourses.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari penerbitan, penyelidikan, kursus, inovasi atau pangkalan data..."
            className="w-full py-4 text-base bg-transparent focus:outline-hidden text-slate-900 placeholder:text-slate-400"
            autoFocus
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs bg-slate-100 text-slate-500 font-medium px-2 py-1 rounded-md">
              ESC
            </span>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!q && (
            <div className="py-6 text-center">
              <p className="text-sm text-slate-500">
                Pintasan carian pantas: taip kata kunci seperti <span className="font-semibold text-indigo-600">"Cybersecurity"</span>, <span className="font-semibold text-indigo-600">"iPMAS"</span>, <span className="font-semibold text-indigo-600">"AI"</span>, atau <span className="font-semibold text-indigo-600">"Pengakap"</span>.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {[
                  { label: 'Laman Utama', page: 'home' as PageId },
                  { label: 'CV Infografik', page: 'cv' as PageId },
                  { label: 'Biodata & Perkhidmatan', page: 'profile' as PageId },
                  { label: 'Kepakaran JTMK', page: 'teaching' as PageId },
                  { label: 'Sistem Inovasi (SISPEN3K)', page: 'innovations' as PageId },
                  { label: 'News & Acara', page: 'news' as PageId },
                  { label: 'Galeri Foto', page: 'gallery' as PageId },
                  { label: 'Admin (Portal Kandungan)', page: 'admin' as PageId },
                  { label: 'Google Drive', page: 'drive' as PageId },
                ].map(nav => (
                  <button
                    key={nav.page}
                    onClick={() => {
                      onNavigate(nav.page);
                      onClose();
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg border border-slate-200/60 transition-colors cursor-pointer"
                  >
                    {nav.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && !hasResults && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-base font-medium">Tiada padanan dijumpai untuk "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Cuba kata kunci lain seperti AI, Network, atau Inovasi.</p>
            </div>
          )}

          {/* Inovasi */}
          {filteredInno.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
                <Lightbulb className="w-4 h-4" />
                <span>Inovasi & Projek ({filteredInno.length})</span>
              </div>
              <div className="space-y-2">
                {filteredInno.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onNavigate('innovations');
                      onClose();
                    }}
                    className="p-3 bg-slate-50 hover:bg-indigo-50/60 rounded-xl cursor-pointer border border-slate-100 transition-all group flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 group-hover:text-indigo-600">
                          {item.acronym}
                        </span>
                        <span className="text-xs text-slate-500">— {item.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{item.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Penerbitan */}
          {filteredPubs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Penerbitan & Penyelidikan ({filteredPubs.length})</span>
              </div>
              <div className="space-y-2">
                {filteredPubs.map(pub => (
                  <div
                    key={pub.id}
                    onClick={() => {
                      onNavigate('publications');
                      onClose();
                    }}
                    className="p-3 bg-slate-50 hover:bg-emerald-50/60 rounded-xl cursor-pointer border border-slate-100 transition-all group flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                          {pub.year}
                        </span>
                        <h4 className="font-semibold text-slate-900 text-sm group-hover:text-emerald-700 line-clamp-1">
                          {pub.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{pub.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Kursus */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Kursus & Pengajaran ({filteredCourses.length})</span>
              </div>
              <div className="space-y-2">
                {filteredCourses.map(course => (
                  <div
                    key={course.id}
                    onClick={() => {
                      onNavigate('teaching');
                      onClose();
                    }}
                    className="p-3 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100 transition-all group flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-600">
                          {course.code}
                        </span>
                        <h4 className="font-semibold text-slate-900 text-sm group-hover:text-blue-700">
                          {course.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{course.level}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Portal Akademik Nadz Effendy • Politeknik Tuanku Syed Sirajuddin</span>
          <span className="font-medium text-slate-600">Klik item untuk melayari</span>
        </div>
      </div>
    </div>
  );
};
