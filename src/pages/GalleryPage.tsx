import React, { useState, useEffect } from 'react';
import {
  Image as GalleryIcon,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
  Plus,
  Maximize2,
  Calendar,
  Layers,
} from 'lucide-react';
import { PageId, GalleryAlbum, GalleryPhoto } from '../types';
import { getAdminAlbums, subscribeToAdminData } from '../services/adminDataService';
import { isAdminLoggedIn } from '../services/adminAuthService';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

const PHOTOS_PER_PAGE = 6;

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  // Per-album current page map: { [albumId]: pageNumber } (1-indexed)
  const [pageMap, setPageMap] = useState<Record<string, number>>({});

  // Lightbox Modal state
  const [lightbox, setLightbox] = useState<{
    albumTitle: string;
    photos: GalleryPhoto[];
    currentIndex: number;
  } | null>(null);

  useEffect(() => {
    setAlbums(getAdminAlbums());
    const unsub = subscribeToAdminData(() => {
      setAlbums(getAdminAlbums());
    });
    return () => unsub();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(null);
      } else if (e.key === 'ArrowLeft') {
        setLightbox(prev => {
          if (!prev) return null;
          const nextIdx = (prev.currentIndex - 1 + prev.photos.length) % prev.photos.length;
          return { ...prev, currentIndex: nextIdx };
        });
      } else if (e.key === 'ArrowRight') {
        setLightbox(prev => {
          if (!prev) return null;
          const nextIdx = (prev.currentIndex + 1) % prev.photos.length;
          return { ...prev, currentIndex: nextIdx };
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  const handlePrevPage = (albumId: string) => {
    setPageMap(prev => {
      const cur = prev[albumId] || 1;
      return { ...prev, [albumId]: Math.max(1, cur - 1) };
    });
  };

  const handleNextPage = (albumId: string, totalPages: number) => {
    setPageMap(prev => {
      const cur = prev[albumId] || 1;
      return { ...prev, [albumId]: Math.min(totalPages, cur + 1) };
    });
  };

  const openLightbox = (album: GalleryAlbum, photoIndex: number) => {
    setLightbox({
      albumTitle: album.title,
      photos: album.photos,
      currentIndex: photoIndex,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 pb-24">
      {/* Header Section matching user image 1 ("Satu aktiviti, satu album.") */}
      <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-xs font-black tracking-widest uppercase text-amber-600 mb-2">
            GALERI ALBUM FOTO
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            <span className="text-[#0c1f38]">Satu aktiviti,</span>
            <br />
            <span className="text-amber-600">satu album.</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            Setiap album memaparkan maksimum enam thumbnail pada satu halaman. Klik gambar untuk melihat dan slide semua foto.
          </p>
        </div>

        {isAdminLoggedIn() && (
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto hover:scale-102"
            title="Urus dan Muat Naik Gambar Galeri di Panel Pentadbir"
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>+ Urus & Muat Naik Gambar (Admin)</span>
          </button>
        )}
      </div>

      {/* Albums Stream */}
      <div className="space-y-12">
        {albums.map(album => {
          const totalPhotos = album.photos.length;
          const totalPages = Math.max(1, Math.ceil(totalPhotos / PHOTOS_PER_PAGE));
          const currentPage = Math.min(totalPages, pageMap[album.id] || 1);

          const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
          const currentPhotos = album.photos.slice(startIndex, startIndex + PHOTOS_PER_PAGE);

          return (
            <div
              key={album.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-300 space-y-6"
            >
              {/* Album Header matching Image 1 & 2 */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                      {album.category || 'Umum'}
                    </span>
                    {album.year && (
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{album.year}</span>
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0c1f38] tracking-tight leading-snug">
                    {album.title}
                  </h2>
                  {album.subtitle && (
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {album.subtitle}
                    </p>
                  )}
                </div>

                <div className="shrink-0 self-start sm:self-auto">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
                    {totalPhotos} foto
                  </span>
                </div>
              </div>

              {/* Top Pagination Bar (matching Image 2) */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handlePrevPage(album.id)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      currentPage === 1
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer'
                    }`}
                  >
                    <span>‹</span>
                    <span>Sebelum</span>
                  </button>

                  <span className="text-xs font-bold text-slate-600 px-3 py-1 bg-slate-50 rounded-lg border border-slate-200/60">
                    Halaman {currentPage} / {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleNextPage(album.id, totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      currentPage === totalPages
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-900 font-extrabold hover:bg-slate-100 cursor-pointer'
                    }`}
                  >
                    <span>Seterusnya</span>
                    <span>›</span>
                  </button>
                </div>
              )}

              {/* Thumbnails Grid: 3 columns x 2 rows (Max 6 per page) matching Image 1 & 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentPhotos.map((photo, pIdx) => {
                  const globalIndex = startIndex + pIdx;
                  // In image 2, photos have a top-right badge (such as reverse index or photo index)
                  const displayBadgeNumber = totalPhotos - globalIndex;

                  return (
                    <div
                      key={photo.id || pIdx}
                      onClick={() => openLightbox(album, globalIndex)}
                      className="group cursor-pointer rounded-2xl overflow-hidden aspect-[16/10] relative bg-slate-100 border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption || album.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Top right number pill badge matching Image 2 */}
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-emerald-900/90 text-white text-[11px] font-mono font-bold shadow-xs">
                        {displayBadgeNumber}
                      </span>

                      {/* Bottom Caption Overlay with Gradient matching Image 1 & 2 */}
                      <div className="absolute inset-x-0 bottom-0 pt-8 pb-3 px-3.5 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex items-end">
                        <p className="text-xs text-white/95 line-clamp-2 font-medium leading-snug drop-shadow-xs">
                          {photo.caption || album.title}
                        </p>
                      </div>

                      {/* Hover action indicator */}
                      <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="p-2 rounded-full bg-white/90 text-slate-900 shadow-md">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Pagination Bar matching Image 2 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handlePrevPage(album.id)}
                    disabled={currentPage === 1}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      currentPage === 1
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer'
                    }`}
                  >
                    <span>‹</span>
                    <span>Sebelum</span>
                  </button>

                  <span className="text-xs font-bold text-slate-600 px-3 py-1 bg-slate-50 rounded-lg border border-slate-200/60">
                    Halaman {currentPage} / {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleNextPage(album.id, totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      currentPage === totalPages
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-900 font-extrabold hover:bg-slate-100 cursor-pointer'
                    }`}
                  >
                    <span>Seterusnya</span>
                    <span>›</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {albums.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 text-slate-500">
            <GalleryIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-700">Belum ada album galeri</p>
            <p className="text-xs text-slate-400 mt-1">Sila log masuk ke Panel Pentadbir untuk memuat naik gambar dan mencipta album baru.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal ("slide semua foto") */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in">
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-white max-w-6xl mx-auto w-full pb-3 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                {lightbox.albumTitle}
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Foto {lightbox.currentIndex + 1} daripada {lightbox.photos.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Center Content with Prev / Next */}
          <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4">
            {/* Prev Button */}
            {lightbox.photos.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightbox(prev => {
                    if (!prev) return null;
                    const prevIdx =
                      (prev.currentIndex - 1 + prev.photos.length) % prev.photos.length;
                    return { ...prev, currentIndex: prevIdx };
                  })
                }
                className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer hover:scale-105"
                title="Sebelum (Arrow Left)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main Image */}
            <div className="max-h-[75vh] max-w-full flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={lightbox.photos[lightbox.currentIndex]?.url}
                alt={lightbox.photos[lightbox.currentIndex]?.caption || lightbox.albumTitle}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl"
              />
            </div>

            {/* Next Button */}
            {lightbox.photos.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightbox(prev => {
                    if (!prev) return null;
                    const nextIdx = (prev.currentIndex + 1) % prev.photos.length;
                    return { ...prev, currentIndex: nextIdx };
                  })
                }
                className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer hover:scale-105"
                title="Seterusnya (Arrow Right)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Caption */}
          <div className="max-w-4xl mx-auto w-full text-center pb-2">
            <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed drop-shadow-md">
              {lightbox.photos[lightbox.currentIndex]?.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
