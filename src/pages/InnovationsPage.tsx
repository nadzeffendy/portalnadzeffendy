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
} from 'lucide-react';
import { InnovationProject, PageId } from '../types';
import {
  getAdminInnovations,
  subscribeToAdminData,
} from '../services/adminDataService';

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

        {/* Action button to Database matching Image 3 */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => onNavigate('admin')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs cursor-pointer transition-all hover:scale-102"
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rekod Inovasi di Database</span>
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 shadow-2xs cursor-pointer transition-all hover:scale-102"
          >
            <Edit2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Urus Inovasi (Admin)</span>
          </button>
        </div>
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

              {/* Action buttons matching Image 3 with live Drive/Website URLs */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenDrive(current.driveUrl)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <HardDrive className="w-4 h-4 text-amber-600" />
                  <span>Dokumentasi di Google Drive</span>
                  {current.driveUrl && <ExternalLink className="w-3 h-3 text-slate-500" />}
                </button>

                {current.websiteUrl && (
                  <button
                    type="button"
                    onClick={() => handleOpenWebsite(current.websiteUrl)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Buka Sistem Live Web</span>
                    <ExternalLink className="w-3 h-3 text-white" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600/60 hover:bg-indigo-600 text-white border border-indigo-400/40 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Database className="w-4 h-4 text-cyan-300" />
                  <span>Urus Log Inovasi</span>
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
          <button
            onClick={() => onNavigate('admin')}
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Inovasi Baharu</span>
          </button>
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

                {/* Direct quick action buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleOpenDrive(project.driveUrl);
                    }}
                    className="flex-1 py-1.5 px-2 bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-900 rounded-lg text-[11px] font-bold border border-slate-200 flex items-center justify-center gap-1 transition-colors"
                  >
                    <HardDrive className="w-3 h-3 text-amber-500" />
                    <span>Drive</span>
                  </button>

                  {project.websiteUrl && (
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handleOpenWebsite(project.websiteUrl);
                      }}
                      className="flex-1 py-1.5 px-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded-lg text-[11px] font-bold border border-slate-200 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Globe className="w-3 h-3 text-blue-500" />
                      <span>Sistem</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      onNavigate('database');
                    }}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-lg border border-slate-200"
                    title="Edit di Admin Hub"
                  >
                    <Edit2 className="w-3 h-3 text-blue-600" />
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
