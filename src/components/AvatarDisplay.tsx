import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import {
  getCustomAvatar,
  setCustomAvatar,
  resetCustomAvatar,
  subscribeToAvatar,
} from '../services/avatarService';

interface AvatarDisplayProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  allowUpload?: boolean;
  className?: string;
  showFloatingCards?: boolean;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  size = 'md',
  allowUpload = true,
  className = '',
  showFloatingCards = true,
}) => {
  const [avatar, setAvatar] = useState<string | null>(getCustomAvatar());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAvatar(getCustomAvatar());
    const unsub = subscribeToAvatar(newAvatar => {
      setAvatar(newAvatar);
    });
    return () => unsub();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Sila pilih fail imej yang sah (PNG atau JPG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target?.result as string;
      if (dataUrl) {
        setCustomAvatar(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Small navbar avatar
  if (size === 'sm') {
    return (
      <div className="relative group inline-block">
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-md flex items-center justify-center">
          {avatar ? (
            <img
              src={avatar}
              alt="Nadz Effendy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-indigo-950 flex items-center justify-center font-extrabold text-white text-xs">
              NE
            </div>
          )}
        </div>
      </div>
    );
  }

  // Medium / Large in profile
  if (size === 'md' || size === 'lg') {
    const dim = size === 'md' ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-36 h-36 sm:w-44 sm:h-44';
    return (
      <div className={`relative group inline-block ${className}`}>
        <div
          onClick={() => allowUpload && fileInputRef.current?.click()}
          className={`${dim} rounded-2xl overflow-hidden bg-slate-900 border-2 border-indigo-500/30 shadow-xl relative flex items-center justify-center ${
            allowUpload ? 'cursor-pointer' : ''
          }`}
          title={allowUpload ? 'Klik untuk memilih foto profil' : undefined}
        >
          {avatar ? (
            <img
              src={avatar}
              alt="Nadz Effendy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-3 text-white">
              <div className="w-12 h-12 rounded-full bg-indigo-600/40 flex items-center justify-center text-white font-extrabold text-lg mb-1 border border-white/20">
                NE
              </div>
              <span className="text-[10px] text-cyan-300 font-bold">Nadz Effendy</span>
            </div>
          )}

          {allowUpload && (
            <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
              <Camera className="w-6 h-6 text-amber-400 mb-1" />
              <span className="text-[10px] font-bold text-white">
                {avatar ? 'Tukar Foto' : 'Pilih Foto'}
              </span>
            </div>
          )}
        </div>

        {allowUpload && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        )}
      </div>
    );
  }

  // Hero Portrait Frame (Styled exactly like amirulhelmi.my / kekalbersama.my)
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Outer ambient glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 via-blue-500/15 to-amber-500/10 rounded-[36px] blur-2xl pointer-events-none" />

      {/* Portrait Box - Always clickable to upload */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[380px] sm:h-[460px] md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-800/80 via-slate-900 to-slate-950 border border-slate-700/60 shadow-2xl group cursor-pointer"
        title="Klik di sini untuk memuat naik fail foto NADZ.png"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="En. Nasrul Effendy bin Mat Nasir"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-slate-900 via-indigo-950/60 to-slate-950 text-white">
            <div className="w-24 h-24 rounded-full bg-indigo-600/30 border-2 border-indigo-400/40 flex items-center justify-center text-3xl font-black text-white shadow-inner mb-3 group-hover:scale-110 transition-transform">
              NE
            </div>
            <h4 className="text-base font-bold text-white">Nasrul Effendy</h4>
            <p className="text-xs text-amber-400 font-semibold mt-0.5">Gred DH12 • PTSS Perlis</p>
            <p className="text-[11px] text-slate-300 mt-2 max-w-[240px] leading-relaxed">
              Klik butang di bawah untuk memuat naik fail foto asal <strong>NADZ.png</strong>
            </p>

            {/* Direct In-Card Button */}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="mt-5 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Upload className="w-4 h-4 text-slate-950" />
              <span>Pilih Fail NADZ.png</span>
            </button>
          </div>
        )}

        {/* Subtle shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Hover Camera Overlay if avatar is present */}
        {avatar && (
          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer p-4 text-center backdrop-blur-2xs">
            <Camera className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
            <span className="text-xs font-bold text-white">Tukar Foto Profil</span>
            <span className="text-[10px] text-slate-300 mt-1">Pilih fail gambar dari peranti anda</span>
          </div>
        )}
      </div>

      {/* Bottom Upload Action Buttons */}
      <div className="mt-4 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98"
        >
          <Upload className="w-4 h-4" />
          <span>{avatar ? 'Tukar Foto NADZ.png' : 'Muat Naik Foto NADZ.png'}</span>
        </button>

        {avatar && (
          <button
            type="button"
            onClick={() => {
              if (confirm('Padam gambar tersuai dan pulihkan kepada asal?')) {
                resetCustomAvatar();
              }
            }}
            className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border border-slate-800"
            title="Padam foto tersuai"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
