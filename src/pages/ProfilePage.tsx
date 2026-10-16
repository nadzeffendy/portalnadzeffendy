import React from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  Shield,
  MapPin,
  Phone,
  Mail,
  Printer,
  Calendar,
  Building,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  EDUCATIONS,
  SERVICE_HISTORY,
  MEMBERSHIPS,
  AWARDS,
  REFERENCES,
} from '../data/nadzEffendyData';
import { AvatarDisplay } from '../components/AvatarDisplay';
import { getAdminProfile, subscribeToAdminData } from '../services/adminDataService';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = React.useState(getAdminProfile());

  React.useEffect(() => {
    setProfile(getAdminProfile());
    const unsub = subscribeToAdminData(() => {
      setProfile(getAdminProfile());
    });
    return () => unsub();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Profile Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <User className="w-4 h-4" />
            <span>Curriculum Vitae Rasmi</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Biodata & Sejarah Perkhidmatan</h1>
          <p className="text-sm text-slate-500">
            Maklumat peribadi, kelayakan akademik, rekod perjawatan TVET, keahlian badan ikhtisas, dan pencapaian.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-slate-600" />
          <span>Cetak / Simpan PDF</span>
        </button>
      </div>

      {/* Biographical Hero Card with Official Photo */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6 sm:gap-8 border border-indigo-900/40">
        <AvatarDisplay size="lg" allowUpload={true} />
        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-500/20 text-cyan-300 text-xs font-bold border border-cyan-400/30">
            <span>Pegawai Pendidikan Pengajian Tinggi • {profile.grade || 'Gred DH12'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">{profile.name}</h2>
          <p className="text-xs sm:text-sm text-indigo-200 font-semibold">
            {profile.department}, {profile.institution}
          </p>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed pt-1">
            {profile.bio}
          </p>
        </div>
      </div>

      {/* Grid: Maklumat Peribadi & Perkhidmatan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Maklumat Peribadi */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-base pb-2 border-b border-slate-100">
            <User className="w-5 h-5 text-indigo-600" />
            <span>Maklumat Peribadi</span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Nama Penuh:</span>
              <span className="font-bold text-slate-900">{profile.name}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Jantina & Kaum:</span>
              <span className="font-semibold text-slate-900">{profile.gender || PERSONAL_INFO.gender} • {profile.ethnicity || PERSONAL_INFO.ethnicity}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500 font-medium">No. Telefon Bimbit:</span>
              <a href={`tel:${profile.phone}`} className="font-bold text-indigo-600 hover:underline">
                {profile.phone}
              </a>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500 font-medium">No. Telefon Pejabat / Faks:</span>
              <span className="font-semibold text-slate-900">{profile.officePhone || PERSONAL_INFO.officePhone} / {profile.officeFax || PERSONAL_INFO.officeFax}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Emel Rasmi PTSS:</span>
              <a href={`mailto:${profile.emailPTSS}`} className="font-semibold text-slate-800 hover:text-indigo-600">
                {profile.emailPTSS}
              </a>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Emel Alternatif:</span>
              <a href={`mailto:${profile.emailPersonal}`} className="font-semibold text-slate-800 hover:text-indigo-600">
                {profile.emailPersonal}
              </a>
            </div>
            <div className="pt-2">
              <span className="text-slate-500 font-medium block text-xs mb-1">Alamat Pejabat:</span>
              <p className="text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {PERSONAL_INFO.addressOffice}
              </p>
            </div>
            <div className="pt-1">
              <span className="text-slate-500 font-medium block text-xs mb-1">Alamat Rumah:</span>
              <p className="text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {PERSONAL_INFO.addressHome}
              </p>
            </div>
          </div>
        </div>

        {/* Maklumat Perkhidmatan */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-base pb-2 border-b border-slate-100">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span>Maklumat Perkhidmatan Awam & TVET</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Gelaran & Gred Jawatan Sekarang</span>
              <p className="text-base font-extrabold text-slate-900">{PERSONAL_INFO.title}</p>
              <p className="text-xs text-indigo-900 font-semibold">{PERSONAL_INFO.department}, {PERSONAL_INFO.institution}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Tarikh Lantikan Pertama</span>
                <span className="text-sm font-bold text-slate-900">{PERSONAL_INFO.firstAppointmentDate}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Tarikh Sah Jawatan</span>
                <span className="text-sm font-bold text-slate-900">{PERSONAL_INFO.confirmationDate}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700">Keahlian Badan Profesional</span>
              <div className="space-y-2">
                {MEMBERSHIPS.map(mem => (
                  <div key={mem.id} className="text-xs flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200/60">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">{mem.body}</p>
                      <p className="text-[11px] text-slate-500">No. Ahli: <span className="font-mono font-bold text-indigo-600">{mem.membershipNo}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kelulusan Akademik */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg">
          <GraduationCap className="w-6 h-6 text-indigo-600" />
          <span>Kelulusan Akademik</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EDUCATIONS.map(edu => (
            <div
              key={edu.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-indigo-300 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Tahun {edu.year}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Ijazah Rasmi</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{edu.degree}</h3>
              <p className="text-xs font-semibold text-slate-600">Bidang: {edu.field}</p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                <Building className="w-3.5 h-3.5 text-indigo-600" />
                <span>{edu.institution}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pengalaman Bekerja Timeline */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg">
          <Briefcase className="w-6 h-6 text-indigo-600" />
          <span>Pengalaman Bekerja & Sejarah Perkhidmatan</span>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200 space-y-8">
          {SERVICE_HISTORY.map((srv, idx) => (
            <div key={srv.id} className="relative group">
              {/* Dot on timeline */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 group-hover:scale-125 transition-transform" />

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2 group-hover:border-indigo-300 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800">
                    {srv.period}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{srv.institution}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{srv.role}</h3>

                {srv.department && (
                  <p className="text-xs text-indigo-700 font-medium">{srv.department}</p>
                )}

                {srv.highlights && srv.highlights.length > 0 && (
                  <ul className="pt-2 space-y-1">
                    {srv.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Penghargaan & Anugerah */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-lg">
          <Award className="w-6 h-6 text-amber-600" />
          <span>Penghargaan, Anugerah & Pingat</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AWARDS.map(awd => (
            <div
              key={awd.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-amber-300 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                  {awd.year}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">{awd.type}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm leading-snug">{awd.title}</h4>
              <p className="text-xs text-slate-500 pt-1">{awd.issuer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pegawai Rujukan */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
          <User className="w-6 h-6 text-slate-700" />
          <span>Pegawai Rujukan Rasmi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REFERENCES.map((ref, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
            >
              <h4 className="text-base font-bold text-slate-900">{ref.name}</h4>
              <p className="text-xs font-bold text-indigo-600">{ref.title}</p>
              <p className="text-xs text-slate-600">{ref.department}</p>
              <p className="text-xs text-slate-600 font-semibold">{ref.institution}</p>
              <p className="text-[11px] text-slate-500">{ref.location}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
