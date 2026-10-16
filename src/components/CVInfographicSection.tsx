import React, { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  Eye,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  Users,
  Lightbulb,
  Shield,
  Sparkles,
  X,
  Printer,
  ChevronRight,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  EDUCATIONS,
  SERVICE_HISTORY,
  INNOVATIONS,
  PUBLICATIONS,
  AWARDS,
  MEMBERSHIPS,
  REFERENCES,
} from '../data/nadzEffendyData';

interface CVInfographicSectionProps {
  onOpenPDF?: () => void;
}

export const CVInfographicSection: React.FC<CVInfographicSectionProps> = ({ onOpenPDF }) => {
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'ms' | 'en'>('ms');

  const handlePrint = () => {
    window.print();
  };

  const cvPages = [
    {
      num: 1,
      title: 'Halaman 01: Profil, Pendidikan & Kepakaran',
      badge: 'Halaman 01',
      sections: [
        'Profil Profesional & Ringkasan Eksekutif DH12',
        'Jawatan Semasa & Peranan (PTSS Perlis)',
        'Kelayakan Akademik (Master UUM, Sarjana Muda UiTM, DPLI UPSI)',
        'Bidang Kepakaran (Cybersecurity, Network, Digital Systems)',
      ],
      previewStats: ['20+ Tahun Pengalaman', 'Gred DH12', 'PTSS Perlis'],
    },
    {
      num: 2,
      title: 'Halaman 02: Pelantikan Pakar & Penyelidikan',
      badge: 'Halaman 02',
      sections: [
        'Pelantikan Pakar, Konsultansi & Fasilitasi (CIDB, NCER, MyAIS)',
        'Keahlian Profesional & Kepimpinan (Pengakap Malaysia, MyAIS)',
        'Fokus Penyelidikan (TVET, Cybersecurity, AI Education)',
        'Penerbitan Jurnal & Persidangan Terpilih (JACoIT 2026, SPSH 2025)',
      ],
      previewStats: ['CIDB & NCER', 'MyAIS & Pengakap', 'JACoIT 2026'],
    },
    {
      num: 3,
      title: 'Halaman 03: Inovasi Digital & Penerbitan Buku',
      badge: 'Halaman 03',
      sections: [
        'Buku & E-Book Pendidikan (ChatGPT Heroes, Asasi ICT)',
        'Inovasi Digital Unggul (SISPEN3K, iPMAS, IAS, iCERT, Dr. Froats)',
        'Anugerah & Pengiktirafan (APC 2008 & 2015, Staf Cemerlang)',
        'Kemahiran Profesional & Pengurusan Sistem TVET',
      ],
      previewStats: ['SISPEN3K Inovasi', 'iPMAS 2026', 'APC 2008 & 2015'],
    },
    {
      num: 4,
      title: 'Halaman 04: Kemahiran Bahasa, Impak & Rujukan',
      badge: 'Halaman 04',
      sections: [
        'Kemahiran Bahasa (Bahasa Melayu 100%, English 90%)',
        'Rujukan Profesional (Ketua Jabatan JTMK & Pengarah PTSS)',
        'Kekuatan Utama & Metrik Perkhidmatan TVET',
        'Impak & Sumbangan Komuniti & Kepengakapan',
      ],
      previewStats: ['Bahasa 100% & 90%', 'Rujukan PTSS', 'Pingat Pengakap'],
    },
  ];

  return (
    <section id="cv-section" className="bg-[#031528] py-20 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section matching Screenshot 2 */}
        <div className="text-left mb-12">
          <p className="text-amber-500 font-bold tracking-widest text-xs sm:text-sm uppercase mb-3">
            06 / CURRICULUM VITAE
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            CV infografik lengkap.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Lihat keempat-empat halaman atau buka fail PDF penuh.
          </p>
        </div>

        {/* 4 CV Infographic Cards Grid matching Screenshot 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cvPages.map(page => (
            <div
              key={page.num}
              onClick={() => setSelectedPage(page.num)}
              className="group cursor-pointer bg-white rounded-2xl p-4 text-slate-900 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col justify-between border border-slate-100/80 relative"
            >
              {/* Card Thumbnail Content (Mimicking Infographic Sheet Layout) */}
              <div className="space-y-3">
                {/* Header Strip */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                      CURRICULUM VITAE
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-600">PTSS</span>
                </div>

                {/* Profile Header Miniature in Sheet */}
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                  <p className="text-[11px] font-extrabold text-slate-900 leading-tight">
                    NASRUL EFFENDY BIN MAT NASIR
                  </p>
                  <p className="text-[9px] text-slate-500 font-medium mt-0.5">
                    Pensyarah Kanan (DH12) • JTMK
                  </p>
                </div>

                {/* Mini Sections Preview */}
                <div className="space-y-2 py-1">
                  {page.sections.map((sec, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1 shrink-0" />
                      <p className="text-[10px] text-slate-700 leading-snug line-clamp-2">
                        {sec}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Metric Badges */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                  {page.previewStats.map((stat, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Pill Badge matching Screenshot 2 */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center">
                <span className="w-full text-center py-2 bg-[#0c1f38] group-hover:bg-[#071628] text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>{page.badge}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Center Main Action Button: Buka / Muat Turun CV PDF */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            type="button"
            onClick={() => setSelectedPage(1)}
            className="bg-[#0a1e36] hover:bg-[#061424] border border-blue-800/80 hover:border-blue-700 text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-950/50 transition-all hover:scale-102 active:scale-98 flex items-center gap-2.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Buka / Muat Turun CV PDF</span>
          </button>
        </div>

        {/* Bottom Utility Bar: Language Selector & PDF/Chat Shortcuts */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          {/* Language Switcher Pill matching bottom-left of Screenshot 2 */}
          <div className="flex items-center gap-2 bg-[#091f3a] border border-slate-700/60 rounded-full px-4 py-2 text-white">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-slate-300">Bahasa:</span>
            <select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value as 'ms' | 'en')}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="ms" className="bg-slate-900 text-white">
                Bahasa Melayu
              </option>
              <option value="en" className="bg-slate-900 text-white">
                English
              </option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Dokumen Rasmi Jabatan Pendidikan Politeknik & Kolej Komuniti (JPPKK)
            </span>
          </div>
        </div>
      </div>

      {/* Full-Screen CV Page Inspection Modal */}
      {selectedPage !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-white text-slate-900 w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
            {/* Modal Header */}
            <div className="bg-[#0c1f38] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-md">
                  HALAMAN 0{selectedPage}
                </span>
                <h3 className="font-bold text-base sm:text-lg">
                  {cvPages[selectedPage - 1]?.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Cetak CV"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedPage(null)}
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body - Detailed Rendering of the specific CV Page */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* PAGE 1 CONTENT */}
              {selectedPage === 1 && (
                <div className="space-y-6">
                  {/* Top info card */}
                  <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                        GRED DH12 • PENSYARAH KANAN
                      </span>
                      <h4 className="text-2xl font-black text-[#0c1f38]">
                        {PERSONAL_INFO.name}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        {PERSONAL_INFO.department}, {PERSONAL_INFO.institution}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full font-medium">
                          Email: {PERSONAL_INFO.emailPTSS}
                        </span>
                        <span className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full font-medium">
                          Telefon: {PERSONAL_INFO.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Kelayakan Akademik */}
                  <div>
                    <h5 className="text-base font-bold text-[#0c1f38] flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      <span>Kelayakan Akademik</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {EDUCATIONS.map(edu => (
                        <div key={edu.id} className="p-4 rounded-xl border border-slate-200 bg-white">
                          <span className="text-xs font-bold text-amber-600">{edu.year}</span>
                          <h6 className="font-bold text-sm text-slate-900 mt-0.5">{edu.degree}</h6>
                          <p className="text-xs text-slate-600">{edu.field}</p>
                          <p className="text-xs text-slate-500 font-medium mt-1">{edu.institution}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bidang Kepakaran Utama */}
                  <div>
                    <h5 className="text-base font-bold text-[#0c1f38] flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span>Bidang Kepakaran Utama</span>
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                        <span className="text-xs font-bold text-blue-900 block">Rangkaian Komputer</span>
                        <span className="text-[11px] text-slate-600">Cisco, Routing, TCP/IP</span>
                      </div>
                      <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                        <span className="text-xs font-bold text-blue-900 block">Keselamatan Siber</span>
                        <span className="text-[11px] text-slate-600">InfoSec, CIA, Auditing</span>
                      </div>
                      <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                        <span className="text-xs font-bold text-blue-900 block">Inovasi Digital TVET</span>
                        <span className="text-[11px] text-slate-600">SISPEN3K, iPMAS, iCERT</span>
                      </div>
                      <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                        <span className="text-xs font-bold text-blue-900 block">AI Kreatif & Cloud</span>
                        <span className="text-[11px] text-slate-600">GenAI, Google Workspace</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 2 CONTENT */}
              {selectedPage === 2 && (
                <div className="space-y-6">
                  {/* Keahlian & Konsultansi */}
                  <div>
                    <h5 className="text-base font-bold text-[#0c1f38] flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span>Pelantikan Pakar, Konsultansi & Keahlian Profesional</span>
                    </h5>
                    <div className="space-y-2.5">
                      {MEMBERSHIPS.map(mem => (
                        <div key={mem.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between">
                          <div>
                            <h6 className="font-bold text-sm text-slate-900">{mem.body}</h6>
                            <p className="text-xs text-blue-700 font-semibold">{mem.role}</p>
                            <p className="text-xs text-slate-600 mt-1">{mem.badge}</p>
                          </div>
                          <span className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 rounded-md font-mono text-slate-600">
                            {mem.membershipNo}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Penyelidikan & Penerbitan Terpilih */}
                  <div>
                    <h5 className="text-base font-bold text-[#0c1f38] flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span>Penerbitan Jurnal & Persidangan Terkini</span>
                    </h5>
                    <div className="space-y-3">
                      {PUBLICATIONS.slice(0, 4).map(pub => (
                        <div key={pub.id} className="p-3.5 rounded-xl border border-slate-200 bg-white">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-amber-600">{pub.year}</span>
                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                              {pub.type}
                            </span>
                          </div>
                          <h6 className="font-bold text-sm text-slate-900 leading-snug">{pub.title}</h6>
                          <p className="text-xs text-slate-500 mt-1">{pub.venue}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 3 CONTENT */}
              {selectedPage === 3 && (
                <div className="space-y-6">
                  {/* Inovasi Unggul */}
                  <div>
                    <h5 className="text-base font-bold text-[#0c1f38] flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      <span>Inovasi & Pembangunan Produk Digital</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {INNOVATIONS.map(inv => (
                        <div key={inv.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 font-extrabold text-xs rounded-md">
                              {inv.acronym}
                            </span>
                            <span className="text-xs font-bold text-slate-500">{inv.year}</span>
                          </div>
                          <h6 className="font-bold text-sm text-slate-900">{inv.title}</h6>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{inv.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Anugerah & Pengiktirafan */}
                  <div>
                    <h5 className="text-base font-bold text-[#0c1f38] flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
                      <Award className="w-5 h-5 text-amber-500" />
                      <span>Anugerah & Pengiktirafan Cemerlang</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {AWARDS.map(awd => (
                        <div key={awd.id} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {awd.year}
                          </div>
                          <div>
                            <h6 className="font-bold text-xs text-slate-900 leading-snug">{awd.title}</h6>
                            <p className="text-[11px] text-slate-500 mt-0.5">{awd.issuer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 4 CONTENT */}
              {selectedPage === 4 && (
                <div className="space-y-6">
                  {/* Language & Key Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
                      <h5 className="text-sm font-bold text-[#0c1f38] mb-3">Kemahiran Bahasa</h5>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                            <span>Bahasa Melayu</span>
                            <span className="text-blue-700">100% (Fasih / Bahasa Ibunda)</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full w-full" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                            <span>English</span>
                            <span className="text-blue-700">90% (Professional Proficiency)</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full w-[90%]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
                      <h5 className="text-sm font-bold text-[#0c1f38] mb-3">Metrik Impak TVET</h5>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <span className="text-2xl font-black text-[#0c1f38]">20+</span>
                          <span className="text-[11px] text-slate-600 block font-medium">Tahun Perkhidmatan</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <span className="text-2xl font-black text-[#0c1f38]">5+</span>
                          <span className="text-[11px] text-slate-600 block font-medium">Sistem Inovasi</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <span className="text-2xl font-black text-[#0c1f38]">12+</span>
                          <span className="text-[11px] text-slate-600 block font-medium">Penerbitan Ilmiah</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <span className="text-2xl font-black text-[#0c1f38]">2x</span>
                          <span className="text-[11px] text-slate-600 block font-medium">Anugerah APC</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rujukan Profesional */}
                  <div>
                    <h5 className="text-base font-bold text-[#0c1f38] flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span>Rujukan Profesional</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {REFERENCES.map((ref, rIdx) => (
                        <div key={rIdx} className="p-4 rounded-xl border border-slate-200 bg-white">
                          <span className="text-xs font-bold text-amber-600">Rujukan {rIdx + 1}</span>
                          <h6 className="font-bold text-sm text-slate-900 mt-1">{ref.name}</h6>
                          <p className="text-xs text-blue-800 font-semibold">{ref.title}</p>
                          <p className="text-xs text-slate-600">{ref.department}</p>
                          <p className="text-xs text-slate-500 mt-1">{ref.institution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedPage > 1 && (
                  <button
                    onClick={() => setSelectedPage(selectedPage - 1)}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100"
                  >
                    ← Halaman Sebelumnya
                  </button>
                )}
                {selectedPage < 4 && (
                  <button
                    onClick={() => setSelectedPage(selectedPage + 1)}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-[#0c1f38] text-white rounded-lg hover:bg-[#071628]"
                  >
                    Halaman Seterusnya →
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedPage(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
