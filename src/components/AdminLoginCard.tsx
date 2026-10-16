import React, { useState } from 'react';
import { loginAdmin } from '../services/adminAuthService';
import { Lock, ShieldCheck, Key, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/nadzEffendyData';

interface AdminLoginCardProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

export const AdminLoginCard: React.FC<AdminLoginCardProps> = ({ onSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(username, password);
      setIsLoading(false);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.message);
      }
    }, 300);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      {/* Exact Card matching the uploaded screenshot */}
      <div className="bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 max-w-[440px] w-full p-8 sm:p-10 relative">
        {/* Eyebrow Pill matching screenshot */}
        <div className="mb-4">
          <span className="bg-[#0a1e36] text-[#d99b26] font-black text-[10px] tracking-widest px-3.5 py-1.5 rounded-full uppercase inline-block shadow-xs">
            CONTENT PORTAL
          </span>
        </div>

        {/* Title matching screenshot */}
        <h2 className="text-3xl font-extrabold text-[#0c1f38] tracking-tight mb-2">
          Portal Kandungan
        </h2>

        {/* Subtitle matching screenshot */}
        <p className="text-xs sm:text-sm text-slate-500 font-medium mb-8">
          Nasrul Effendy · Pengurusan kandungan digital
        </p>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 font-medium animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form matching screenshot inputs */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
              Kata laluan
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Masukkan kata laluan"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
            />
          </div>

          {/* Gold button matching screenshot */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#d99b26] hover:bg-[#c4871c] text-slate-950 font-bold px-7 py-3 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md active:scale-98 text-sm cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Menyemak...' : 'Log masuk'}
            </button>

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2 cursor-pointer"
              >
                Kembali
              </button>
            )}
          </div>
        </form>

        {/* Security badge and hint */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kawasan Kawalan Keselamatan Data Pentadbir (Admin Only)</span>
          </div>
          <div className="text-[10px] text-slate-400 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            Akses default pentadbir: <strong>Username:</strong> <code className="text-slate-700 font-bold">admin</code> | <strong>Kata laluan:</strong> <code className="text-slate-700 font-bold">admin123</code> (atau <code className="text-slate-700 font-bold">admin</code>)
          </div>
        </div>
      </div>
    </div>
  );
};
