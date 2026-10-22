import React, { useState, useEffect } from 'react';
import {
  Lightbulb,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Database,
  HardDrive,
  FileText,
  ExternalLink,
  Globe,
  Edit2,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { InnovationProject, PageId } from '../types';
import {
  getAdminInnovations,
  subscribeToAdminData,
} from '../services/adminDataService';
import { isAdminLoggedIn } from '../services/adminAuthService';

interface InnovationsPageProps {
  onNavigate: (page: PageId) => void;
}

export const InnovationsPage: React.FC<InnovationsPageProps> = ({ onNavigate }) => {
  const [innovations, setInnovations] = useState<InnovationProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<InnovationProject | null>(null);

  useEffect(() => {
    const list = getAdminInnovations();
    setInnovations(list);
    if (list.length > 0) {
      setSelectedProject(list[0]);
    }
    const unsub = subscribeToAdminData(() => {
      const updated = getAdminInnovations();
      setInnovations(updated);
      if (updated.length > 0) {
        setSelectedProject(prev => {
          if (!prev) return updated[0];
          const found = updated.find(i => i.id === prev.id);
          return found || updated[0];
        });
      }
    });
    return () => unsub();
  }, []);

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

  const current = selectedProject || innovations[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-16">
      {/* Header matching Image 3 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Kreativiti & Penyelidikan Gunaan</span>
          </div>
          <h1 className="text-3xl font-black text-[#0c1f38] mt-1">Sistem & Inovasi Digital</h1>
          <p className="text-sm text-slate-500">
            Koleksi sistem pintar dan inovasi digital berimpak tinggi yang dibangunkan untuk memperkasa pengurusan politeknik.
          </p>
        </div>

        {isAdminLoggedIn() && (
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
              title="Buka Panel Pentadbir untuk Tambah, Sunting, atau Padam Inovasi"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>Panel Pentadbir (CRUD Inovasi)</span>
            </button>
          </div>
        )}
      </div>

      {/* Hero Spotlight Project matching Image 3 */}
      {current && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1f38] via-slate-900 to-[#163359] text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-cyan-400 text-slate-950">
                  {current.acronym}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/90">
                  Tahun {current.year}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Status: {current.status}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {current.title}
              </h2>
              <p className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                {current.category}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {current.description}
              </p>

              {/* Features check list */}
              {current.features && current.features.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Ciri-Ciri Utama Inovasi:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {current.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action button: Hanya Pautan Web */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenWebsite(current.websiteUrl || current.driveUrl || '#')}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <Globe className="w-4 h-4" />
                  <span>Pautan Web</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

            {/* Right Card / Architecture Highlight */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white">Arkitektur & Kesan Sistem</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direka khas untuk meminimumkan birokrasi fizikal dan mengautomasi semakan standard kualiti institusi dengan pantas dan selamat.
              </p>
              <div className="pt-2 border-t border-white/10 text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Inovasi Rasmi Politeknik Malaysia</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full List of Projects matching Image 3: "Senarai Penuh Projek Inovasi (5)" */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Senarai Penuh Projek Inovasi ({innovations.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovations.map(project => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 ${
                selectedProject?.id === project.id
                  ? 'bg-blue-50/40 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:shadow-lg'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-black border border-amber-200">
                    {project.acronym}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {project.year}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {project.title}
                </h4>
                <p className="text-xs text-slate-500 font-semibold mt-1 mb-2">
                  {project.category}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Card Footer Links */}
              <div className="pt-4 border-t border-slate-100 mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Status: {project.status}
                  </span>
                  <span className="text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Pilih Paparan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Direct quick action: Hanya Pautan Web */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleOpenWebsite(project.websiteUrl || project.driveUrl || '#');
                    }}
                    className="w-full py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-xs font-bold border border-blue-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Globe className="w-3 h-3 text-blue-600" />
                    <span>Pautan Web</span>
                    <ExternalLink className="w-2.5 h-2.5 text-blue-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
