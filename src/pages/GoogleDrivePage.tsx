import React, { useState, useEffect } from 'react';
import {
  HardDrive,
  Folder,
  FileText,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  Edit2,
  Copy,
  Check,
  FolderOpen,
  Sparkles,
  ShieldCheck,
  X,
  Save,
  Layers,
  FileCode,
  BookOpen,
  Lightbulb,
} from 'lucide-react';
import { NavigationLink, PageId } from '../types';
import {
  getAdminNavLinks,
  addAdminNavLink,
  updateAdminNavLink,
  deleteAdminNavLink,
  subscribeToAdminData,
} from '../services/adminDataService';
import { isAdminLoggedIn, subscribeToAdminAuth } from '../services/adminAuthService';

interface GoogleDrivePageProps {
  onNavigate?: (page: PageId) => void;
  isAdmin?: boolean;
}

export const GoogleDrivePage: React.FC<GoogleDrivePageProps> = ({
  onNavigate,
  isAdmin: propsIsAdmin,
}) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(propsIsAdmin ?? isAdminLoggedIn());
  const [driveLinks, setDriveLinks] = useState<NavigationLink[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal State for Adding/Editing Google Drive Links
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [activeLinkId, setActiveLinkId] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formCategory, setFormCategory] = useState<NavigationLink['category']>('teroka');
  const [formBadge, setFormBadge] = useState('Google Drive');
  const [formDescription, setFormDescription] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const loadLinks = () => {
    // Show links of type 'drive' or any navigation link designated for cloud/resources
    const all = getAdminNavLinks();
    const driveOnly = all.filter(l => l.type === 'drive' || l.url.includes('drive.google.com'));
    // If none found with 'drive', fallback to all links
    setDriveLinks(driveOnly.length > 0 ? driveOnly : all);
  };

  useEffect(() => {
    loadLinks();
    setIsAdmin(propsIsAdmin ?? isAdminLoggedIn());

    const unsubData = subscribeToAdminData(() => {
      loadLinks();
    });
    const unsubAuth = subscribeToAdminAuth(auth => {
      setIsAdmin(auth);
    });

    return () => {
      unsubData();
      unsubAuth();
    };
  }, [propsIsAdmin]);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setActiveLinkId(null);
    setFormTitle('');
    setFormUrl('');
    setFormCategory('teroka');
    setFormBadge('Google Drive');
    setFormDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (link: NavigationLink) => {
    setModalMode('edit');
    setActiveLinkId(link.id);
    setFormTitle(link.title);
    setFormUrl(link.url);
    setFormCategory(link.category || 'teroka');
    setFormBadge(link.badge || 'Google Drive');
    setFormDescription(link.description || '');
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Adakah anda pasti ingin memadam pautan Google Drive ini:\n"${title}"?`)) {
      deleteAdminNavLink(id);
      notify('🗑️ Pautan Google Drive berjaya dipadam.');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formUrl.trim()) {
      alert('Sila isi tajuk dan URL Google Drive.');
      return;
    }

    if (modalMode === 'add') {
      addAdminNavLink({
        title: formTitle.trim(),
        url: formUrl.trim(),
        type: 'drive',
        category: formCategory,
        badge: formBadge.trim() || 'Google Drive',
        description: formDescription.trim(),
      });
      notify('✅ Pautan Google Drive baharu berjaya dimasukkan!');
    } else if (activeLinkId) {
      updateAdminNavLink(activeLinkId, {
        title: formTitle.trim(),
        url: formUrl.trim(),
        type: 'drive',
        category: formCategory,
        badge: formBadge.trim() || 'Google Drive',
        description: formDescription.trim(),
      });
      notify('✅ Pautan Google Drive berjaya dikemaskini!');
    }

    setIsModalOpen(false);
  };

  // Filtered links
  const filtered = driveLinks.filter(l => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      l.title.toLowerCase().includes(q) ||
      (l.description && l.description.toLowerCase().includes(q)) ||
      (l.badge && l.badge.toLowerCase().includes(q));

    const matchCategory =
      selectedCategory === 'all' || l.category === selectedCategory;

    return matchQuery && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Profile Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <HardDrive className="w-4 h-4" />
            <span>Pusat Pautan Dokumen & Repositori Awan</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">
            Repositori Google Drive Rasmi
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            Akses terus ke folder kurikulum, slaid kuliah JTMK, manuskrip penyelidikan, dan dokumentasi inovasi TVET En. Nasrul Effendy yang dikongsi melalui Google Drive.
          </p>
        </div>

        {/* Action Button: If Admin, allow quick insert */}
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all cursor-pointer hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>+ Masukkan Link Google Drive</span>
            </button>
          ) : (
            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              <span>Buka Google Drive</span>
            </a>
          )}
        </div>
      </div>

      {/* Admin Notice Banner (Explaining to the user that they can insert links without code edits) */}
      {isAdmin && (
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
                MOD PENTADBIR AKTIF: PENGURUSAN LINK GOOGLE DRIVE (CRUD)
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Anda boleh <strong>menambah, menyunting (edit), dan memadam (delete)</strong> pautan Google Drive ini secara langsung di sini tanpa perlu mengubah sebarang coding!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer shadow-xs"
          >
            + Tambah Link Drive Sekarang
          </button>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari nama folder, modul, kertas kerja Google Drive..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 shadow-2xs font-medium"
            />
          </div>

          <span className="text-xs font-semibold text-slate-500 self-center">
            Menunjukkan {filtered.length} pautan Google Drive
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
          {[
            { id: 'all', label: 'Semua Folder & Dokumen' },
            { id: 'inovasi', label: 'Inovasi TVET (SISPEN3K, iPMAS)' },
            { id: 'penyelidikan', label: 'Penyelidikan & Manuskrip' },
            { id: 'pengajaran', label: 'Bahan Kuliah & Kursus JTMK' },
            { id: 'teroka', label: 'Arkib Utama' },
          ].map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Google Drive Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(link => (
          <div
            key={link.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100 shadow-2xs">
                    <Folder className="w-5 h-5 text-blue-600 fill-blue-600/20" />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100/70 text-blue-800 border border-blue-200/60">
                      {link.badge || 'Google Drive'}
                    </span>
                  </div>
                </div>

                {/* Admin Actions */}
                {isAdmin && (
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(link)}
                      className="p-1.5 rounded-md text-slate-500 hover:text-blue-600 hover:bg-white transition-colors cursor-pointer"
                      title="Sunting (Edit) Pautan ini"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(link.id, link.title)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-white transition-colors cursor-pointer"
                      title="Padam (Delete) Pautan ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {link.title}
              </h3>

              {link.description && (
                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                  {link.description}
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="truncate max-w-[200px]">
                  {link.url.replace(/^https?:\/\//, '')}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(link.url, link.id)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Salin Pautan"
                >
                  {copiedId === link.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Buka di Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-base">Tiada Pautan Dijumpai</h3>
          <p className="text-xs text-slate-400 mt-1">
            Cuba cari kata kunci lain atau pilih kategori berbeza.
          </p>
          {isAdmin && (
            <button
              type="button"
              onClick={handleOpenAdd}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              + Masukkan Pautan Google Drive Sekarang
            </button>
          )}
        </div>
      )}

      {/* Info Callout for Users */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900">Perlukan bantuan mencari fail kurikulum?</h4>
          <p className="text-slate-500">
            Semua bahan disediakan di bawah kebenaran akademik Politeknik Tuanku Syed Sirajuddin. Sila hubungi En. Nasrul Effendy untuk perkongsian hak akses folder tertutup.
          </p>
        </div>
        <a
          href="https://wa.me/60194090902?text=Salam%20En.%20Nasrul%20Effendy%2C%20saya%20ingin%20memohon%20akses%20ke%20folder%20Google%20Drive."
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all"
        >
          Hubungi via WhatsApp
        </a>
      </div>

      {/* =========================================================================
          ADD / EDIT MODAL FOR GOOGLE DRIVE LINK
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {modalMode === 'add' ? 'Masukkan Link Google Drive Baharu' : 'Sunting Pautan Google Drive'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tajuk Folder / Nama Dokumen *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cth: Folder Modul DFC20103 / Kertas Kerja iPMAS 2026"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pautan URL Google Drive (https://drive.google.com/...) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/drive/folders/..."
                  value={formUrl}
                  onChange={e => setFormUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-hidden font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Dokumen
                  </label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-hidden"
                  >
                    <option value="inovasi">Inovasi TVET (SISPEN3K / iPMAS)</option>
                    <option value="penyelidikan">Penyelidikan & Manuskrip</option>
                    <option value="pengajaran">Bahan Kuliah & Kursus JTMK</option>
                    <option value="teroka">Arkib Utama / Teroka</option>
                    <option value="quicklink">Pautan Pantas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Label Lencana (Badge)
                  </label>
                  <input
                    type="text"
                    placeholder="Cth: Google Drive / Folder Rasmi"
                    value={formBadge}
                    onChange={e => setFormBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Keterangan Ringkas Dokumen / Kandungan
                </label>
                <textarea
                  rows={3}
                  placeholder="Keterangan mengenai kandungan fail atau panduan penggunaan folder Google Drive ini..."
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{modalMode === 'add' ? 'Simpan Pautan' : 'Kemaskini Pautan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
