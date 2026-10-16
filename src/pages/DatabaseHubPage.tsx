import React, { useState, useEffect } from 'react';
import {
  Database,
  Plus,
  Trash2,
  Edit2,
  Search,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Clock,
  Archive,
  Layers,
  Sparkles,
  ExternalLink,
  Filter,
  FileCode,
  HardDrive,
  Globe,
  Link as LinkIcon,
  BookOpen,
  Lightbulb,
  GraduationCap,
  X,
  AlertTriangle,
  FolderOpen,
  LogOut,
  Key,
  ShieldCheck,
  User,
  Save,
} from 'lucide-react';
import {
  PublicationItem,
  InnovationProject,
  TeachingCourse,
  NavigationLink,
} from '../types';
import {
  getAdminPublications,
  addAdminPublication,
  updateAdminPublication,
  deleteAdminPublication,
  getAdminInnovations,
  addAdminInnovation,
  updateAdminInnovation,
  deleteAdminInnovation,
  getAdminCourses,
  addAdminCourse,
  updateAdminCourse,
  deleteAdminCourse,
  getAdminNavLinks,
  addAdminNavLink,
  updateAdminNavLink,
  deleteAdminNavLink,
  getAdminProfile,
  updateAdminProfile,
  subscribeToAdminData,
  exportAllAdminDataJSON,
  importAllAdminDataJSON,
  resetAllAdminDataToDefault,
} from '../services/adminDataService';
import {
  isAdminLoggedIn,
  logoutAdmin,
  subscribeToAdminAuth,
  changeAdminPassword,
} from '../services/adminAuthService';
import { AdminLoginCard } from '../components/AdminLoginCard';
import { ConfirmModal } from '../components/ConfirmModal';

type AdminTab = 'publications' | 'innovations' | 'courses' | 'navlinks' | 'profile';

