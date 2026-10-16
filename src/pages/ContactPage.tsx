import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Award,
  Building,
  Sparkles,
  Database,
} from 'lucide-react';
import { PERSONAL_INFO, EXPERTISE_SERVICES } from '../data/nadzEffendyData';
import { addDatabaseRecord } from '../services/databaseService';
import { PageId } from '../types';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Penceramah AI Mastery');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Automatically store this enquiry into the dynamic database
    addDatabaseRecord({
      category: 'tempahan_penceramah',
      title: `Tempahan / Mesej: ${subject || serviceCategory}`,
      description: `[Organisasi: ${organization || 'Individu'}] [Kategori: ${serviceCategory}] ${message}`,
      authorOrSubmitter: name,
      email: email,
      status: 'Baru',
      tags: ['Borang Web', serviceCategory],
    });

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <Mail className="w-4 h-4" />
            <span>Perhubungan & Tempahan Penceramah</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Hubungi & Khidmat Kepakaran</h1>
          <p className="text-sm text-slate-500">
            Hubungi En. Nasrul Effendy untuk urusan akademik PTSS, jemputan ceramah AI & keusahawanan, atau konsultasi teknikal.
          </p>
        </div>

        <button
          onClick={() => onNavigate('database')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer self-start md:self-auto"
        >
          <Database className="w-3.5 h-3.5 text-emerald-600" />
          <span>Lihat Log Tempahan di Database</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Col (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-6">
            <h3 className="font-extrabold text-slate-900 text-lg">Maklumat Perhubungan Rasmi</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Alamat Pejabat</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {PERSONAL_INFO.addressOffice}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0 mt-0.5">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Alamat Kediaman</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {PERSONAL_INFO.addressHome}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Emel Rasmi & Peribadi</h4>
                  <a
                    href={`mailto:${PERSONAL_INFO.emailPTSS}`}
                    className="block text-xs font-semibold text-indigo-600 hover:underline mt-1"
                  >
                    {PERSONAL_INFO.emailPTSS}
                  </a>
                  <a
                    href={`mailto:${PERSONAL_INFO.emailPersonal}`}
                    className="block text-xs text-slate-600 hover:underline"
                  >
                    {PERSONAL_INFO.emailPersonal}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Telefon & Faks</h4>
                  <p className="text-xs font-bold text-slate-800 mt-1">
                    Bimbit: <a href={`tel:${PERSONAL_INFO.phone}`} className="text-indigo-600">{PERSONAL_INFO.phone}</a>
                  </p>
                  <p className="text-xs text-slate-600">Pejabat: {PERSONAL_INFO.officePhone}</p>
                  <p className="text-xs text-slate-600">Faksimili: {PERSONAL_INFO.officeFax}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Khidmat Kepakaran List */}
          <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Senarai Khidmat Kepakaran</span>
            </h4>
            <div className="space-y-2">
              {EXPERTISE_SERVICES.map(exp => (
                <div key={exp.id} className="p-2.5 rounded-xl bg-white border border-indigo-200/60 text-xs">
                  <p className="font-bold text-slate-900">{exp.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{exp.organization}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking & Inquiry Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Borang Tersambung ke Pangkalan Data</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Hantar Mesej atau Tempahan Sesi
              </h3>
              <p className="text-xs text-slate-500">
                Sebarang permohonan akan disimpan terus ke dalam Pangkalan Data Portal untuk tindakan segera pensyarah.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-emerald-950">Terima Kasih, {name}!</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Mesej dan permohonan anda telah selamat direkodkan ke dalam Pangkalan Data Portal Nadz Effendy. Notifikasi emel telah dihantar.
                  </p>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setOrganization('');
                      setSubject('');
                      setMessage('');
                    }}
                    className="px-4 py-2 text-xs font-bold bg-white text-emerald-800 border border-emerald-300 rounded-xl hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    Hantar Mesej Lain
                  </button>
                  <button
                    onClick={() => onNavigate('database')}
                    className="px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Semak di Pangkalan Data
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Penuh Pemohon *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Nama anda atau wakil organisasi"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Alamat Emel *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="contoh@organisasi.gov.my"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Organisasi / Agensi / Institusi
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={e => setOrganization(e.target.value)}
                      placeholder="Contoh: CIDB, Politeknik, Universiti, NGO"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kategori Khidmat
                    </label>
                    <select
                      value={serviceCategory}
                      onChange={e => setServiceCategory(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden text-xs"
                    >
                      <option value="Penceramah AI Mastery">Penceramah AI Mastery & Keusahawanan</option>
                      <option value="Penceramah Google Workspace">Penceramah Google Workspace & Cloud</option>
                      <option value="Program CIDB Malaysia">Penceramah Pakar Program CIDB Malaysia</option>
                      <option value="Latihan Keusahawanan NCER">Latihan Keusahawanan Koridor Utara</option>
                      <option value="Konsultasi Akademik / Pelajar">Bimbingan Akademik / Pelajar TVET</option>
                      <option value="Lain-lain Urusan">Lain-lain Urusan Rasmi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tajuk / Subjek Permohonan
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Contoh: Jemputan Bengkel AI Generatif untuk Usahawan"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kandungan Mesej / Butiran Jemputan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Sila nyatakan tarikh cadangan, sasaran peserta, objektif program, atau pertanyaan anda..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 text-xs sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Hantar Permohonan & Rekod ke Database</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
