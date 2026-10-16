import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  HardDrive,
  Database,
  BookOpen,
  Newspaper,
  Image as GalleryIcon,
  FolderOpen,
  Archive,
  Users,
  Search,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { PageId } from '../types';
import { User as FirebaseUser } from 'firebase/auth';
import { AvatarDisplay } from './AvatarDisplay';
import { PERSONAL_INFO } from '../data/nadzEffendyData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
  googleUser: FirebaseUser | null;
  onGoogleSignIn: () => void;
  onGoogleSignOut: () => void;
  isAuthenticating: boolean;
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  googleUser,
  onGoogleSignIn,
  onGoogleSignOut,
  isAuthenticating,
  isAdmin = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [terokaOpen, setTerokaOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setTerokaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setTerokaOpen(false);
    setMobileMenuOpen(false);
  };

  const openWhatsApp = () => {
    const phone = '60194090902';
    const message = encodeURIComponent(
      'Salam En. Nasrul Effendy, saya berhubung melalui portal rasmi anda (amirulhelmi style) mengenai penyelidikan / inovasi / latihan TVET.'
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const isTerokaActive = ['news', 'gallery', 'database', 'drive'].includes(currentPage);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Brand - Avatar + Name + Subtitle exactly like amirulhelmi.my */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3.5 text-left group focus:outline-none"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 shadow-sm transition-transform group-hover:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                  <AvatarDisplay size="sm" allowUpload={false} showFloatingCards={false} />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-[15px] sm:text-base tracking-tight group-hover:text-amber-600 transition-colors">
                Nasrul Effendy
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-normal -mt-0.5">
                Academic • Research • Digital Innovation
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Profil, Kepakaran, Penyelidikan, Inovasi, CV, Teroka ⌵) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNav('profile')}
              className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer ${
                currentPage === 'profile'
                  ? 'text-slate-950 font-bold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Profil
            </button>

            <button
              onClick={() => handleNav('teaching')}
              className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer ${
                currentPage === 'teaching'
                  ? 'text-slate-950 font-bold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Kepakaran
            </button>

            <button
              onClick={() => handleNav('publications')}
              className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer ${
                currentPage === 'publications'
                  ? 'text-slate-950 font-bold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Penyelidikan
            </button>

            <button
              onClick={() => handleNav('innovations')}
              className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer ${
                currentPage === 'innovations'
                  ? 'text-slate-950 font-bold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Inovasi
            </button>

            <button
              onClick={() => handleNav('cv')}
              className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer ${
                currentPage === 'cv'
                  ? 'text-slate-950 font-bold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              CV
            </button>

            {/* Teroka Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setTerokaOpen(!terokaOpen)}
                className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5 cursor-pointer ${
                  isTerokaActive || terokaOpen
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <span>Teroka</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    terokaOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Exact Teroka dropdown menu matching amirulhelmi.my screenshot */}
              {terokaOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-slate-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNav('news')}
                    className="w-full px-5 py-2.5 text-left text-sm text-slate-700 hover:text-slate-950 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-medium">News</span>
                    <Newspaper className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => handleNav('gallery')}
                    className="w-full px-5 py-2.5 text-left text-sm text-slate-700 hover:text-slate-950 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-medium">Galeri</span>
                    <GalleryIcon className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => handleNav('teaching')}
                    className="w-full px-5 py-2.5 text-left text-sm text-slate-700 hover:text-slate-950 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-medium">Portfolio</span>
                    <FolderOpen className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => handleNav('profile')}
                    className="w-full px-5 py-2.5 text-left text-sm text-slate-700 hover:text-slate-950 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-medium">Rujukan</span>
                    <Users className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => handleNav('publications')}
                    className="w-full px-5 py-2.5 text-left text-sm text-slate-700 hover:text-slate-950 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-medium">Arkib</span>
                    <Archive className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Admin is ONLY visible to authenticated admin for strict safety */}
                  {isAdmin && (
                    <button
                      onClick={() => handleNav('admin')}
                      className="w-full px-5 py-2.5 text-left text-sm text-amber-700 bg-amber-50/50 hover:bg-amber-50 flex items-center justify-between transition-colors cursor-pointer border-t border-b border-amber-100 my-1 font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Panel Pentadbir</span>
                      </div>
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                    </button>
                  )}

                  <div className="my-1.5 border-t border-slate-100" />

                  {/* Google Drive option with Drive icon */}
                  <button
                    onClick={() => handleNav('drive')}
                    className="w-full px-5 py-2.5 text-left text-sm text-slate-800 hover:text-blue-600 hover:bg-blue-50/50 flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded flex items-center justify-center bg-blue-100 text-blue-600">
                        <HardDrive className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-slate-900 group-hover:text-blue-600">
                        Google Drive
                      </span>
                    </div>
                    {googleUser ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Tersambung
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">Cloud</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: Spotlight Search & WhatsApp Pill Button */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Carian Pantas (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Official Dark Navy WhatsApp Button (exact amirulhelmi.my match) */}
            <button
              onClick={openWhatsApp}
              type="button"
              className="hidden sm:flex items-center gap-2 bg-[#0a1e36] hover:bg-[#071628] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-sm transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>WhatsApp</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => handleNav('profile')}
              className={`p-2.5 text-left text-sm rounded-xl font-medium transition-colors ${
                currentPage === 'profile' ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-700'
              }`}
            >
              Profil
            </button>
            <button
              onClick={() => handleNav('teaching')}
              className={`p-2.5 text-left text-sm rounded-xl font-medium transition-colors ${
                currentPage === 'teaching' ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-700'
              }`}
            >
              Kepakaran
            </button>
            <button
              onClick={() => handleNav('publications')}
              className={`p-2.5 text-left text-sm rounded-xl font-medium transition-colors ${
                currentPage === 'publications' ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-700'
              }`}
            >
              Penyelidikan
            </button>
            <button
              onClick={() => handleNav('innovations')}
              className={`p-2.5 text-left text-sm rounded-xl font-medium transition-colors ${
                currentPage === 'innovations' ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-700'
              }`}
            >
              Inovasi
            </button>
            <button
              onClick={() => handleNav('cv')}
              className={`p-2.5 text-left text-sm rounded-xl font-medium transition-colors ${
                currentPage === 'cv' ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-700'
              }`}
            >
              CV Infografik
            </button>
            <button
              onClick={() => handleNav('news')}
              className={`p-2.5 text-left text-sm rounded-xl font-medium transition-colors ${
                currentPage === 'news' ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-700'
              }`}
            >
              News
            </button>
            <button
              onClick={() => handleNav('gallery')}
              className={`p-2.5 text-left text-sm rounded-xl font-medium transition-colors ${
                currentPage === 'gallery' ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-700'
              }`}
            >
              Galeri
            </button>
            {isAdmin && (
              <button
                onClick={() => handleNav('admin')}
                className={`p-2.5 text-left text-sm rounded-xl font-bold transition-colors flex items-center justify-between ${
                  currentPage === 'admin'
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <span>⚙️ Panel Pentadbir</span>
                <ShieldCheck className="w-4 h-4 text-amber-600" />
              </button>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNav('drive')}
              className="w-full py-2.5 px-4 bg-blue-50 text-blue-900 rounded-xl font-semibold text-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-blue-600" />
                <span>Google Drive Portal</span>
              </div>
              <span className="text-xs text-blue-600 font-normal">Awan</span>
            </button>

            <button
              onClick={openWhatsApp}
              className="w-full py-3 bg-[#0a1e36] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