export const DatabaseHubPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminLoggedIn());
  const [currentTab, setCurrentTab] = useState<AdminTab>('publications');
  const [search, setSearch] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Data states
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [innovations, setInnovations] = useState<InnovationProject[]>([]);
  const [courses, setCourses] = useState<TeachingCourse[]>([]);
  const [navLinks, setNavLinks] = useState<NavigationLink[]>([]);
  const [profile, setProfile] = useState(getAdminProfile());

  // Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Modals & form state
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Common Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formWebsiteUrl, setFormWebsiteUrl] = useState('');
  const [formDriveUrl, setFormDriveUrl] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formStatus, setFormStatus] = useState<string>('Active');

  // Profile Form State
  const [profileName, setProfileName] = useState(profile.name);
  const [profileGrade, setProfileGrade] = useState(profile.grade);
  const [profileTitle, setProfileTitle] = useState(profile.title);
  const [profileDept, setProfileDept] = useState(profile.department);
  const [profilePhone, setProfilePhone] = useState(profile.phone);
  const [profileEmail, setProfileEmail] = useState(profile.emailPTSS);
  const [profileBio, setProfileBio] = useState(profile.bio);

  // Confirmation Modal
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string; tab: AdminTab } | null>(null);

  const loadAll = () => {
    setPublications(getAdminPublications());
    setInnovations(getAdminInnovations());
    setCourses(getAdminCourses());
    setNavLinks(getAdminNavLinks());
    const p = getAdminProfile();
    setProfile(p);
    setProfileName(p.name);
    setProfileGrade(p.grade);
    setProfileTitle(p.title);
    setProfileDept(p.department);
    setProfilePhone(p.phone);
    setProfileEmail(p.emailPTSS);
    setProfileBio(p.bio);
  };

  useEffect(() => {
    setIsAuthenticated(isAdminLoggedIn());
    loadAll();

    const unsubAuth = subscribeToAdminAuth(auth => {
      setIsAuthenticated(auth);
    });

    const unsubData = subscribeToAdminData(() => {
      loadAll();
    });

    return () => {
      unsubAuth();
      unsubData();
    };
  }, []);

  const notify = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleLogout = () => {
    logoutAdmin();
    notify('🚪 Anda telah log keluar dari Portal Kandungan.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      alert('Kata laluan sekurang-kurangnya 4 aksara.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Pengesahan kata laluan tidak sepadan.');
      return;
    }
    changeAdminPassword(newPassword);
    setIsPasswordModalOpen(false);
    setNewPassword('');
    setConfirmPassword('');
    notify('🔑 Kata laluan pentadbir berjaya dikemaskini!');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminProfile({
      name: profileName,
      grade: profileGrade,
      title: profileTitle,
      department: profileDept,
      phone: profilePhone,
      emailPTSS: profileEmail,
      bio: profileBio,
    });
    notify('✅ Maklumat profil dan laman berjaya disimpan!');
  };

  // Open Modal for Create
  const handleOpenAdd = () => {
    setModalMode('add');
    setActiveItemId(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormCategory(
      currentTab === 'publications'
        ? 'Journal'
        : currentTab === 'innovations'
        ? 'Sistem Pintar AI & Pengurusan Institusi'
        : currentTab === 'courses'
        ? 'Diploma Teknologi Maklumat'
        : 'penyelidikan'
    );
    setFormDescription('');
    setFormWebsiteUrl('');
    setFormDriveUrl('');
    setFormTags('');
    setFormStatus('Active');
    setIsAddEditModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (item: any) => {
    setModalMode('edit');
    setActiveItemId(item.id);

    if (currentTab === 'publications') {
      const pub = item as PublicationItem;
      setFormTitle(pub.title);
      setFormSubtitle(pub.year);
      setFormCategory(pub.type);
      setFormDescription(pub.summary);
      setFormWebsiteUrl(pub.websiteUrl || pub.doi || '');
      setFormDriveUrl(pub.driveUrl || '');
      setFormTags(pub.tags?.join(', ') || '');
    } else if (currentTab === 'innovations') {
      const inv = item as InnovationProject;
      setFormTitle(inv.title);
      setFormSubtitle(inv.acronym);
      setFormCategory(inv.category);
      setFormDescription(inv.description);
      setFormWebsiteUrl(inv.websiteUrl || '');
      setFormDriveUrl(inv.driveUrl || '');
      setFormTags(inv.features?.join(', ') || '');
      setFormStatus(inv.status);
    } else if (currentTab === 'courses') {
      const crs = item as TeachingCourse;
      setFormTitle(crs.name);
      setFormSubtitle(crs.code);
      setFormCategory(crs.level);
      setFormDescription(crs.description);
      setFormWebsiteUrl(crs.websiteUrl || '');
      setFormDriveUrl(crs.driveUrl || '');
      setFormTags(crs.tags?.join(', ') || '');
    } else if (currentTab === 'navlinks') {
      const nav = item as NavigationLink;
      setFormTitle(nav.title);
      setFormSubtitle(nav.badge || '');
      setFormCategory(nav.category);
      setFormDescription(nav.description || '');
      setFormWebsiteUrl(nav.type === 'website' ? nav.url : '');
      setFormDriveUrl(nav.type === 'drive' ? nav.url : '');
      setFormTags('');
    }

    setIsAddEditModalOpen(true);
  };

  // Save Add/Edit
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Sila masukkan tajuk rekod.');
      return;
    }

    const tagList = formTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (currentTab === 'publications') {
      if (modalMode === 'add') {
        addAdminPublication({
          title: formTitle.trim(),
          year: formSubtitle.trim() || new Date().getFullYear().toString(),
          type: (formCategory as any) || 'Journal',
          summary: formDescription.trim(),
          tags: tagList,
          venue: 'Penerbitan Rasmi PTSS / Jurnal Berwasit',
          websiteUrl: formWebsiteUrl.trim() || undefined,
          driveUrl: formDriveUrl.trim() || undefined,
        });
        notify('✅ Penerbitan baharu berjaya ditambah bersama pautan Website/Drive!');
      } else if (activeItemId) {
        updateAdminPublication(activeItemId, {
          title: formTitle.trim(),
          year: formSubtitle.trim(),
          type: formCategory as any,
          summary: formDescription.trim(),
          tags: tagList,
          websiteUrl: formWebsiteUrl.trim() || undefined,
          driveUrl: formDriveUrl.trim() || undefined,
        });
        notify('✅ Penerbitan berjaya dikemaskini!');
      }
    } else if (currentTab === 'innovations') {
      if (modalMode === 'add') {
        addAdminInnovation({
          title: formTitle.trim(),
          acronym: formSubtitle.trim() || 'INOVASI',
          year: new Date().getFullYear().toString(),
          category: formCategory.trim() || 'Sistem Pintar AI',
          description: formDescription.trim(),
          features: tagList.length > 0 ? tagList : ['Pembangunan digital pintar', 'Pengurusan bersepadu TVET'],
          status: (formStatus as any) || 'Active',
          iconName: 'Sparkles',
          websiteUrl: formWebsiteUrl.trim() || undefined,
          driveUrl: formDriveUrl.trim() || undefined,
        });
        notify('✅ Projek inovasi baharu berjaya disimpan!');
      } else if (activeItemId) {
        updateAdminInnovation(activeItemId, {
          title: formTitle.trim(),
          acronym: formSubtitle.trim(),
          category: formCategory.trim(),
          description: formDescription.trim(),
          features: tagList.length > 0 ? tagList : undefined,
          status: formStatus as any,
          websiteUrl: formWebsiteUrl.trim() || undefined,
          driveUrl: formDriveUrl.trim() || undefined,
        });
        notify('✅ Projek inovasi berjaya dikemaskini!');
      }
    } else if (currentTab === 'courses') {
      if (modalMode === 'add') {
        addAdminCourse({
          name: formTitle.trim(),
          code: formSubtitle.trim().toUpperCase() || 'DFC0000',
          level: formCategory.trim() || 'Diploma Teknologi Maklumat',
          description: formDescription.trim(),
          tags: tagList,
          materialsCount: 12,
          websiteUrl: formWebsiteUrl.trim() || undefined,
          driveUrl: formDriveUrl.trim() || undefined,
        });
        notify('✅ Kursus pengajaran baharu berjaya ditambah!');
      } else if (activeItemId) {
        updateAdminCourse(activeItemId, {
          name: formTitle.trim(),
          code: formSubtitle.trim().toUpperCase(),
          level: formCategory.trim(),
          description: formDescription.trim(),
          tags: tagList,
          websiteUrl: formWebsiteUrl.trim() || undefined,
          driveUrl: formDriveUrl.trim() || undefined,
        });
        notify('✅ Kursus pengajaran berjaya dikemaskini!');
      }
    } else if (currentTab === 'navlinks') {
      const url = formDriveUrl.trim() || formWebsiteUrl.trim() || '#';
      const type = formDriveUrl.trim() ? 'drive' : 'website';

      if (modalMode === 'add') {
        addAdminNavLink({
          title: formTitle.trim(),
          url,
          type,
          category: (formCategory as any) || 'penyelidikan',
          description: formDescription.trim(),
          badge: formSubtitle.trim() || (type === 'drive' ? 'Google Drive' : 'Website'),
        });
        notify('✅ Pautan navigasi/Drive baharu berjaya disimpan!');
      } else if (activeItemId) {
        updateAdminNavLink(activeItemId, {
          title: formTitle.trim(),
          url,
          type,
          category: formCategory as any,
          description: formDescription.trim(),
          badge: formSubtitle.trim(),
        });
        notify('✅ Pautan navigasi berjaya dikemaskini!');
      }
    }

    setIsAddEditModalOpen(false);
  };

  // Delete Action with Confirmation
  const promptDelete = (id: string, title: string) => {
    setDeleteTarget({ id, title, tab: currentTab });
    setConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.tab === 'publications') {
      deleteAdminPublication(deleteTarget.id);
      notify('🗑️ Penerbitan berjaya dipadam.');
    } else if (deleteTarget.tab === 'innovations') {
      deleteAdminInnovation(deleteTarget.id);
      notify('🗑️ Inovasi berjaya dipadam.');
    } else if (deleteTarget.tab === 'courses') {
      deleteAdminCourse(deleteTarget.id);
      notify('🗑️ Kursus berjaya dipadam.');
    } else if (deleteTarget.tab === 'navlinks') {
      deleteAdminNavLink(deleteTarget.id);
      notify('🗑️ Pautan navigasi berjaya dipadam.');
    }

    setConfirmModalOpen(false);
    setDeleteTarget(null);
  };

  // Filtered Lists
  const q = search.toLowerCase();
  const filteredPubs = publications.filter(
    p =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.year.includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
  );

  const filteredInno = innovations.filter(
    i =>
      i.title.toLowerCase().includes(q) ||
      i.acronym.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
  );

  const filteredCourses = courses.filter(
    c =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
  );

  const filteredNavLinks = navLinks.filter(
    n =>
      n.title.toLowerCase().includes(q) ||
      n.url.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q)
  );

  // If NOT authenticated, render the exact Content Portal login card
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center bg-slate-50/50 py-12 px-4">
        <AdminLoginCard onSuccess={() => setIsAuthenticated(true)} />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
            window.location.reload();
          }}
          className="mt-4 text-xs font-semibold text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer"
        >
          ← Kembali ke Laman Utama
        </a>
      </div>
    );
  }

  // If AUTHENTICATED: Full secure Admin Portal with CRUD and Link controls
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Security Status Bar */}
      <div className="bg-[#0a1e36] text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-blue-900/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] tracking-widest px-3 py-1 rounded-full uppercase">
              CONTENT PORTAL • ADMIN MODE
            </span>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Akses Selamat Aktif</span>
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Portal Kandungan — {profile.name}
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Anda boleh mengedit penerbitan, inovasi (SISPEN3K), kursus JTMK, serta memasukkan pautan Google Drive dan laman web secara langsung.
          </p>
        </div>

        {/* Admin Header Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Item</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>Tukar Password</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3.5 py-2.5 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/60 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Keluar</span>
          </button>
        </div>
      </div>

      {/* Floating Status Notification */}
      {statusMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-3 rounded-xl shadow-sm flex items-center justify-between animate-in fade-in">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => {
            setCurrentTab('publications');
            setSearch('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === 'publications'
              ? 'bg-[#0c1f38] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Penerbitan ({publications.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentTab('innovations');
            setSearch('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === 'innovations'
              ? 'bg-[#0c1f38] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Inovasi (SISPEN3K) ({innovations.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentTab('courses');
            setSearch('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === 'courses'
              ? 'bg-[#0c1f38] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-blue-400" />
          <span>Kursus JTMK ({courses.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentTab('navlinks');
            setSearch('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === 'navlinks'
              ? 'bg-[#0c1f38] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <LinkIcon className="w-4 h-4 text-purple-400" />
          <span>Pautan Navigasi & Drive ({navLinks.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentTab('profile');
            setSearch('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === 'profile'
              ? 'bg-[#0c1f38] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <User className="w-4 h-4 text-amber-400" />
          <span>Maklumat Profil & Laman</span>
        </button>
      </div>

      {/* Search Filter Bar (for tabs other than profile) */}
      {currentTab !== 'profile' && (
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari rekod..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 shadow-2xs"
            />
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah rekod ke bahagian ini</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          TAB 1: PUBLICATIONS CRUD
          ========================================================================= */}
      {currentTab === 'publications' && (
        <div className="space-y-4">
          {filteredPubs.map(pub => (
            <div
              key={pub.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    {pub.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                    {pub.type}
                  </span>
                  {pub.venue && (
                    <span className="text-xs text-slate-500 font-medium line-clamp-1">
                      • {pub.venue}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {pub.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {pub.summary}
                </p>

                {/* Attached Links Badge & Action Bar */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {pub.driveUrl ? (
                    <a
                      href={pub.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-lg text-xs font-bold transition-colors"
                    >
                      <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                      <span>Google Drive Manuskrip</span>
                      <ExternalLink className="w-3 h-3 text-amber-500 ml-0.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <HardDrive className="w-3 h-3" />
                      <span>Tiada link Drive</span>
                    </span>
                  )}

                  {pub.websiteUrl ? (
                    <a
                      href={pub.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200/80 rounded-lg text-xs font-bold transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      <span>Link Laman Web / DOI</span>
                      <ExternalLink className="w-3 h-3 text-blue-500 ml-0.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>Tiada link Web</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons: Edit / Delete */}
              <div className="flex items-center gap-2 pt-2 md:pt-0 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(pub)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Edit & Link</span>
                </button>

                <button
                  type="button"
                  onClick={() => promptDelete(pub.id, pub.title)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          TAB 2: INNOVATIONS CRUD (SISPEN3K, iPMAS)
          ========================================================================= */}
      {currentTab === 'innovations' && (
        <div className="space-y-4">
          {filteredInno.map(inv => (
            <div
              key={inv.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-black">
                    {inv.acronym}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {inv.year}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                    {inv.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {inv.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">{inv.category}</p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {inv.description}
                </p>

                {/* Links */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {inv.driveUrl ? (
                    <a
                      href={inv.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-lg text-xs font-bold transition-colors"
                    >
                      <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                      <span>Dokumentasi Google Drive</span>
                      <ExternalLink className="w-3 h-3 text-amber-500 ml-0.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <HardDrive className="w-3 h-3" />
                      <span>Tiada link Drive</span>
                    </span>
                  )}

                  {inv.websiteUrl ? (
                    <a
                      href={inv.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200/80 rounded-lg text-xs font-bold transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      <span>Pautan Sistem (Live Web App)</span>
                      <ExternalLink className="w-3 h-3 text-blue-500 ml-0.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>Tiada link Web</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 md:pt-0 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(inv)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Edit & Link</span>
                </button>

                <button
                  type="button"
                  onClick={() => promptDelete(inv.id, `${inv.acronym} - ${inv.title}`)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          TAB 3: COURSES CRUD
          ========================================================================= */}
      {currentTab === 'courses' && (
        <div className="space-y-4">
          {filteredCourses.map(crs => (
            <div
              key={crs.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-900 text-xs font-mono font-bold border border-blue-200">
                    {crs.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {crs.level}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {crs.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {crs.description}
                </p>

                {/* Course links */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {crs.driveUrl ? (
                    <a
                      href={crs.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-lg text-xs font-bold transition-colors"
                    >
                      <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                      <span>Folder Bahan Kuliah di Drive</span>
                      <ExternalLink className="w-3 h-3 text-amber-500 ml-0.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <HardDrive className="w-3 h-3" />
                      <span>Tiada link Drive</span>
                    </span>
                  )}

                  {crs.websiteUrl ? (
                    <a
                      href={crs.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200/80 rounded-lg text-xs font-bold transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      <span>Portal e-Learning Kursus</span>
                      <ExternalLink className="w-3 h-3 text-blue-500 ml-0.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>Tiada link Web</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 md:pt-0 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(crs)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Edit & Link</span>
                </button>

                <button
                  type="button"
                  onClick={() => promptDelete(crs.id, `${crs.code} - ${crs.name}`)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          TAB 4: NAVIGATION & DRIVE LINKS
          ========================================================================= */}
      {currentTab === 'navlinks' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNavLinks.map(nav => (
              <div
                key={nav.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      Kategori: {nav.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {nav.type === 'drive' ? 'Google Drive' : 'Website'}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {nav.title}
                  </h3>

                  {nav.description && (
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {nav.description}
                    </p>
                  )}

                  <div className="pt-2">
                    <a
                      href={nav.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:underline font-mono truncate max-w-full"
                    >
                      <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{nav.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {nav.badge || 'Pautan Rasmi'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(nav)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-blue-600" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => promptDelete(nav.id, nav.title)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: PROFILE & PAGE DETAILS EDIT
          ========================================================================= */}
      {currentTab === 'profile' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              PENGURUSAN HALAMAN & MAKLUMAT PERIBADI
            </span>
            <h2 className="text-xl font-bold text-[#0c1f38] mt-1">
              Edit Maklumat Laman & Profil Eksekutif
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sebarang perubahan di sini akan dikemaskini pada Laman Utama, Profil, dan Header/Footer.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Penuh
                </label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Gred Perkhidmatan
                </label>
                <input
                  type="text"
                  value={profileGrade}
                  onChange={e => setProfileGrade(e.target.value)}
                  placeholder="DH12"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Jawatan Rasmi
                </label>
                <input
                  type="text"
                  value={profileTitle}
                  onChange={e => setProfileTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Jabatan / Bahagian
                </label>
                <input
                  type="text"
                  value={profileDept}
                  onChange={e => setProfileDept(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nombor Telefon (WhatsApp)
                </label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={e => setProfilePhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Emel Rasmi
                </label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={e => setProfileEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Penerangan Bio / Ringkasan Eksekutif
              </label>
              <textarea
                rows={4}
                value={profileBio}
                onChange={e => setProfileBio(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0a1e36] hover:bg-[#071628] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>Simpan Maklumat Profil</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT MODAL FORM
          ========================================================================= */}
      {isAddEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
            <button
              onClick={() => setIsAddEditModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                {modalMode === 'add' ? 'TAMBAH REKOD BAHARU' : 'EDIT REKOD & PAUTAN'}
              </span>
            </div>
            <h3 className="text-xl font-black text-[#0c1f38] mb-4">
              {modalMode === 'add'
                ? `Tambah ke ${
                    currentTab === 'publications'
                      ? 'Penerbitan'
                      : currentTab === 'innovations'
                      ? 'Inovasi'
                      : currentTab === 'courses'
                      ? 'Kursus'
                      : 'Pautan Navigasi'
                  }`
                : `Kemaskini Rekod: ${formTitle}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {currentTab === 'courses'
                    ? 'Nama Kursus'
                    : currentTab === 'innovations'
                    ? 'Nama Sistem Inovasi'
                    : 'Tajuk / Nama'}
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="Masukkan tajuk"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {currentTab === 'courses'
                      ? 'Kod Kursus'
                      : currentTab === 'innovations'
                      ? 'Akronim Inovasi'
                      : currentTab === 'publications'
                      ? 'Tahun Penerbitan'
                      : 'Label Lencana'}
                  </label>
                  <input
                    type="text"
                    value={formSubtitle}
                    onChange={e => setFormSubtitle(e.target.value)}
                    placeholder="Cth: DFC40233 / SISPEN3K / 2026"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kategori / Tahap
                  </label>
                  {currentTab === 'publications' ? (
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Journal">Jurnal Berwasit</option>
                      <option value="Conference Paper">Kertas Persidangan</option>
                      <option value="Book">Buku Teks / Modul</option>
                      <option value="Ebook">E-Buku</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value)}
                      placeholder="Cth: Diploma Teknologi Maklumat"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-500"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Penerangan / Ringkasan Eksekutif
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Ringkasan objektif, impak, atau kandungan..."
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                />
              </div>

              {/* Website & Drive Link Inputs */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-extrabold text-amber-900 uppercase">
                    Pautan Navigasi ke Website & Google Drive
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pautan Google Drive (Fail / Folder Dokumen)</span>
                    </label>
                    {formDriveUrl && (
                      <a
                        href={formDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Uji Pautan</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <input
                    type="url"
                    value={formDriveUrl}
                    onChange={e => setFormDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      <span>Pautan Laman Web / Aplikasi (Live Website / DOI)</span>
                    </label>
                    {formWebsiteUrl && (
                      <a
                        href={formWebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Uji Pautan</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <input
                    type="url"
                    value={formWebsiteUrl}
                    onChange={e => setFormWebsiteUrl(e.target.value)}
                    placeholder="https://ptss.edu.my/..."
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Kata Kunci / Tag (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={e => setFormTags(e.target.value)}
                  placeholder="Cth: AI, Networking, PTSS, SISPEN3K"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddEditModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0a1e36] hover:bg-[#071628] rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{modalMode === 'add' ? 'Simpan Rekod Baharu' : 'Simpan Kemaskini'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              KESELAMATAN PENTADBIR
            </span>
            <h3 className="text-xl font-black text-[#0c1f38] mb-4">
              Tukar Kata Laluan Admin
            </h3>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Kata Laluan Baharu
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Sekurang-kurangnya 4 aksara"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Sahkan Kata Laluan Baharu
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Ulang kata laluan baharu"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0a1e36] hover:bg-[#071628] rounded-xl shadow-md"
                >
                  Simpan Kata Laluan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Delete */}
      <ConfirmModal
        isOpen={confirmModalOpen}
        title="Sahkan Pemadaman Rekod"
        message={`Adakah anda pasti ingin memadamkan "${deleteTarget?.title}"? Tindakan ini akan mengalih keluar rekod serta pautan navigasi yang berkaitan.`}
        confirmLabel="Ya, Padam Rekod"
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModalOpen(false)}
      />
    </div>
  );
};
