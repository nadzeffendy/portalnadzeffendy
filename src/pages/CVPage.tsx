import React from 'react';
import { CVInfographicSection } from '../components/CVInfographicSection';
import { PageId } from '../types';
import { FileText, ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/nadzEffendyData';

interface CVPageProps {
  onNavigate: (page: PageId) => void;
}

export const CVPage: React.FC<CVPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#031528]">
      {/* Top Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-center justify-between text-white border-b border-slate-800">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Kembali ke Laman Utama</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline">
            {PERSONAL_INFO.name} • {PERSONAL_INFO.grade}
          </span>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-[#0c1f38] hover:bg-[#071628] border border-blue-900/60 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* Embedded 4-page Infographic CV Section matching Screenshot 2 */}
      <CVInfographicSection />
    </div>
  );
};
