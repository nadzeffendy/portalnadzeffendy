import React from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/nadzEffendyData';
import { Mail, Phone, MapPin, HardDrive, Archive, Shield, Award, Lock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenAdminLogin?: () => void;
  isAdmin?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdminLogin, isAdmin = false }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Bio & Institution */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 font-black text-sm">
                NE
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">En. Nasrul Effendy</h3>
                <p className="text-xs text-amber-400 font-bold">{PERSONAL_INFO.title}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Portal peribadi dan repositori akademik rasmi En. Nasrul Effendy bin Mat Nasir, Pensyarah Kanan di Jabatan Teknologi Maklumat & Komunikasi, Politeknik Tuanku Syed Sirajuddin, Perlis.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <Shield className="w-4 h-4" />
              <span>Gred DH12 • Lantikan 15 Ogos 2005</span>
            </div>
          </div>

          {/* Col 2: Navigasi Laman */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Halaman Portal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-slate-400"
                >
                  Laman Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-slate-400"
                >
                  Biodata & Pengalaman Perkhidmatan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('teaching')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-slate-400"
                >
                  Pengajaran & Kursus JTMK
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cv')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-slate-400 font-semibold"
                >
                  CV Infografik Lengkap (4 Halaman)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('innovations')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-slate-400"
                >
                  Sistem Inovasi (SISPEN3K, iPMAS, IAS, iCERT)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('publications')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-slate-400"
                >
                  Penerbitan & Penyelidikan (JACoIT, SPSH, Buku)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-slate-400"
                >
                  News & Perkembangan Terkini
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-slate-400"
                >
                  Galeri Foto & Aktiviti
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Integrasi Data & Awan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sambungan & Sistem</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('publications')}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer text-slate-400"
                >
                  <Archive className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Arkib Dokumen & Penerbitan</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('drive')}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer text-slate-400"
                >
                  <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                  <span>Integrasi Google Drive REST API</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer text-slate-400"
                >
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Tempahan Khidmat Penceramah Pakar</span>
                </button>
              </li>
            </ul>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              Diselaraskan dengan Google Workspace & Firebase Authentication untuk akses selamat ke storan awan.
            </div>
          </div>

          {/* Col 4: Perhubungan Rasmi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hubungi PTSS</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>Jabatan Teknologi Maklumat dan Komunikasi, Politeknik Tuanku Syed Sirajuddin, 02600 Pauh Putra, Perlis.</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a href={`mailto:${PERSONAL_INFO.emailPTSS}`} className="hover:text-white transition-colors">
                  {PERSONAL_INFO.emailPTSS}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <a href={`mailto:${PERSONAL_INFO.emailPersonal}`} className="hover:text-white transition-colors">
                  {PERSONAL_INFO.emailPersonal}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{PERSONAL_INFO.phone} / {PERSONAL_INFO.officePhone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} En. Nasrul Effendy bin Mat Nasir. Hak Cipta Terpelihara.</p>
          <div className="flex items-center gap-4">
            <span>Politeknik Tuanku Syed Sirajuddin</span>
            <span>•</span>
            <span>Jabatan Pendidikan Politeknik & Kolej Komuniti (JPPKK)</span>
            <span>•</span>
            {isAdmin ? (
              <button
                type="button"
                onClick={() => onNavigate('admin')}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 cursor-pointer bg-slate-900 px-2.5 py-1 rounded-md border border-amber-500/30"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Panel Pentadbir Aktif</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAdminLogin}
                className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                title="Log Masuk Pentadbir Portal (En. Nasrul Effendy)"
              >
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Akses Pentadbir</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
