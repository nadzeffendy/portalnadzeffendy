import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { TeachingPage } from './pages/TeachingPage';
import { InnovationsPage } from './pages/InnovationsPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { DatabaseHubPage } from './pages/DatabaseHubPage';
import { GoogleDrivePage } from './pages/GoogleDrivePage';
import { ContactPage } from './pages/ContactPage';
import { CVPage } from './pages/CVPage';
import { NewsPage } from './pages/NewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { initAuth, googleSignIn, logout } from './services/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import { MessageCircle, FileText, ShieldCheck, LogOut, Settings, X, Lock } from 'lucide-react';
import { isAdminLoggedIn, logoutAdmin, subscribeToAdminAuth } from './services/adminAuthService';
import { AdminLoginCard } from './components/AdminLoginCard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(isAdminLoggedIn());
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn());
    const unsubAdmin = subscribeToAdminAuth(auth => {
      setIsAdmin(auth);
    });
    return () => unsubAdmin();
  }, []);

  useEffect(() => {
    // Initialize Auth Listener with in-memory token cache
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
      },
      () => {
        // Not authenticated or token expired
        setGoogleUser(null);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Global keydown for Search (Cmd/Ctrl+K) & Admin Access (Cmd/Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminLoginModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check URL hash for direct admin trigger
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#login') {
        if (!isAdminLoggedIn()) {
          setIsAdminLoginModalOpen(true);
        } else {
          setCurrentPage('admin');
        }
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const res = await googleSignIn();
      if (res?.user) {
        setGoogleUser(res.user);
      }
    } catch (err: any) {
      console.error('Sign-in error:', err);
      alert(err.message || 'Log masuk Google Drive dibatalkan atau menghadapi ralat.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await logout();
      setGoogleUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const openWhatsApp = () => {
    const phone = '60194090902';
    const message = encodeURIComponent(
      'Salam En. Nasrul Effendy, saya berhubung melalui portal rasmi amirulhelmi style mengenai akademik/latihan/inovasi TVET.'
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Admin Top Notification Bar (Visible ONLY when logged in as Admin) */}
      {isAdmin && (
        <div className="bg-[#071628] text-white px-4 py-2 border-b border-amber-500/30 text-xs flex items-center justify-between z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-amber-400">MOD PENTADBIR AKTIF</span>
            <span className="text-slate-400 hidden sm:inline">— En. Nasrul Effendy bin Mat Nasir</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate('admin')}
              className="text-white hover:text-amber-400 font-semibold underline flex items-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Panel Pentadbir (CRUD & Navigasi)</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => {
                logoutAdmin();
                setIsAdmin(false);
                if (currentPage === 'admin') {
                  setCurrentPage('home');
                }
              }}
              className="text-red-300 hover:text-red-200 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Keluar</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        googleUser={googleUser}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
        isAuthenticating={isAuthenticating}
        isAdmin={isAdmin}
      />

      {/* Main Content Area (Full width container allowing edge-to-edge section backgrounds) */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
            googleConnected={!!googleUser}
            isAdmin={isAdmin}
          />
        )}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'teaching' && <TeachingPage onNavigate={handleNavigate} />}
        {currentPage === 'innovations' && <InnovationsPage onNavigate={handleNavigate} />}
        {currentPage === 'publications' && <PublicationsPage onNavigate={handleNavigate} />}
        {currentPage === 'cv' && <CVPage onNavigate={handleNavigate} />}
        {currentPage === 'news' && <NewsPage onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
        {currentPage === 'admin' && (
          <DatabaseHubPage />
        )}
        {currentPage === 'database' && (
          <DatabaseHubPage />
        )}
        {currentPage === 'drive' && (
          <GoogleDrivePage
            googleUser={googleUser}
            onGoogleSignIn={handleGoogleSignIn}
            isAuthenticating={isAuthenticating}
          />
        )}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </main>

      {/* Institutional Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        isAdmin={isAdmin}
      />

      {/* Global Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Admin Login Modal (Triggered via discreet footer lock or keyboard shortcut) */}
      {isAdminLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative max-w-[460px] w-full">
            <button
              type="button"
              onClick={() => setIsAdminLoginModalOpen(false)}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
            <AdminLoginCard
              onSuccess={() => {
                setIsAdmin(true);
                setIsAdminLoginModalOpen(false);
                handleNavigate('admin');
              }}
              onCancel={() => setIsAdminLoginModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Floating Bottom Right WhatsApp Action Button (exact amirulhelmi.my feature) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={openWhatsApp}
          className="w-13 h-13 rounded-full bg-[#0a1e36] hover:bg-[#071628] text-white shadow-xl shadow-blue-950/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-98 cursor-pointer border-2 border-white/20"
          title="Hubungi En. Nasrul Effendy melalui WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-amber-400" />
        </button>
      </div>
    </div>
  );
}
