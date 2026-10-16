import React, { useState, useEffect } from 'react';
import {
  HardDrive,
  Folder,
  FileText,
  FileSpreadsheet,
  FileCode,
  Image as ImageIcon,
  Search,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  RefreshCw,
  FolderPlus,
  ShieldCheck,
  AlertCircle,
  File,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { DriveFileItem } from '../types';
import {
  listDriveFiles,
  uploadFileToDrive,
  createDriveFolder,
  deleteDriveFile,
  formatFileSize,
} from '../services/driveService';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { ConfirmModal } from '../components/ConfirmModal';
import { User as FirebaseUser } from 'firebase/auth';
import { getAdminNavLinks, subscribeToAdminData } from '../services/adminDataService';
import { NavigationLink } from '../types';

interface GoogleDrivePageProps {
  googleUser: FirebaseUser | null;
  onGoogleSignIn: () => void;
  isAuthenticating: boolean;
}

export const GoogleDrivePage: React.FC<GoogleDrivePageProps> = ({
  googleUser,
  onGoogleSignIn,
  isAuthenticating,
}) => {
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isLiveDrive, setIsLiveDrive] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [adminDriveLinks, setAdminDriveLinks] = useState<NavigationLink[]>(
    getAdminNavLinks().filter(l => l.type === 'drive')
  );

  useEffect(() => {
    setAdminDriveLinks(getAdminNavLinks().filter(l => l.type === 'drive'));
    const unsub = subscribeToAdminData(() => {
      setAdminDriveLinks(getAdminNavLinks().filter(l => l.type === 'drive'));
    });
    return () => unsub();
  }, []);

  // Modals state
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [deleteTargetFile, setDeleteTargetFile] = useState<DriveFileItem | null>(null);

  const fetchFiles = async (query?: string) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const res = await listDriveFiles(query);
      setFiles(res.files);
      setIsLiveDrive(res.isLive);
      if (res.error) {
        setApiError(res.error);
      }
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'Gagal menyambung ke Google Drive.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(searchQuery);
  }, [googleUser]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFiles(searchQuery);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!googleUser) {
      alert('Sila log masuk dengan akaun Google terlebih dahulu untuk memuat naik fail ke Google Drive sebenar.');
      e.target.value = '';
      return;
    }

    setIsUploading(true);
    setUploadMessage('Memuat naik fail ke Google Drive...');
    try {
      await uploadFileToDrive(file);
      setUploadMessage(`Fail "${file.name}" berjaya dimuat naik ke Google Drive!`);
      setTimeout(() => setUploadMessage(null), 4000);
      await fetchFiles(searchQuery);
    } catch (err: any) {
      alert(`Ralat muat naik: ${err.message}`);
      setUploadMessage(null);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    if (!googleUser) {
      alert('Sila log masuk dengan akaun Google untuk mencipta folder di Google Drive sebenar.');
      return;
    }

    try {
      await createDriveFolder(newFolderName.trim());
      setIsNewFolderModalOpen(false);
      setNewFolderName('');
      setUploadMessage(`Folder "${newFolderName}" berjaya dicipta di Google Drive!`);
      setTimeout(() => setUploadMessage(null), 4000);
      await fetchFiles(searchQuery);
    } catch (err: any) {
      alert(`Ralat mencipta folder: ${err.message}`);
    }
  };

  // Mandatory user confirmation for destructive file deletion
  const handleConfirmDelete = async () => {
    if (!deleteTargetFile) return;

    try {
      if (isLiveDrive) {
        await deleteDriveFile(deleteTargetFile.id);
        setUploadMessage(`Fail "${deleteTargetFile.name}" telah dipadam daripada Google Drive.`);
      } else {
        // Remove locally from state for demo mode
        setFiles(prev => prev.filter(f => f.id !== deleteTargetFile.id));
        setUploadMessage(`Fail "${deleteTargetFile.name}" dipadam dari paparan.`);
      }
      setTimeout(() => setUploadMessage(null), 4000);
      await fetchFiles(searchQuery);
    } catch (err: any) {
      alert(`Ralat memadam: ${err.message}`);
    } finally {
      setDeleteTargetFile(null);
    }
  };

  // File type filtering
  const filteredFiles = files.filter(f => {
    if (activeFilter === 'folders') return f.isFolder;
    if (activeFilter === 'docs')
      return (
        f.mimeType.includes('document') ||
        f.mimeType.includes('word') ||
        f.mimeType.includes('pdf') ||
        f.mimeType.includes('text')
      );
    if (activeFilter === 'sheets')
      return f.mimeType.includes('sheet') || f.mimeType.includes('excel') || f.mimeType.includes('csv');
    if (activeFilter === 'slides')
      return f.mimeType.includes('presentation') || f.mimeType.includes('powerpoint');
    if (activeFilter === 'images') return f.mimeType.startsWith('image/');
    return true;
  });

  const getFileIcon = (file: DriveFileItem) => {
    if (file.isFolder) {
      return <Folder className="w-5 h-5 text-amber-500 flex-shrink-0" />;
    }
    const mime = file.mimeType.toLowerCase();
    if (mime.includes('pdf')) {
      return <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />;
    }
    if (mime.includes('sheet') || mime.includes('excel') || mime.includes('spreadsheet')) {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
    }
    if (mime.includes('presentation') || mime.includes('powerpoint')) {
      return <FileText className="w-5 h-5 text-amber-600 flex-shrink-0" />;
    }
    if (mime.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />;
    }
    return <File className="w-5 h-5 text-indigo-500 flex-shrink-0" />;
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
            <HardDrive className="w-4 h-4" />
            <span>Integrasi Storan Awan Google Workspace</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Pengurus Fail Google Drive</h1>
          <p className="text-sm text-slate-500">
            Akses dokumen penyelidikan, slaid kuliah, kertas cadangan inovasi, dan repositori rasmi Google Drive secara langsung.
          </p>
        </div>

        {/* Auth / Action Button */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {googleUser ? (
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Memuat naik...' : 'Muat Naik ke Drive'}</span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => setIsNewFolderModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
              >
                <FolderPlus className="w-3.5 h-3.5 text-slate-600" />
                <span>Folder Baru</span>
              </button>
            </div>
          ) : (
            <GoogleSignInButton
              onClick={onGoogleSignIn}
              isLoading={isAuthenticating}
              text="Sambung Google Drive"
            />
          )}
        </div>
      </div>

      {/* Upload or Action Notification */}
      {uploadMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{uploadMessage}</span>
          </div>
          <button onClick={() => setUploadMessage(null)} className="text-emerald-700 hover:underline">
            Tutup
          </button>
        </div>
      )}

      {/* Integration Status Banner */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isLiveDrive
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 text-amber-950'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                isLiveDrive ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
              }`}
            >
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">
                  {isLiveDrive
                    ? `Google Drive Disambungkan (${googleUser?.email || 'Akaun Aktif'})`
                    : 'Mod Demonstrasi Repositori Akademik Nadz Effendy'}
                </h3>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                    isLiveDrive ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  {isLiveDrive ? 'Langsung (Live)' : 'Pratonton Kurikulum'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {isLiveDrive
                  ? 'Anda sedang melihat fail sebenar daripada Google Drive anda dengan keizinan OAuth yang sah.'
                  : 'Dokumen di bawah adalah bahan arkib akademik, silibus PTSS dan buku En. Nasrul Effendy. Log masuk untuk memuat naik fail atau melihat storan Google Drive peribadi anda.'}
              </p>
            </div>
          </div>

          {!isLiveDrive && (
            <GoogleSignInButton
              onClick={onGoogleSignIn}
              isLoading={isAuthenticating}
              text="Log Masuk Google Drive"
              className="self-stretch sm:self-auto text-xs py-2"
            />
          )}
        </div>
      </div>

      {apiError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Status API: {apiError}. (Paparan ditukar ke arkib demo)</span>
        </div>
      )}

      {/* Pautan Pantas Google Drive Pentadbir */}
      {adminDriveLinks.length > 0 && (
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
          <div className="flex items-center gap-2 mb-2.5">
            <Folder className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Pautan Folder Pantas Google Drive (Ditetapkan Pentadbir)
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {adminDriveLinks.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-700 text-slate-800 text-xs font-semibold shadow-2xs transition-all hover:scale-102 cursor-pointer"
              >
                <HardDrive className="w-3.5 h-3.5 text-blue-600" />
                <span>{link.title}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari fail atau folder dalam Google Drive..."
            className="w-full pl-10 pr-20 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 shadow-2xs"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 px-3 py-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            Cari
          </button>
        </form>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'folders', label: 'Folder' },
            { id: 'docs', label: 'Dokumen & PDF' },
            { id: 'sheets', label: 'Spreadsheet' },
            { id: 'slides', label: 'Slaid' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === f.id
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}

          <button
            onClick={() => fetchFiles(searchQuery)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer ml-1"
            title="Muat Semula Senarai"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Files Grid / List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
          <span>Nama Fail & Folder ({filteredFiles.length})</span>
          <span className="hidden sm:inline">Tindakan</span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-amber-500 mx-auto" />
            <p className="text-xs font-semibold">Menghubungi Google Drive API v3...</p>
          </div>
        ) : filteredFiles.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredFiles.map(file => (
              <div
                key={file.id}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {getFileIcon(file)}
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-amber-700 transition-colors">
                      {file.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{file.isFolder ? 'Folder Fail' : formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span>Dikemaskini: {file.modifiedTime ? file.modifiedTime.split('T')[0] : 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                  {file.webViewLink && file.webViewLink !== '#' ? (
                    <a
                      href={file.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-amber-100 hover:text-amber-900 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>Buka di Drive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() =>
                        alert(`Membuka maklumat fail "${file.name}". Format: ${file.mimeType}`)
                      }
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Pratonton
                    </button>
                  )}

                  <button
                    onClick={() => setDeleteTargetFile(file)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Padam Fail"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <HardDrive className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">Tiada fail padanan dijumpai</p>
            <p className="text-xs text-slate-400">
              Cuba padamkan carian atau gunakan butang muat naik untuk menambah fail baru ke Google Drive.
            </p>
          </div>
        )}
      </div>

      {/* New Folder Modal */}
      {isNewFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <FolderPlus className="w-5 h-5 text-amber-500" />
              <span>Cipta Folder Google Drive Baru</span>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Folder</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newFolderName}
                  onChange={e => setNewFolderName(e.target.value)}
                  placeholder="Contoh: Modul Kuliah Cybersecurity 2026"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewFolderModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs cursor-pointer"
                >
                  Cipta Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mandatory confirmation dialog for file deletion */}
      <ConfirmModal
        isOpen={!!deleteTargetFile}
        title="Padam Fail Google Drive?"
        message={`Adakah anda pasti ingin memadam "${deleteTargetFile?.name}" daripada Google Drive? Tindakan ini tidak boleh diundur.`}
        confirmLabel="Ya, Padam Fail"
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetFile(null)}
      />
    </div>
  );
};
