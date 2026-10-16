import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  BookOpen,
  Lightbulb,
  GraduationCap,
  HardDrive,
  Award,
  Sparkles,
  Shield,
  FileText,
  Mail,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Clock,
  Layers,
  Building,
  UserCheck,
  FolderOpen,
  Globe,
  Plus,
  Edit2,
  Trash2,
  Link as LinkIcon,
  ShieldCheck,
  X,
  Save,
} from 'lucide-react';
import { PageId, NavigationLink } from '../types';
import {
  PERSONAL_INFO,
  INNOVATIONS,
  PUBLICATIONS,
  TEACHING_COURSES,
  EDUCATIONS,
  SERVICE_HISTORY,
  MEMBERSHIPS,
  EXPERTISE_SERVICES,
  REFERENCES,
} from '../data/nadzEffendyData';
import { AvatarDisplay } from '../components/AvatarDisplay';
import { CVInfographicSection } from '../components/CVInfographicSection';
import {
  getAdminInnovations,
  getAdminNavLinks,
  getAdminProfile,
  updateAdminProfile,
  addAdminNavLink,
  deleteAdminNavLink,
  subscribeToAdminData,
} from '../services/adminDataService';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
  googleConnected: boolean;
  isAdmin?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenSearch,
  googleConnected,
  isAdmin = false,
}) => {
  const [profile, setProfile] = useState(getAdminProfile());
  const [latestInno, setLatestInno] = useState(getAdminInnovations());
  const [navLinks, setNavLinks] = useState<NavigationLink[]>(getAdminNavLinks());
  const [selectedNavFilter, setSelectedNavFilter] = useState<string>('all');

  // Quick Inline Edit Modals for Admin
  const [isHeroEditOpen, setIsHeroEditOpen] = useState(false);
  const [editHeroName, setEditHeroName] = useState(profile.name);
  const [editHeroTitle, setEditHeroTitle] = useState(profile.title);
  const [editHeroBio, setEditHeroBio] = useState(profile.bio);

  // Quick Add Link Modal for Admin
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkType, setNewLinkType] = useState<'website' | 'drive'>('website');
  const [newLinkCategory, setNewLinkCategory] = useState<'teroka' | 'penyelidikan' | 'pengajaran' | 'inovasi' | 'quicklink'>('teroka');
  const [newLinkBadge, setNewLinkBadge] = useState('');
  const [newLinkDesc, setNewLinkDesc] = useState('');

  const loadData = () => {
    const p = getAdminProfile();
    setProfile(p);
    setEditHeroName(p.name);
    setEditHeroTitle(p.title);
    setEditHeroBio(p.bio);
    setLatestInno(getAdminInnovations());
    setNavLinks(getAdminNavLinks());
  };

  useEffect(() => {
    loadData();
    const unsub = subscribeToAdminData(() => {
      loadData();
    });
    return () => unsub();
  }, []);

  const whatsappUrl = `https://wa.me/60194090902?text=${encodeURIComponent(
    'Salam En. Nasrul Effendy, saya ingin berhubung berkenaan kolaborasi/jemputan ceramah/inovasi TVET.'
  )}`;

  const scrollToCV = () => {
    const el = document.getElementById('cv-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('cv');
    }
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminProfile({
      name: editHeroName,
      title: editHeroTitle,
      bio: editHeroBio,
    });
    setIsHeroEditOpen(false);
  };

  const handleCreateQuickLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle || !newLinkUrl) return;

    addAdminNavLink({
      title: newLinkTitle.trim(),
      url: newLinkUrl.trim(),
      type: newLinkType,
      category: newLinkCategory,
      description: newLinkDesc.trim() || undefined,
      badge: newLinkBadge.trim() || (newLinkType === 'drive' ? 'Google Drive' : 'Website'),
    });

    setIsAddLinkModalOpen(false);
    setNewLinkTitle('');
    setNewLinkUrl('');
    setNewLinkDesc('');
    setNewLinkBadge('');
  };

  const handleDeleteLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Adakah anda pasti ingin memadam pautan navigasi ini?')) {
      deleteAdminNavLink(id);
    }
  };

  const filteredLinks = navLinks.filter(l => {
    if (selectedNavFilter === 'all') return true;
    if (selectedNavFilter === 'drive') return l.type === 'drive';
    if (selectedNavFilter === 'website') return l.type === 'website';
    return l.category === selectedNavFilter;
  });

  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* =========================================================================
          HERO SECTION (Matching Screenshot 1 of amirulhelmi.my)
          ========================================================================= */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 sm:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Big Bold Typography & Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Gold Category Eyebrow */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold tracking-widest text-amber-600 uppercase">
                    PENSYARAH • JABATAN TEKNOLOGI MAKLUMAT & KOMUNIKASI • PTSS
                  </span>
                </div>

                {/* Inline Edit for Admin */}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => setIsHeroEditOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    title="Sunting Tajuk & Biodata Hero"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Sunting Hero</span>
                  </button>
                )}
              </div>

              {/* Massive 3-line Editorial Display Heading matching Screenshot 1 */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0c1f38] tracking-tight leading-[1.05]">
                Nasrul<br />
                Effendy<br />
                Bin Mat Nasir
              </h1>

              {/* Subheading with bullet separators matching Screenshot 1 */}
              <p className="text-slate-900 font-bold text-sm sm:text-base flex flex-wrap items-center gap-2">
                <span>Senior Lecturer</span>
                <span className="text-amber-500 font-black">•</span>
                <span>TVET Researcher</span>
                <span className="text-amber-500 font-black">•</span>
                <span>SISPEN3K Digital Innovator</span>
                <span className="text-amber-500 font-black">•</span>
                <span>System Consultant</span>
              </p>

              {/* Bio description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                {profile.bio ||
                  'Pensyarah Kanan dan penyelidik di Politeknik Tuanku Syed Sirajuddin (PTSS) dengan fokus merentas teknologi maklumat, keselamatan siber, inovasi digital TVET (SISPEN3K, iPMAS, IAS, iCERT), pembangunan web & platform, e-pembelajaran, dan sistem data pintar.'}
              </p>

              {/* Action Buttons matching Screenshot 1: [Lihat CV Lengkap] [Teroka Penyelidikan] */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToCV}
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#0a1e36] hover:bg-[#071628] shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Lihat CV Lengkap</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('publications')}
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <span>Teroka Penyelidikan</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => onNavigate('admin')}
                    className="px-4 py-3.5 rounded-xl text-sm font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 shadow-sm transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-slate-950" />
                    <span>Panel Pentadbir</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Portrait Photo Visual matching Screenshot 1 */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <AvatarDisplay size="hero" allowUpload={isAdmin} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MARQUEE TICKER (Matching amirulhelmi.my)
          ========================================================================= */}
      <section className="bg-[#0c1f38] text-white py-3 border-y border-slate-800 overflow-hidden shadow-inner">
        <div className="animate-ticker flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-300 whitespace-nowrap">
          <span>Cybersecurity Fundamentals</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>Network & Data Communication</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>TVET 360° & Lifelong Learning</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>SISPEN3K Sistem Kemahiran Kelana</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>Creative AI & ChatGPT Heroes</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>Google Workspace & Cloud Automation</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>CIDB Malaysia Certified Trainer</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>Persekutuan Pengakap Malaysia</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>iPMAS Intelligent Paperwork System</span>
          <i className="text-amber-400 not-italic">✦</i>
          {/* Duplicate set for seamless infinite loop */}
          <span>Cybersecurity Fundamentals</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>Network & Data Communication</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>TVET 360° & Lifelong Learning</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>SISPEN3K Sistem Kemahiran Kelana</span>
          <i className="text-amber-400 not-italic">✦</i>
        </div>
      </section>

      {/* =========================================================================
          KEY STATS / HIGHLIGHTS SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center hover:shadow-md transition-all">
            <span className="text-3xl sm:text-4xl font-black text-[#0c1f38]">20+</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-1">
              Tahun Pengalaman TVET
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center hover:shadow-md transition-all">
            <span className="text-3xl sm:text-4xl font-black text-amber-600">5+</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-1">
              Sistem Inovasi Digital
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center hover:shadow-md transition-all">
            <span className="text-3xl sm:text-4xl font-black text-[#0c1f38]">12+</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-1">
              Penerbitan Ilmiah & Buku
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center hover:shadow-md transition-all">
            <span className="text-3xl sm:text-4xl font-black text-blue-700">2x</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-1">
              Anugerah APC (2008 & 2015)
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 06 / CURRICULUM VITAE: CV INFOGRAFIK LENGKAP (Matching Screenshot 2)
          ========================================================================= */}
      <CVInfographicSection onOpenPDF={() => onNavigate('cv')} />

      {/* =========================================================================
          FEATURED INOVASI SECTION (Highlighting SISPEN3K, iPMAS, IAS, iCERT)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
              PROJEK INOVASI DIGITAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1f38] tracking-tight">
              Inovasi Digital & TVET Unggul
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            {isAdmin && (
              <button
                type="button"
                onClick={() => onNavigate('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Inovasi (Admin)</span>
              </button>
            )}
            <button
              onClick={() => onNavigate('innovations')}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Lihat Semua Inovasi ({latestInno.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestInno.map(inno => (
            <div
              key={inno.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-800 font-black text-xs rounded-lg border border-amber-500/20">
                    {inno.acronym}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      {inno.year}
                    </span>
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => onNavigate('admin')}
                        className="p-1 rounded-md text-slate-400 hover:text-amber-600 hover:bg-slate-100 cursor-pointer"
                        title="Sunting Inovasi ini di Panel Pentadbir"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                  {inno.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-1 mb-3">
                  {inno.category}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {inno.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  {inno.features.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  Status: {inno.status}
                </span>
                <div className="flex items-center gap-2">
                  {inno.driveUrl && (
                    <a
                      href={inno.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Buka Folder Google Drive"
                    >
                      <HardDrive className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {inno.websiteUrl && (
                    <a
                      href={inno.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                      title="Buka Laman Web Inovasi"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => onNavigate('innovations')}
                    className="text-xs font-bold text-[#0c1f38] hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Terperinci</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          NAVIGATION LINKS SECTION: "Pautan Navigasi Luar & Google Drive"
          Directly satisfies user prompt: "masukkan link navigation ke website/drive"
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                PAUTAN RASMI & STORAN AWAN
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1f38] tracking-tight">
              Pautan Navigasi Luar & Google Drive
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Akses terus ke laman web luar, repositori Google Drive, sistem TVET, dan pangkalan penyelidikan rasmi.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            {isAdmin && (
              <button
                type="button"
                onClick={() => setIsAddLinkModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0c1f38] hover:bg-blue-950 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer hover:scale-102"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>+ Masukkan Pautan Navigasi</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 text-xs font-bold scrollbar-none">
          {[
            { id: 'all', label: `Semua Pautan (${navLinks.length})` },
            { id: 'drive', label: 'Google Drive' },
            { id: 'website', label: 'Laman Web' },
            { id: 'inovasi', label: 'Inovasi' },
            { id: 'penyelidikan', label: 'Penyelidikan' },
            { id: 'pengajaran', label: 'Pengajaran & LMS' },
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedNavFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedNavFilter === f.id
                  ? 'bg-[#0c1f38] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Navigation Link Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLinks.map(link => (
            <div
              key={link.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        link.type === 'drive'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {link.type === 'drive' ? (
                        <HardDrive className="w-4 h-4" />
                      ) : (
                        <Globe className="w-4 h-4" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        link.type === 'drive'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {link.badge || (link.type === 'drive' ? 'Google Drive' : 'Website')}
                    </span>
                  </div>

                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={e => handleDeleteLink(link.id, e)}
                        className="p-1 rounded-md text-red-400 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                        title="Padam Pautan Ini (Admin)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-700 transition-colors">
                  {link.title}
                </h3>

                {link.description && (
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                    {link.description}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">
                  {link.url.replace(/^https?:\/\//, '')}
                </span>

                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer"
                >
                  <span>Buka Pautan</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          TEROKA HUB CONNECTIVITY CARDS (Google Drive & Safe Navigation)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0c1f38] to-[#122e54] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
              TEROKA PORTAL & INTEGRASI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Pusat Dokumen Google Drive & Repositori Akademik
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Akses pantas fail kurikulum, slaid pengajaran, dan dokumen rasmi menggunakan integrasi Google Drive v3 secara langsung, atau semak penerbitan ilmiah terkini.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('drive')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2.5 cursor-pointer hover:scale-102"
              >
                <HardDrive className="w-4 h-4" />
                <span>Buka Google Drive Portal</span>
              </button>

              <button
                onClick={() => onNavigate('publications')}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2.5 cursor-pointer hover:scale-102"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Repositori & Penerbitan</span>
              </button>

              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2.5 cursor-pointer hover:scale-102 shadow-lg"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Panel Pentadbir (CRUD & Navigasi)</span>
                </button>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2.5 cursor-pointer hover:scale-102"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Rasmi</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ADMIN QUICK HERO EDIT MODAL
          ========================================================================= */}
      {isHeroEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="font-extrabold text-slate-900 text-lg">Sunting Maklumat Hero & Biodata</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsHeroEditOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHero} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Penuh</label>
                <input
                  type="text"
                  required
                  value={editHeroName}
                  onChange={e => setEditHeroName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jawatan Rasmi</label>
                <input
                  type="text"
                  required
                  value={editHeroTitle}
                  onChange={e => setEditHeroTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Keterangan Ringkas (Bio Hero)</label>
                <textarea
                  rows={4}
                  required
                  value={editHeroBio}
                  onChange={e => setEditHeroBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsHeroEditOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0c1f38] hover:bg-blue-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-amber-400" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADMIN QUICK ADD NAVIGATION LINK MODAL
          ========================================================================= */}
      {isAddLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-extrabold text-slate-900 text-lg">Masukkan Link Navigation (Website / Drive)</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddLinkModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuickLink} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tajuk / Nama Pautan *</label>
                <input
                  type="text"
                  required
                  placeholder="Cth: Folder Modul Google Drive / Portal SISPEN3K"
                  value={newLinkTitle}
                  onChange={e => setNewLinkTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Destinasi *</label>
                  <select
                    value={newLinkType}
                    onChange={e => setNewLinkType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-hidden"
                  >
                    <option value="website">🌐 Laman Web Luar / URL</option>
                    <option value="drive">📁 Google Drive (Folder / Fail)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Navigasi</label>
                  <select
                    value={newLinkCategory}
                    onChange={e => setNewLinkCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-hidden"
                  >
                    <option value="teroka">Teroka Portal</option>
                    <option value="inovasi">Inovasi TVET</option>
                    <option value="penyelidikan">Penyelidikan & Penerbitan</option>
                    <option value="pengajaran">Pengajaran & LMS</option>
                    <option value="quicklink">Pautan Pantas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Pautan (https://...) *</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/... atau https://..."
                  value={newLinkUrl}
                  onChange={e => setNewLinkUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-hidden font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teks Lencana (Badge)</label>
                  <input
                    type="text"
                    placeholder="Cth: Google Drive / Live Web App"
                    value={newLinkBadge}
                    onChange={e => setNewLinkBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Keterangan Ringkas</label>
                  <input
                    type="text"
                    placeholder="Keterangan dokumen/laman"
                    value={newLinkDesc}
                    onChange={e => setNewLinkDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddLinkModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Simpan Pautan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
