import React, { useState, useEffect, useRef } from 'react';
import {
  Database,
  Plus,
  Trash2,
  Edit2,
  Search,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ExternalLink,
  Filter,
  FileCode,
  HardDrive,
  Globe,
  Link as LinkIcon,
  BookOpen,
  Lightbulb,
  GraduationCap,
  X,
  AlertTriangle,
  FolderOpen,
  LogOut,
  Key,
  ShieldCheck,
  User,
  Save,
  Image as ImageIcon,
  Camera,
  Award,
  Briefcase,
  FileText,
  Eye,
  Check,
} from 'lucide-react';
import {
  PublicationItem,
  InnovationProject,
  TeachingCourse,
  NavigationLink,
  ExpertiseItem,
  ResearchItem,
  AdminCVData,
  CVImageAttachment,
  Education,
  ServiceRecord,
  AwardItem,
} from '../types';
import {
  getAdminProfile,
  updateAdminProfile,
  getAdminExpertise,
  addAdminExpertise,
  updateAdminExpertise,
  deleteAdminExpertise,
  getAdminCourses,
  addAdminCourse,
  updateAdminCourse,
  deleteAdminCourse,
  getAdminResearch,
  addAdminResearch,
  updateAdminResearch,
  deleteAdminResearch,
  getAdminInnovations,
  addAdminInnovation,
  updateAdminInnovation,
  deleteAdminInnovation,
  getAdminCVData,
  updateAdminCVData,
  uploadCVPhoto,
  addCVImageAttachment,
  deleteCVImageAttachment,
  addCVEducation,
  updateCVEducation,
  deleteCVEducation,
  addCVExperience,
  updateCVExperience,
  deleteCVExperience,
  addCVAward,
  updateCVAward,
  deleteCVAward,
  getAdminNavLinks,
  addAdminNavLink,
  updateAdminNavLink,
  deleteAdminNavLink,
  subscribeToAdminData,
  exportAllAdminDataJSON,
  importAllAdminDataJSON,
  resetAllAdminDataToDefault,
} from '../services/adminDataService';
import {
  isAdminLoggedIn,
  logoutAdmin,
  subscribeToAdminAuth,
  changeAdminPassword,
} from '../services/adminAuthService';
import { AdminLoginCard } from '../components/AdminLoginCard';
import { ConfirmModal } from '../components/ConfirmModal';

type AdminTab = 'profile' | 'kepakaran' | 'courses' | 'penyelidikan' | 'innovations' | 'cv' | 'navlinks';

export const DatabaseHubPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminLoggedIn());
  const [currentTab, setCurrentTab] = useState<AdminTab>('profile');
  const [search, setSearch] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Core Data States
  const [profile, setProfile] = useState(getAdminProfile());
  const [expertiseList, setExpertiseList] = useState<ExpertiseItem[]>([]);
  const [coursesList, setCoursesList] = useState<TeachingCourse[]>([]);
  const [researchList, setResearchList] = useState<ResearchItem[]>([]);
  const [innovations, setInnovations] = useState<InnovationProject[]>([]);
  const [cvData, setCvData] = useState<AdminCVData>(getAdminCVData());
  const [navLinks, setNavLinks] = useState<NavigationLink[]>([]);

  // Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Confirmation Modal
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string; type: string } | null>(null);

  // Profile Form State
  const [profileName, setProfileName] = useState(profile.name);
  const [profileGrade, setProfileGrade] = useState(profile.grade);
  const [profileTitle, setProfileTitle] = useState(profile.title);
  const [profileDept, setProfileDept] = useState(profile.department);
  const [profileInst, setProfileInst] = useState(profile.institution);
  const [profilePhone, setProfilePhone] = useState(profile.phone);
  const [profileEmailPTSS, setProfileEmailPTSS] = useState(profile.emailPTSS);
  const [profileEmailPersonal, setProfileEmailPersonal] = useState(profile.emailPersonal || '');
  const [profileBio, setProfileBio] = useState(profile.bio);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(profile.photoUrl || '');
  const profilePhotoInputRef = useRef<HTMLInputElement>(null);

  // CV Image & Media Form State
  const [cvPhotoInputUrl, setCvPhotoInputUrl] = useState(cvData.photoUrl || '');
  const [cvPhotoCaption, setCvPhotoCaption] = useState(cvData.photoCaption || '');
  const [cvPdfUrl, setCvPdfUrl] = useState(cvData.pdfDownloadUrl || '');
  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const cvAttachmentInputRef = useRef<HTMLInputElement>(null);

  // Add/Edit Modals
  const [isExpertiseModalOpen, setIsExpertiseModalOpen] = useState(false);
  const [expertiseModalMode, setExpertiseModalMode] = useState<'add' | 'edit'>('add');
  const [activeExpertiseId, setActiveExpertiseId] = useState<string | null>(null);
  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState('Tenaga Pengajar');
  const [expLevel, setExpLevel] = useState<string>('Tenaga Pengajar');
  const [expDesc, setExpDesc] = useState('');
  const [expTags, setExpTags] = useState('');
  const [expBadge, setExpBadge] = useState('');
  const [expOrg, setExpOrg] = useState('');

  // Course Add/Edit Modal
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseModalMode, setCourseModalMode] = useState<'add' | 'edit'>('add');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [crsCode, setCrsCode] = useState('');
  const [crsName, setCrsName] = useState('');
  const [crsLevel, setCrsLevel] = useState('Diploma Teknologi Maklumat');
  const [crsDesc, setCrsDesc] = useState('');
  const [crsTags, setCrsTags] = useState('');
  const [crsMaterialsCount, setCrsMaterialsCount] = useState(12);
  const [crsWebsiteUrl, setCrsWebsiteUrl] = useState('https://cidos.ptss.edu.my');
  const [crsDriveUrl, setCrsDriveUrl] = useState('');

  // Research Add/Edit Modal
  const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);
  const [researchModalMode, setResearchModalMode] = useState<'add' | 'edit'>('add');
  const [activeResearchId, setActiveResearchId] = useState<string | null>(null);
  const [resTitle, setResTitle] = useState('');
  const [resYear, setResYear] = useState('2026');
  const [resType, setResType] = useState<ResearchItem['type']>('Jurnal Berindeks');
  const [resVenue, setResVenue] = useState('');
  const [resDoi, setResDoi] = useState('');
  const [resSummary, setResSummary] = useState('');
  const [resTags, setResTags] = useState('');
  const [resGrant, setResGrant] = useState('');
  const [resStatus, setResStatus] = useState<ResearchItem['status']>('Diterbitkan');
  const [resDriveUrl, setResDriveUrl] = useState('');
  const [resWebsiteUrl, setResWebsiteUrl] = useState('');

  // Innovation Add/Edit Modal
  const [isInnoModalOpen, setIsInnoModalOpen] = useState(false);
  const [innoModalMode, setInnoModalMode] = useState<'add' | 'edit'>('add');
  const [activeInnoId, setActiveInnoId] = useState<string | null>(null);
  const [innoTitle, setInnoTitle] = useState('');
  const [innoAcronym, setInnoAcronym] = useState('');
  const [innoYear, setInnoYear] = useState('2026');
  const [innoCategory, setInnoCategory] = useState('');
  const [innoDesc, setInnoDesc] = useState('');
  const [innoFeatures, setInnoFeatures] = useState('');
  const [innoStatus, setInnoStatus] = useState<'Active' | 'Completed' | 'In Progress'>('Active');
  const [innoDriveUrl, setInnoDriveUrl] = useState('');
  const [innoWebsiteUrl, setInnoWebsiteUrl] = useState('');
  const [innoAwards, setInnoAwards] = useState('');

  // CV Sub-items Modals (Education, Service, Award, Attachment)
  const [isCVEduModalOpen, setIsCVEduModalOpen] = useState(false);
  const [cvEduDegree, setCvEduDegree] = useState('');
  const [cvEduField, setCvEduField] = useState('');
  const [cvEduInst, setCvEduInst] = useState('');
  const [cvEduYear, setCvEduYear] = useState('2026');

  const [isCVExpModalOpen, setIsCVExpModalOpen] = useState(false);
  const [cvExpRole, setCvExpRole] = useState('');
  const [cvExpPeriod, setCvExpPeriod] = useState('');
  const [cvExpInst, setCvExpInst] = useState('');
  const [cvExpDept, setCvExpDept] = useState('');
  const [cvExpHighlights, setCvExpHighlights] = useState('');

  const [isCVAwardModalOpen, setIsCVAwardModalOpen] = useState(false);
  const [cvAwardTitle, setCvAwardTitle] = useState('');
  const [cvAwardYear, setCvAwardYear] = useState('2025');
  const [cvAwardIssuer, setCvAwardIssuer] = useState('');
  const [cvAwardType, setCvAwardType] = useState<'Anugerah' | 'Pingat' | 'Sijil'>('Anugerah');

  const [isCVAttachModalOpen, setIsCVAttachModalOpen] = useState(false);
  const [cvAttachTitle, setCvAttachTitle] = useState('');
  const [cvAttachUrl, setCvAttachUrl] = useState('');
  const [cvAttachType, setCvAttachType] = useState<CVImageAttachment['type']>('certificate');
  const [cvAttachDesc, setCvAttachDesc] = useState('');

  // Navigation Links Modal
  const [isNavLinkModalOpen, setIsNavLinkModalOpen] = useState(false);
  const [navTitle, setNavTitle] = useState('');
  const [navUrl, setNavUrl] = useState('');
  const [navType, setNavType] = useState<'website' | 'drive'>('website');
  const [navCategory, setNavCategory] = useState<NavigationLink['category']>('teroka');
  const [navDesc, setNavDesc] = useState('');
  const [navBadge, setNavBadge] = useState('');

  const loadAll = () => {
    const p = getAdminProfile();
    setProfile(p);
    setProfileName(p.name);
    setProfileGrade(p.grade);
    setProfileTitle(p.title);
    setProfileDept(p.department);
    setProfileInst(p.institution);
    setProfilePhone(p.phone);
    setProfileEmailPTSS(p.emailPTSS);
    setProfileEmailPersonal(p.emailPersonal || '');
    setProfileBio(p.bio);
    setProfilePhotoUrl(p.photoUrl || '');

    setExpertiseList(getAdminExpertise());
    setCoursesList(getAdminCourses());
    setResearchList(getAdminResearch());
    setInnovations(getAdminInnovations());

    const cv = getAdminCVData();
    setCvData(cv);
    setCvPhotoInputUrl(cv.photoUrl || '');
    setCvPhotoCaption(cv.photoCaption || '');
    setCvPdfUrl(cv.pdfDownloadUrl || '');

    setNavLinks(getAdminNavLinks());
  };

  useEffect(() => {
    setIsAuthenticated(isAdminLoggedIn());
    loadAll();

    const unsubAuth = subscribeToAdminAuth(auth => {
      setIsAuthenticated(auth);
    });

    const unsubData = subscribeToAdminData(() => {
      loadAll();
    });

    return () => {
      unsubAuth();
      unsubData();
    };
  }, []);

  const notify = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    notify('Sesi admin ditamatkan dengan selamat.');
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 5) {
      alert('Kata laluan mestilah sekurang-kurangnya 5 aksara.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Pengesahan kata laluan tidak sepadan.');
      return;
    }
    const success = changeAdminPassword(newPassword);
    if (success) {
      notify('Kata laluan pentadbir berjaya dikemaskini!');
      setIsPasswordModalOpen(false);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('Ralat menukar kata laluan.');
    }
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const success = updateAdminProfile({
      name: profileName,
      grade: profileGrade,
      title: profileTitle,
      department: profileDept,
      institution: profileInst,
      phone: profilePhone,
      emailPTSS: profileEmailPTSS,
      emailPersonal: profileEmailPersonal,
      bio: profileBio,
      photoUrl: profilePhotoUrl,
    });
    if (success) {
      notify('Profil & maklumat rasmi berjaya disimpan!');
    } else {
      alert('Gagal mengemas kini profil.');
    }
  };

  // Profile Photo Upload Handler (FileReader to Base64)
  const handleProfilePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert('Saiz fail melebihi 4MB. Sila pilih gambar yang lebih kecil.');
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      const base64 = event.target?.result as string;
      if (base64) {
        setProfilePhotoUrl(base64);
        updateAdminProfile({ photoUrl: base64 });
        uploadCVPhoto(base64);
        notify('Gambar potret baru berjaya dimuat naik & diselaraskan ke CV!');
      }
    };
    reader.readAsDataURL(file);
  };

  // CV Photo File Upload Handler
  const handleCVPhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert('Saiz fail melebihi 4MB. Sila pilih gambar yang lebih kecil.');
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      const base64 = event.target?.result as string;
      if (base64) {
        setCvPhotoInputUrl(base64);
        uploadCVPhoto(base64, cvPhotoCaption);
        setProfilePhotoUrl(base64);
        notify('Gambar potret CV berjaya dimuat naik & diselaraskan!');
      }
    };
    reader.readAsDataURL(file);
  };

  // CV Save Photo & PDF Settings
  const handleSaveCVMediaSettings = (e: React.FormEvent) => {
    e.preventDefault();
    uploadCVPhoto(cvPhotoInputUrl, cvPhotoCaption);
    updateAdminCVData({ pdfDownloadUrl: cvPdfUrl });
    notify('Tetapan imej CV & pautan PDF berjaya disimpan!');
  };

  // Expertise Form Submit
  const handleSaveExpertise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim()) {
      alert('Sila masukkan tajuk kepakaran.');
      return;
    }
    const tagsArray = expTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (expertiseModalMode === 'add') {
      addAdminExpertise({
        title: expTitle,
        category: expCategory,
        level: expLevel,
        description: expDesc,
        tags: tagsArray,
        badge: expBadge,
        organization: expOrg,
      });
      notify('Bidang kepakaran baru berjaya ditambah!');
    } else if (activeExpertiseId) {
      updateAdminExpertise(activeExpertiseId, {
        title: expTitle,
        category: expCategory,
        level: expLevel,
        description: expDesc,
        tags: tagsArray,
        badge: expBadge,
        organization: expOrg,
      });
      notify('Bidang kepakaran berjaya dikemaskini!');
    }
    setIsExpertiseModalOpen(false);
  };

  const handleOpenEditExpertise = (item: ExpertiseItem) => {
    setExpertiseModalMode('edit');
    setActiveExpertiseId(item.id);
    setExpTitle(item.title);
    setExpCategory(item.category);
    setExpLevel(item.level || 'Tenaga Pengajar');
    setExpDesc(item.description);
    setExpTags((item.tags || []).join(', '));
    setExpBadge(item.badge || '');
    setExpOrg(item.organization || '');
    setIsExpertiseModalOpen(true);
  };

  const handleOpenAddExpertise = () => {
    setExpertiseModalMode('add');
    setActiveExpertiseId(null);
    setExpTitle('');
    setExpCategory('Tenaga Pengajar');
    setExpLevel('Tenaga Pengajar');
    setExpDesc('');
    setExpTags('');
    setExpBadge('');
    setExpOrg('PTSS / JTMK');
    setIsExpertiseModalOpen(true);
  };

  // Course Form Submit & Handlers
  const handleOpenAddCourse = () => {
    setCourseModalMode('add');
    setActiveCourseId(null);
    setCrsCode('');
    setCrsName('');
    setCrsLevel('Diploma Teknologi Maklumat');
    setCrsDesc('');
    setCrsTags('');
    setCrsMaterialsCount(12);
    setCrsWebsiteUrl('https://cidos.ptss.edu.my');
    setCrsDriveUrl('');
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (item: TeachingCourse) => {
    setCourseModalMode('edit');
    setActiveCourseId(item.id);
    setCrsCode(item.code);
    setCrsName(item.name);
    setCrsLevel(item.level);
    setCrsDesc(item.description);
    setCrsTags((item.tags || []).join(', '));
    setCrsMaterialsCount(item.materialsCount || 12);
    setCrsWebsiteUrl(item.websiteUrl || 'https://cidos.ptss.edu.my');
    setCrsDriveUrl(item.driveUrl || '');
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crsCode.trim() || !crsName.trim()) {
      alert('Sila masukkan kod dan nama kursus pengajian.');
      return;
    }
    const tagsArray = crsTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (courseModalMode === 'add') {
      addAdminCourse({
        code: crsCode.trim().toUpperCase(),
        name: crsName.trim(),
        level: crsLevel.trim(),
        description: crsDesc.trim(),
        tags: tagsArray,
        materialsCount: Number(crsMaterialsCount) || 12,
        websiteUrl: crsWebsiteUrl.trim() || 'https://cidos.ptss.edu.my',
        driveUrl: crsDriveUrl.trim(),
      });
      notify('Kursus pengajian TVET berjaya ditambah!');
    } else if (activeCourseId) {
      updateAdminCourse(activeCourseId, {
        code: crsCode.trim().toUpperCase(),
        name: crsName.trim(),
        level: crsLevel.trim(),
        description: crsDesc.trim(),
        tags: tagsArray,
        materialsCount: Number(crsMaterialsCount) || 12,
        websiteUrl: crsWebsiteUrl.trim() || 'https://cidos.ptss.edu.my',
        driveUrl: crsDriveUrl.trim(),
      });
      notify('Kursus pengajian TVET berjaya dikemaskini!');
    }
    setIsCourseModalOpen(false);
  };

  // Research Form Submit
  const handleSaveResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim()) {
      alert('Sila masukkan tajuk penyelidikan.');
      return;
    }
    const tagsArray = resTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (researchModalMode === 'add') {
      addAdminResearch({
        title: resTitle,
        year: resYear,
        type: resType,
        venue: resVenue,
        doi: resDoi,
        summary: resSummary,
        tags: tagsArray,
        grantAmount: resGrant,
        status: resStatus,
        driveUrl: resDriveUrl,
        websiteUrl: resWebsiteUrl,
      });
      notify('Penyelidikan / penerbitan baru berjaya ditambah!');
    } else if (activeResearchId) {
      updateAdminResearch(activeResearchId, {
        title: resTitle,
        year: resYear,
        type: resType,
        venue: resVenue,
        doi: resDoi,
        summary: resSummary,
        tags: tagsArray,
        grantAmount: resGrant,
        status: resStatus,
        driveUrl: resDriveUrl,
        websiteUrl: resWebsiteUrl,
      });
      notify('Penyelidikan berjaya dikemaskini!');
    }
    setIsResearchModalOpen(false);
  };

  const handleOpenEditResearch = (item: ResearchItem) => {
    setResearchModalMode('edit');
    setActiveResearchId(item.id);
    setResTitle(item.title);
    setResYear(item.year);
    setResType(item.type);
    setResVenue(item.venue);
    setResDoi(item.doi || '');
    setResSummary(item.summary);
    setResTags((item.tags || []).join(', '));
    setResGrant(item.grantAmount || '');
    setResStatus(item.status);
    setResDriveUrl(item.driveUrl || '');
    setResWebsiteUrl(item.websiteUrl || '');
    setIsResearchModalOpen(true);
  };

  const handleOpenAddResearch = () => {
    setResearchModalMode('add');
    setActiveResearchId(null);
    setResTitle('');
    setResYear(new Date().getFullYear().toString());
    setResType('Jurnal Berindeks');
    setResVenue('');
    setResDoi('');
    setResSummary('');
    setResTags('');
    setResGrant('');
    setResStatus('Diterbitkan');
    setResDriveUrl('');
    setResWebsiteUrl('');
    setIsResearchModalOpen(true);
  };

  // Innovation Form Submit
  const handleSaveInnovation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!innoTitle.trim() || !innoAcronym.trim()) {
      alert('Sila lengkapkan tajuk dan akronim inovasi.');
      return;
    }
    const featuresArray = innoFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    if (innoModalMode === 'add') {
      addAdminInnovation({
        title: innoTitle,
        acronym: innoAcronym,
        year: innoYear,
        category: innoCategory,
        description: innoDesc,
        features: featuresArray,
        status: innoStatus,
        driveUrl: innoDriveUrl,
        websiteUrl: innoWebsiteUrl,
        iconName: 'Sparkles',
      });
      notify('Projek inovasi baru berjaya disimpan dalam sistem admin!');
    } else if (activeInnoId) {
      updateAdminInnovation(activeInnoId, {
        title: innoTitle,
        acronym: innoAcronym,
        year: innoYear,
        category: innoCategory,
        description: innoDesc,
        features: featuresArray,
        status: innoStatus,
        driveUrl: innoDriveUrl,
        websiteUrl: innoWebsiteUrl,
      });
      notify('Projek inovasi berjaya dikemaskini dalam admin!');
    }
    setIsInnoModalOpen(false);
  };

  const handleOpenEditInno = (item: InnovationProject) => {
    setInnoModalMode('edit');
    setActiveInnoId(item.id);
    setInnoTitle(item.title);
    setInnoAcronym(item.acronym);
    setInnoYear(item.year);
    setInnoCategory(item.category);
    setInnoDesc(item.description);
    setInnoFeatures((item.features || []).join('\n'));
    setInnoStatus(item.status);
    setInnoDriveUrl(item.driveUrl || '');
    setInnoWebsiteUrl(item.websiteUrl || '');
    setIsInnoModalOpen(true);
  };

  const handleOpenAddInno = () => {
    setInnoModalMode('add');
    setActiveInnoId(null);
    setInnoTitle('');
    setInnoAcronym('');
    setInnoYear(new Date().getFullYear().toString());
    setInnoCategory('Sistem Penilaian Digital TVET');
    setInnoDesc('');
    setInnoFeatures('');
    setInnoStatus('Active');
    setInnoDriveUrl('');
    setInnoWebsiteUrl('');
    setIsInnoModalOpen(true);
  };

  // CV Attachment Upload Handler
  const handleCVAttachmentFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      const base64 = event.target?.result as string;
      if (base64) {
        setCvAttachUrl(base64);
        if (!cvAttachTitle) {
          setCvAttachTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCVAttachment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvAttachTitle.trim() || !cvAttachUrl.trim()) {
      alert('Sila masukkan tajuk dan pilih imej atau pautan URL.');
      return;
    }
    addCVImageAttachment({
      title: cvAttachTitle,
      url: cvAttachUrl,
      type: cvAttachType,
      description: cvAttachDesc,
    });
    notify('Lampiran imej dokumen CV berjaya ditambah!');
    setIsCVAttachModalOpen(false);
    setCvAttachTitle('');
    setCvAttachUrl('');
    setCvAttachDesc('');
  };

  // CV Education Submit
  const handleSaveCVEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvEduDegree.trim() || !cvEduInst.trim()) {
      alert('Sila lengkapkan maklumat kelayakan.');
      return;
    }
    addCVEducation({
      degree: cvEduDegree,
      field: cvEduField,
      institution: cvEduInst,
      year: cvEduYear,
    });
    notify('Kelayakan akademik baru berjaya ditambah ke CV!');
    setIsCVEduModalOpen(false);
    setCvEduDegree('');
    setCvEduField('');
    setCvEduInst('');
  };

  // CV Experience Submit
  const handleSaveCVExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvExpRole.trim() || !cvExpInst.trim()) {
      alert('Sila lengkapkan maklumat perkhidmatan.');
      return;
    }
    const hList = cvExpHighlights
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);
    addCVExperience({
      role: cvExpRole,
      period: cvExpPeriod,
      institution: cvExpInst,
      department: cvExpDept,
      highlights: hList,
    });
    notify('Sejarah perkhidmatan baru berjaya ditambah ke CV!');
    setIsCVExpModalOpen(false);
    setCvExpRole('');
    setCvExpPeriod('');
    setCvExpInst('');
    setCvExpDept('');
    setCvExpHighlights('');
  };

  // CV Award Submit
  const handleSaveCVAward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvAwardTitle.trim() || !cvAwardIssuer.trim()) {
      alert('Sila lengkapkan maklumat anugerah.');
      return;
    }
    addCVAward({
      title: cvAwardTitle,
      year: cvAwardYear,
      issuer: cvAwardIssuer,
      type: cvAwardType,
    });
    notify('Anugerah baru berjaya ditambah ke CV!');
    setIsCVAwardModalOpen(false);
    setCvAwardTitle('');
    setCvAwardIssuer('');
  };

  // NavLink Submit
  const handleSaveNavLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!navTitle.trim() || !navUrl.trim()) {
      alert('Sila masukkan tajuk dan URL.');
      return;
    }
    addAdminNavLink({
      title: navTitle,
      url: navUrl,
      type: navType,
      category: navCategory,
      description: navDesc,
      badge: navBadge || (navType === 'drive' ? 'Google Drive' : 'Website'),
    });
    notify('Pautan navigasi rasmi berjaya ditambah!');
    setIsNavLinkModalOpen(false);
    setNavTitle('');
    setNavUrl('');
    setNavDesc('');
    setNavBadge('');
  };

  // Delete Action Confirm
  const triggerDelete = (id: string, title: string, type: string) => {
    setDeleteTarget({ id, title, type });
    setConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const { id, type } = deleteTarget;
    if (type === 'expertise') {
      deleteAdminExpertise(id);
      notify('Bidang kepakaran berjaya dipadam.');
    } else if (type === 'course') {
      deleteAdminCourse(id);
      notify('Kursus pengajian TVET berjaya dipadam.');
    } else if (type === 'research') {
      deleteAdminResearch(id);
      notify('Penyelidikan berjaya dipadam.');
    } else if (type === 'innovation') {
      deleteAdminInnovation(id);
      notify('Projek inovasi berjaya dipadam.');
    } else if (type === 'cv-image') {
      deleteCVImageAttachment(id);
      notify('Lampiran imej CV berjaya dipadam.');
    } else if (type === 'cv-edu') {
      deleteCVEducation(id);
      notify('Kelayakan akademik dipadam dari CV.');
    } else if (type === 'cv-exp') {
      deleteCVExperience(id);
      notify('Sejarah perkhidmatan dipadam dari CV.');
    } else if (type === 'cv-award') {
      deleteCVAward(id);
      notify('Anugerah dipadam dari CV.');
    } else if (type === 'navlink') {
      deleteAdminNavLink(id);
      notify('Pautan navigasi dipadam.');
    }
    setConfirmModalOpen(false);
    setDeleteTarget(null);
  };

  // Backup & Reset Handlers
  const handleExportBackup = () => {
    const jsonStr = exportAllAdminDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_admin_nadzeffendy_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify('Sandaran data (JSON) berjaya dimuat turun!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const content = ev.target?.result as string;
      if (content) {
        const ok = importAllAdminDataJSON(content);
        if (ok) {
          notify('Data berjaya dipulihkan daripada fail sandaran!');
        } else {
          alert('Format fail JSON tidak sah.');
        }
      }
    };
    reader.readAsText(file);
  };

  // If Not Authenticated, Gate With AdminLoginCard
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] bg-slate-900 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full">
          <AdminLoginCard onSuccess={() => setIsAuthenticated(true)} />
        </div>
      </div>
    );
  }

  // Filtered views for search
  const filteredExpertise = expertiseList.filter(
    e =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredCourses = coursesList.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.level.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredResearch = researchList.filter(
    r =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.venue.toLowerCase().includes(search.toLowerCase()) ||
      r.summary.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.year.includes(search)
  );

  const filteredInnovations = innovations.filter(
    i =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.acronym.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Top Banner & Control Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0c1f38] via-[#102a4c] to-[#0a1e36] text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-700/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>MOD PENTADBIR KESELAMATAN TINGGI (CRUD & KAWALAN LAMAN)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
            Panel Kawalan Pentadbir & Pengurusan Kandungan
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Pengurusan berpusat tanpa sentuh kod: CRUD lengkap bagi Profil, Kepakaran, Penyelidikan, Inovasi TVET, serta CV & Galeri Imej Potret.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportBackup}
            className="px-3.5 py-2 bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Eksport sandaran semua data ke fail JSON"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Sandaran Data (JSON)</span>
          </button>

          <label className="px-3.5 py-2 bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs">
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pulih Data</span>
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>

          <button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)}
            className="px-3.5 py-2 bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>Tukar Password</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3.5 py-2 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/60 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Keluar</span>
          </button>
        </div>
      </div>

      {/* Floating Status Notification */}
      {statusMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-3 rounded-xl shadow-sm flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main 5 Admin Tabs explicitly matching user prompt: Profil, Kepakaran, Penyelidikan, Inovasi, CV */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {/* TAB 1: PROFIL */}
        <button
          type="button"
          onClick={() => {
            setCurrentTab('profile');
            setSearch('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === 'profile'
              ? 'bg-[#0c1f38] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <User className="w-4 h-4 text-amber-400" />
          <span>1. Profil & Biodata</span>
        </button>

        {/* TAB 2: KEPAKARAN */}
        <button
          type="button"
          onClick={() => {
            setCurrentTab('kepakaran');
            setSearch('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === 'kepakaran'
              ? 'bg-[#0c1f38] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>2. Kepakaran ({expertiseList.length})</span>
        </button>

        {/* TAB 3: KURSUS PENGAJIAN JTMK & TVET */}
        <button
          type="button"
          onClick={() => {
            setCurrentTab('courses');
            setSearch('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === 'courses'
              ? 'bg-[#0c1f38] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          <span>3. Kursus TVET ({coursesList.length})</span>
        </button>

        {/* TAB 4: PENYELIDIKAN */}
        <button
          type="button"
          onClick={() => {
            setCurrentTab('penyelidikan');
            setSearch('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === 'penyelidikan'
              ? 'bg-[#0c1f38] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span>4. Penyelidikan ({researchList.length})</span>
        </button>

        {/* TAB 5: INOVASI */}
        <button
          type="button"
          onClick={() => {
            setCurrentTab('innovations');
            setSearch('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === 'innovations'
              ? 'bg-[#0c1f38] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>5. Inovasi SISPEN3K ({innovations.length})</span>
        </button>

        {/* TAB 6: CV DENGAN GAMBAR / IMEJ */}
        <button
          type="button"
          onClick={() => {
            setCurrentTab('cv');
            setSearch('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === 'cv'
              ? 'bg-[#0c1f38] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-pink-400" />
          <span>6. CV & Galeri Imej/Foto</span>
        </button>

        {/* UTILITY TAB: PAUTAN NAVIGASI */}
        <button
          type="button"
          onClick={() => {
            setCurrentTab('navlinks');
            setSearch('');
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ml-auto ${
            currentTab === 'navlinks'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HardDrive className="w-3.5 h-3.5 text-slate-400" />
          <span>Pautan Luar ({navLinks.length})</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: PROFIL & BIODATA CRUD
          ========================================================================= */}
      {currentTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Maklumat Profil & Biodata Rasmi
                </h3>
                <p className="text-xs text-slate-500">
                  Kemaskini maklumat hero, gelaran akademik DH12, maklumat perhubungan, dan foto potret rasmi.
                </p>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
              >
                <Save className="w-4 h-4 text-amber-300" />
                <span>Simpan Perubahan Profil</span>
              </button>
            </div>

            {/* Profile Photo / Avatar Setting with Instant Upload */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md bg-white flex items-center justify-center">
                  {profilePhotoUrl ? (
                    <img src={profilePhotoUrl} alt="Foto Profil" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-slate-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => profilePhotoInputRef.current?.click()}
                  className="absolute inset-0 bg-slate-900/60 rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] font-bold cursor-pointer"
                >
                  <Camera className="w-5 h-5 mb-1 text-amber-400" />
                  <span>Tukar Foto</span>
                </button>
                <input
                  ref={profilePhotoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoFileChange}
                  className="hidden"
                />
              </div>

              <div className="space-y-2 flex-1 w-full text-center sm:text-left">
                <h4 className="text-sm font-bold text-slate-900">Foto Potret Profil & Hero</h4>
                <p className="text-xs text-slate-500">
                  Muat naik imej potret resolusi tinggi (PNG/JPG) atau tampal pautan URL gambar luaran. Imej ini dipaparkan secara langsung pada Laman Utama, Profil, dan CV.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => profilePhotoInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-600" />
                    <span>Muat Naik Fail Imej</span>
                  </button>
                  <input
                    type="text"
                    value={profilePhotoUrl}
                    onChange={e => setProfilePhotoUrl(e.target.value)}
                    placeholder="Atau tampal URL imej (https://...)"
                    className="flex-1 min-w-[200px] text-xs p-1.5 bg-white border border-slate-200 rounded-lg focus:outline-hidden"
                  />
                  {profilePhotoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setProfilePhotoUrl('');
                        updateAdminProfile({ photoUrl: '' });
                      }}
                      className="text-xs text-red-600 hover:underline px-2"
                    >
                      Reset Foto
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Penuh</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Gred Jawatan</label>
                <input
                  type="text"
                  value={profileGrade}
                  onChange={e => setProfileGrade(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  placeholder="DH12"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Gelaran Jawatan Rasmi</label>
                <input
                  type="text"
                  value={profileTitle}
                  onChange={e => setProfileTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  placeholder="Pegawai Pendidikan Pengajian Tinggi / Pensyarah Kanan"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Jabatan Akademik</label>
                <input
                  type="text"
                  value={profileDept}
                  onChange={e => setProfileDept(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  placeholder="Jabatan Teknologi Maklumat dan Komunikasi (JTMK)"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Institusi Politeknik</label>
                <input
                  type="text"
                  value={profileInst}
                  onChange={e => setProfileInst(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  placeholder="Politeknik Tuanku Syed Sirajuddin (PTSS)"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nombor Telefon & WhatsApp</label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={e => setProfilePhone(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  placeholder="+60194090902"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Emel Rasmi PTSS</label>
                <input
                  type="email"
                  value={profileEmailPTSS}
                  onChange={e => setProfileEmailPTSS(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  placeholder="nasrul.effendy@ptss.edu.my"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Emel Peribadi</label>
                <input
                  type="email"
                  value={profileEmailPersonal}
                  onChange={e => setProfileEmailPersonal(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  placeholder="nadzeffendy@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Biodata Eksekutif / Deskripsi Hero</label>
              <textarea
                value={profileBio}
                onChange={e => setProfileBio(e.target.value)}
                rows={4}
                className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white leading-relaxed"
                placeholder="Pendidik berwawasan dan pakar teknologi maklumat..."
              />
            </div>
          </div>
        </form>
      )}

      {/* =========================================================================
          TAB 2: KEPAKARAN CRUD
          ========================================================================= */}
      {currentTab === 'kepakaran' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Pengurusan Bidang Kepakaran & Kemahiran TVET ({expertiseList.length})
              </h3>
              <p className="text-xs text-slate-500">
                Admin boleh menambah, menyunting tahap kepakaran, mengemaskini pensijilan, dan memadam bidang kepakaran.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddExpertise}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Kepakaran Baru</span>
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari kepakaran (cth: Cisco, Cybersecurity, Inovasi)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExpertise.map(exp => (
              <div
                key={exp.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {exp.category}
                    </span>
                    {exp.level && !exp.level.toLowerCase().includes('pakar') && (
                      <span className="text-xs font-bold text-slate-700 font-mono bg-slate-100 px-2 py-0.5 rounded-md">
                        {exp.level}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">{exp.title}</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{exp.description}</p>

                  {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {exp.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {exp.badge && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-indigo-700 font-semibold">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>{exp.badge}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditExpertise(exp)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Sunting</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerDelete(exp.id, exp.title, 'expertise')}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Padam</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: KURSUS PENGAJIAN JTMK & TVET CRUD
          ========================================================================= */}
      {currentTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Pengurusan Kursus Pengajian JTMK & TVET ({coursesList.length})
              </h3>
              <p className="text-xs text-slate-500">
                Admin boleh menambah kursus baru, menyunting kod kursus, nama, peringkat pengajian, sinopsis/huraian, bilangan bahan, dan pautan web/CIDOS.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddCourse}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Kursus Baru</span>
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari kursus (cth: DFC40233, Network, Cybersecurity, Multimedia)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-mono font-bold border border-indigo-100">
                      {course.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {course.materialsCount || 12} Bahan Muat Turun
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">{course.name}</h4>
                  <p className="text-xs font-semibold text-indigo-600 mt-1">{course.level}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{course.description}</p>

                  {course.tags && course.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {course.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {course.websiteUrl && (
                    <div className="mt-3 text-xs text-blue-600 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 shrink-0" />
                      <a
                        href={course.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate hover:underline text-[11px]"
                      >
                        {course.websiteUrl}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditCourse(course)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Sunting</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerDelete(course.id, `${course.code} - ${course.name}`, 'course')}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Padam</span>
                  </button>
                </div>
              </div>
            ))}

            {filteredCourses.length === 0 && (
              <div className="col-span-full p-8 text-center bg-white border border-slate-200 rounded-2xl text-slate-500">
                <p className="text-sm font-bold text-slate-700">Tiada kursus pengajian dijumpai</p>
                <p className="text-xs text-slate-400 mt-1">Sila klik &quot;+ Tambah Kursus Baru&quot; untuk memasukkan rekod pertama.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: PENYELIDIKAN CRUD
          ========================================================================= */}
      {currentTab === 'penyelidikan' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Pengurusan Penyelidikan & Penerbitan Ilmiah ({researchList.length})
              </h3>
              <p className="text-xs text-slate-500">
                CRUD bagi jurnal berindeks, persidangan antarabangsa/kebangsaan, geran TVET, dan buku rujukan.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddResearch}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Penyelidikan Baru</span>
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari penyelidikan (cth: JACoIT, AI, TVET 360)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="space-y-4">
            {filteredResearch.map(res => (
              <div
                key={res.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                      {res.year}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      {res.type}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      • {res.venue}
                    </span>
                    {res.status && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        {res.status}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">{res.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{res.summary}</p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    {res.doi && (
                      <span className="text-slate-500 font-mono">
                        DOI: <span className="text-blue-600">{res.doi}</span>
                      </span>
                    )}
                    {res.grantAmount && (
                      <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                        Geran: {res.grantAmount}
                      </span>
                    )}
                    {res.driveUrl && (
                      <a
                        href={res.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-700 font-bold hover:underline"
                      >
                        <HardDrive className="w-3.5 h-3.5" />
                        <span>Fail Drive</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-start shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEditResearch(res)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                    title="Sunting Penyelidikan"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerDelete(res.id, res.title, 'research')}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer"
                    title="Padam Penyelidikan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: INOVASI SISPEN3K CRUD (HANYA DALAM ADMIN SAHAJA)
          ========================================================================= */}
      {currentTab === 'innovations' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase">
                Zon Pengurusan Inovasi TVET (Hanya Ada Dalam Admin Sahaja)
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
                Mengikut spesifikasi keselamatan data: Rekod inovasi di database dan pengurusan inovasi tidak dipaparkan kepada pelawat awam. Segala penambahan, pengemaskinian status, dan pemadaman inovasi diuruskan secara eksklusif di sini oleh Admin.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Senarai Projek Inovasi Digital ({innovations.length})
              </h3>
              <p className="text-xs text-slate-500">
                Urus SISPEN3K, iPMAS, IAS, iCERT, serta pautan sistem web dan Google Drive.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddInno}
              className="px-4 py-2 bg-[#0c1f38] hover:bg-[#071628] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto hover:scale-102"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>+ Tambah Inovasi Baru</span>
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari inovasi (cth: SISPEN3K, iPMAS)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredInnovations.map(inno => (
              <div
                key={inno.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                      {inno.acronym}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 font-bold">{inno.year}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          inno.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {inno.status}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">{inno.title}</h4>
                  <p className="text-xs text-amber-700 font-semibold mt-0.5 mb-2">{inno.category}</p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{inno.description}</p>

                  {inno.features && inno.features.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                      {inno.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {inno.websiteUrl && (
                      <a
                        href={inno.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Sistem Web</span>
                      </a>
                    )}
                    {inno.driveUrl && (
                      <a
                        href={inno.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
                      >
                        <HardDrive className="w-3.5 h-3.5" />
                        <span>Drive Folder</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditInno(inno)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Sunting</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerDelete(inno.id, inno.title, 'innovation')}
                      className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Padam</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: CV CRUD & FUNGSI GAMBAR / IMEJ (Explicit Requirement)
          ========================================================================= */}
      {currentTab === 'cv' && (
        <div className="space-y-8">
          {/* SECTION A: PENGURUSAN GAMBAR / IMEJ CV */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-pink-600 uppercase tracking-wider">
                <ImageIcon className="w-4 h-4" />
                <span>Fungsi Gambar & Media Visual CV</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Pengurusan Gambar Potret & Lampiran Sijil CV
              </h3>
              <p className="text-xs text-slate-500">
                Pilih atau muat naik foto rasmi bagi CV Infografik 4 Halaman dan lampirkan imej sijil/anugerah berkaitan.
              </p>
            </div>

            <form onSubmit={handleSaveCVMediaSettings} className="space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-pink-50/30 border border-slate-200 flex flex-col md:flex-row items-center gap-6">
                <div className="relative group shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md bg-white flex items-center justify-center">
                    {cvPhotoInputUrl ? (
                      <img src={cvPhotoInputUrl} alt="Foto CV" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-slate-300" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => cvFileInputRef.current?.click()}
                    className="absolute inset-0 bg-slate-900/60 rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[11px] font-bold cursor-pointer"
                  >
                    <Camera className="w-6 h-6 mb-1 text-amber-400" />
                    <span>Tukar Foto CV</span>
                  </button>
                  <input
                    ref={cvFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCVPhotoFileChange}
                    className="hidden"
                  />
                </div>

                <div className="space-y-3 flex-1 w-full">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Gambar Potret Utama CV
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => cvFileInputRef.current?.click()}
                        className="px-3.5 py-2 bg-[#0c1f38] hover:bg-[#071628] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pilih & Muat Naik Gambar CV</span>
                      </button>
                      <input
                        type="text"
                        value={cvPhotoInputUrl}
                        onChange={e => setCvPhotoInputUrl(e.target.value)}
                        placeholder="Atau masukkan pautan URL imej potret..."
                        className="flex-1 min-w-[240px] text-xs p-2 bg-white border border-slate-200 rounded-xl focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Kapsyen Gambar Potret
                      </label>
                      <input
                        type="text"
                        value={cvPhotoCaption}
                        onChange={e => setCvPhotoCaption(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
                        placeholder="En. Nasrul Effendy bin Mat Nasir (DH12)"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Pautan Muat Turun Fail PDF CV
                      </label>
                      <input
                        type="text"
                        value={cvPdfUrl}
                        onChange={e => setCvPdfUrl(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
                        placeholder="https://drive.google.com/file/d/cv-full.pdf"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Tetapan Imej CV</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Sub-section: Lampiran Imej Sijil & Dokumen CV */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Galeri Lampiran Imej Sijil & Dokumen CV ({cvData.images?.length || 0})
                  </h4>
                  <p className="text-xs text-slate-500">
                    Imej sijil, anugerah, atau transkrip untuk melengkapkan dokumen CV.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCVAttachModalOpen(true)}
                  className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-blue-600" />
                  <span>+ Tambah Lampiran Imej</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cvData.images?.map(img => (
                  <div
                    key={img.id}
                    className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-32 rounded-lg bg-slate-100 overflow-hidden mb-2 relative">
                        <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                        <span className="absolute top-1.5 right-1.5 text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-900/80 text-white uppercase">
                          {img.type}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{img.title}</h5>
                      {img.description && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{img.description}</p>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">{img.dateAdded}</span>
                      <button
                        type="button"
                        onClick={() => triggerDelete(img.id, img.title, 'cv-image')}
                        className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                      >
                        Padam
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION B: KELAYAKAN AKADEMIK CV */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Kelayakan Akademik ({cvData.educations?.length || 0})</span>
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsCVEduModalOpen(true)}
                className="px-3 py-1.5 bg-blue-50 text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-100 cursor-pointer"
              >
                + Tambah Kelayakan
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cvData.educations?.map(edu => (
                <div key={edu.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-amber-600">{edu.year}</span>
                    <h5 className="font-bold text-sm text-slate-900">{edu.degree}</h5>
                    <p className="text-xs text-slate-600">{edu.field}</p>
                    <p className="text-xs text-slate-500 font-medium">{edu.institution}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerDelete(edu.id, edu.degree, 'cv-edu')}
                    className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                    title="Padam"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION C: SEJARAH PERKHIDMATAN CV */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span>Sejarah Perkhidmatan & Jawatan ({cvData.experiences?.length || 0})</span>
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsCVExpModalOpen(true)}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-900 rounded-lg text-xs font-bold hover:bg-indigo-100 cursor-pointer"
              >
                + Tambah Jawatan
              </button>
            </div>

            <div className="space-y-3">
              {cvData.experiences?.map(exp => (
                <div key={exp.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {exp.period}
                      </span>
                      <h5 className="font-bold text-sm text-slate-900">{exp.role}</h5>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      {exp.institution} {exp.department ? `• ${exp.department}` : ''}
                    </p>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="mt-2 space-y-0.5 text-[11px] text-slate-500 list-disc list-inside">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerDelete(exp.id, exp.role, 'cv-exp')}
                    className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                    title="Padam"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION D: ANUGERAH & PENGIKTIRAFAN CV */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Anugerah & Pengiktirafan ({cvData.awards?.length || 0})</span>
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsCVAwardModalOpen(true)}
                className="px-3 py-1.5 bg-amber-50 text-amber-900 rounded-lg text-xs font-bold hover:bg-amber-100 cursor-pointer"
              >
                + Tambah Anugerah
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cvData.awards?.map(awd => (
                <div key={awd.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-amber-600">{awd.year}</span>
                    <h5 className="font-bold text-xs text-slate-900 mt-0.5">{awd.title}</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">{awd.issuer}</p>
                    <span className="inline-block mt-1 text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                      {awd.type}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerDelete(awd.id, awd.title, 'cv-award')}
                    className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                    title="Padam"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: UTILITY PAUTAN NAVIGASI LUAR & DRIVE
          ========================================================================= */}
      {currentTab === 'navlinks' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Pautan Navigasi Rasmi, Portal & Google Drive ({navLinks.length})
              </h3>
              <p className="text-xs text-slate-500">
                Urus pautan ke laman web luar, storan awan Google Drive, dan repositori digital.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsNavLinkModalOpen(true)}
              className="px-4 py-2 bg-[#0c1f38] hover:bg-[#071628] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto hover:scale-102"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>+ Tambah Pautan Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {navLinks.map(link => (
              <div
                key={link.id}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        link.type === 'drive'
                          ? 'bg-blue-50 text-blue-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {link.badge || link.type}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">{link.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{link.title}</h4>
                  {link.description && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{link.description}</p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
                  >
                    <span>Buka URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => triggerDelete(link.id, link.title, 'navlink')}
                    className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                  >
                    Padam
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS
          ========================================================================= */}

      {/* 1. Modal Kepakaran Add/Edit */}
      {isExpertiseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {expertiseModalMode === 'add' ? 'Tambah Bidang Kepakaran Baru' : 'Sunting Bidang Kepakaran'}
              </h3>
              <button onClick={() => setIsExpertiseModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExpertise} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tajuk Kepakaran / Kemahiran</label>
                <input
                  type="text"
                  value={expTitle}
                  onChange={e => setExpTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="cth: Keselamatan Siber & InfoSec"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={expCategory}
                    onChange={e => setExpCategory(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Tenaga Pengajar">Tenaga Pengajar</option>
                    <option value="Pereka Grafik">Pereka Grafik</option>
                    <option value="Teknologi Maklumat">Teknologi Maklumat</option>
                    <option value="Keselamatan Maklumat">Keselamatan Maklumat</option>
                    <option value="Teknologi Rangkaian">Teknologi Rangkaian</option>
                    <option value="Inovasi Digital">Inovasi Digital</option>
                    <option value="Kecerdasan Buatan">Kecerdasan Buatan</option>
                    <option value="Pendidikan TVET">Pendidikan TVET</option>
                    <option value="Konsultansi & Latihan">Konsultansi & Latihan</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tahap / Peranan</label>
                  <select
                    value={expLevel}
                    onChange={e => setExpLevel(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Tenaga Pengajar">Tenaga Pengajar</option>
                    <option value="Pereka Grafik">Pereka Grafik</option>
                    <option value="Penceramah">Penceramah</option>
                    <option value="Pengamal TVET">Pengamal TVET</option>
                    <option value="Pembangun Sistem">Pembangun Sistem</option>
                    <option value="Penulis & Trainer">Penulis & Trainer</option>
                    <option value="Lanjutan">Lanjutan</option>
                    <option value="Pengamal">Pengamal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Huraian & Penerangan Terperinci</label>
                <textarea
                  value={expDesc}
                  onChange={e => setExpDesc(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                  placeholder="Penerangan skop kepakaran..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tag / Kata Kunci (koma dipisahkan)</label>
                  <input
                    type="text"
                    value={expTags}
                    onChange={e => setExpTags(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="Cybersecurity, CIA, Network"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Sijil / Pengiktirafan (Badge)</label>
                  <input
                    type="text"
                    value={expBadge}
                    onChange={e => setExpBadge(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="Cisco CCNA, CIDB Certified"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsExpertiseModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Simpan Kepakaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Kursus Pengajian JTMK & TVET Add/Edit */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {courseModalMode === 'add' ? 'Tambah Kursus Pengajian Baharu' : 'Sunting Kursus Pengajian TVET'}
              </h3>
              <button onClick={() => setIsCourseModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kod Kursus</label>
                  <input
                    type="text"
                    value={crsCode}
                    onChange={e => setCrsCode(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase"
                    placeholder="cth: DFC40233"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nama Kursus</label>
                  <input
                    type="text"
                    value={crsName}
                    onChange={e => setCrsName(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="cth: Network and Data Communication"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Peringkat / Program</label>
                  <input
                    type="text"
                    value={crsLevel}
                    onChange={e => setCrsLevel(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="cth: Diploma Teknologi Maklumat"
                    list="course-level-list"
                    required
                  />
                  <datalist id="course-level-list">
                    <option value="Diploma Teknologi Maklumat" />
                    <option value="Diploma Teknologi Digital" />
                    <option value="Program Asasi TVET & Politeknik" />
                    <option value="Sijil & Diploma Politeknik" />
                    <option value="Diploma Teknologi Maklumat & Kejuruteraan" />
                  </datalist>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Bilangan Bahan Muat Turun</label>
                  <input
                    type="number"
                    min="0"
                    value={crsMaterialsCount}
                    onChange={e => setCrsMaterialsCount(parseInt(e.target.value) || 0)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="12"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Huraian & Sinopsis Modul</label>
                <textarea
                  value={crsDesc}
                  onChange={e => setCrsDesc(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                  placeholder="Kandungan silibus pembelajaran kursus..."
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tag / Kata Kunci (koma dipisahkan)</label>
                <input
                  type="text"
                  value={crsTags}
                  onChange={e => setCrsTags(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="cth: Networking, Cisco, TCP/IP, Wireshark"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Pautan Web / Portal CIDOS LMS</label>
                  <input
                    type="url"
                    value={crsWebsiteUrl}
                    onChange={e => setCrsWebsiteUrl(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="https://cidos.ptss.edu.my"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Pautan Google Drive Bahan (Pilihan)</label>
                  <input
                    type="url"
                    value={crsDriveUrl}
                    onChange={e => setCrsDriveUrl(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="https://drive.google.com/..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Simpan Kursus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal Penyelidikan Add/Edit */}
      {isResearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {researchModalMode === 'add' ? 'Tambah Penyelidikan & Penerbitan' : 'Sunting Penyelidikan'}
              </h3>
              <button onClick={() => setIsResearchModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResearch} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tajuk Penyelidikan / Buku</label>
                <input
                  type="text"
                  value={resTitle}
                  onChange={e => setResTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="cth: JACoIT 2026: AI and BI in SMEs..."
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tahun</label>
                  <input
                    type="text"
                    value={resYear}
                    onChange={e => setResYear(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Jenis</label>
                  <select
                    value={resType}
                    onChange={e => setResType(e.target.value as any)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Jurnal Berindeks">Jurnal Berindeks</option>
                    <option value="Persidangan">Persidangan</option>
                    <option value="Buku">Buku</option>
                    <option value="E-Buku">E-Buku</option>
                    <option value="Geran TVET">Geran TVET</option>
                    <option value="Kertas Kerja">Kertas Kerja</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={resStatus}
                    onChange={e => setResStatus(e.target.value as any)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Diterbitkan">Diterbitkan</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dalam Proses">Dalam Proses</option>
                    <option value="Aktif">Aktif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Penerbit / Jurnal / Venue</label>
                <input
                  type="text"
                  value={resVenue}
                  onChange={e => setResVenue(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Journal of Applied Computing and Information Technology"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">DOI / Pautan Web</label>
                  <input
                    type="text"
                    value={resDoi}
                    onChange={e => setResDoi(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="10.1016/j.jacoit.2026.01.004"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Pautan Google Drive Manuskrip</label>
                  <input
                    type="text"
                    value={resDriveUrl}
                    onChange={e => setResDriveUrl(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="https://drive.google.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Ringkasan / Abstrak</label>
                <textarea
                  value={resSummary}
                  onChange={e => setResSummary(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Ringkasan dapatan penyelidikan..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsResearchModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Simpan Penyelidikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Modal Inovasi Add/Edit (Hanya Ada Dalam Admin) */}
      {isInnoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {innoModalMode === 'add' ? 'Tambah Inovasi Baru (Admin Sahaja)' : 'Sunting Inovasi (Admin)'}
              </h3>
              <button onClick={() => setIsInnoModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInnovation} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tajuk Inovasi Penuh</label>
                  <input
                    type="text"
                    value={innoTitle}
                    onChange={e => setInnoTitle(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="Sistem Penilaian Bersepadu SISPEN3K"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Akronim</label>
                  <input
                    type="text"
                    value={innoAcronym}
                    onChange={e => setInnoAcronym(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="SISPEN3K"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tahun</label>
                  <input
                    type="text"
                    value={innoYear}
                    onChange={e => setInnoYear(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kategori Inovasi</label>
                  <input
                    type="text"
                    value={innoCategory}
                    onChange={e => setInnoCategory(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="Sistem Penilaian Digital Kokurikulum"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Penerangan Inovasi</label>
                <textarea
                  value={innoDesc}
                  onChange={e => setInnoDesc(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Huraian objektif dan impak sistem..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Ciri-Ciri Utama Inovasi (Satu baris setiap ciri)
                </label>
                <textarea
                  value={innoFeatures}
                  onChange={e => setInnoFeatures(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Modul penilaian berkomputer&#10;Penjanaan keputusan automatik&#10;Pengesahan penilai KSM"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Pautan Sistem Web Langsung</label>
                  <input
                    type="text"
                    value={innoWebsiteUrl}
                    onChange={e => setInnoWebsiteUrl(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="https://ptss.edu.my/sispen3k"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Pautan Dokumentasi Google Drive</label>
                  <input
                    type="text"
                    value={innoDriveUrl}
                    onChange={e => setInnoDriveUrl(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="https://drive.google.com/..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInnoModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0c1f38] hover:bg-blue-950 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Simpan Inovasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Modal Lampiran Imej CV */}
      {isCVAttachModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Tambah Lampiran Gambar / Imej Sijil CV
              </h3>
              <button onClick={() => setIsCVAttachModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCVAttachment} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tajuk Gambar / Dokumen</label>
                <input
                  type="text"
                  value={cvAttachTitle}
                  onChange={e => setCvAttachTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Sijil APC 2015 / Sijil Pingat Emas"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Pilih Fail Imej / Gambar</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => cvAttachmentInputRef.current?.click()}
                    className="px-3.5 py-2 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100 cursor-pointer"
                  >
                    Muat Naik Gambar
                  </button>
                  <input
                    ref={cvAttachmentInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCVAttachmentFile}
                    className="hidden"
                  />
                  <input
                    type="text"
                    value={cvAttachUrl}
                    onChange={e => setCvAttachUrl(e.target.value)}
                    placeholder="Atau URL imej https://..."
                    className="flex-1 text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              {cvAttachUrl && (
                <div className="h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={cvAttachUrl} alt="Pratonton" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Jenis Dokumen</label>
                <select
                  value={cvAttachType}
                  onChange={e => setCvAttachType(e.target.value as any)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="certificate">Sijil Penghargaan / Penyertaan</option>
                  <option value="award">Pingat / Anugerah Cemerlang</option>
                  <option value="profile">Foto Profil Tambahan</option>
                  <option value="document">Transkrip / Dokumen Rasmi</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Penerangan Ringkas</label>
                <input
                  type="text"
                  value={cvAttachDesc}
                  onChange={e => setCvAttachDesc(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Pengiktirafan Kementerian Pendidikan Tinggi"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCVAttachModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Simpan Imej ke CV
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Modal Pendidikan CV */}
      {isCVEduModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Tambah Kelayakan Akademik</h3>
              <button onClick={() => setIsCVEduModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCVEdu} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Ijazah / Sijil</label>
                <input
                  type="text"
                  value={cvEduDegree}
                  onChange={e => setCvEduDegree(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Ijazah Sarjana Sains (ICT)"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Bidang Pengkhususan</label>
                <input
                  type="text"
                  value={cvEduField}
                  onChange={e => setCvEduField(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Teknologi Maklumat dan Komunikasi"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Institusi / Universiti</label>
                  <input
                    type="text"
                    value={cvEduInst}
                    onChange={e => setCvEduInst(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="Universiti Utara Malaysia (UUM)"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tahun</label>
                  <input
                    type="text"
                    value={cvEduYear}
                    onChange={e => setCvEduYear(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCVEduModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 text-white text-xs font-bold rounded-xl"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Modal Sejarah Perkhidmatan CV */}
      {isCVExpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Tambah Rekod Perkhidmatan / Jawatan</h3>
              <button onClick={() => setIsCVExpModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCVExp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Jawatan / Peranan</label>
                <input
                  type="text"
                  value={cvExpRole}
                  onChange={e => setCvExpRole(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Pensyarah Kanan DH12"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tempoh</label>
                  <input
                    type="text"
                    value={cvExpPeriod}
                    onChange={e => setCvExpPeriod(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="2026 – Sekarang"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Institusi</label>
                  <input
                    type="text"
                    value={cvExpInst}
                    onChange={e => setCvExpInst(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="Politeknik Tuanku Syed Sirajuddin"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Jabatan / Unit</label>
                <input
                  type="text"
                  value={cvExpDept}
                  onChange={e => setCvExpDept(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Jabatan Teknologi Maklumat dan Komunikasi"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Sorotan Tugas (Setiap baris satu)</label>
                <textarea
                  value={cvExpHighlights}
                  onChange={e => setCvExpHighlights(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Mengetuai inovasi iPMAS&#10;Pengajar kursus Cybersecurity"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCVExpModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-700 text-white text-xs font-bold rounded-xl"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Modal Anugerah CV */}
      {isCVAwardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Tambah Anugerah & Pengiktirafan</h3>
              <button onClick={() => setIsCVAwardModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCVAward} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tajuk Anugerah</label>
                <input
                  type="text"
                  value={cvAwardTitle}
                  onChange={e => setCvAwardTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Anugerah Perkhidmatan Cemerlang (APC)"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tahun</label>
                  <input
                    type="text"
                    value={cvAwardYear}
                    onChange={e => setCvAwardYear(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Jenis</label>
                  <select
                    value={cvAwardType}
                    onChange={e => setCvAwardType(e.target.value as any)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Anugerah">Anugerah</option>
                    <option value="Pingat">Pingat</option>
                    <option value="Sijil">Sijil</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Badan / Agensi Pengeluar</label>
                <input
                  type="text"
                  value={cvAwardIssuer}
                  onChange={e => setCvAwardIssuer(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Kementerian Pendidikan Tinggi / PTSS"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCVAwardModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Modal Pautan Navigasi Luar */}
      {isNavLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Tambah Pautan Navigasi Luar</h3>
              <button onClick={() => setIsNavLinkModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNavLink} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tajuk Pautan</label>
                <input
                  type="text"
                  value={navTitle}
                  onChange={e => setNavTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Portal CIDOS PTSS"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">URL Sasaran</label>
                <input
                  type="url"
                  value={navUrl}
                  onChange={e => setNavUrl(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="https://cidos.ptss.edu.my"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Jenis Destinasi</label>
                  <select
                    value={navType}
                    onChange={e => setNavType(e.target.value as any)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="website">Laman Web</option>
                    <option value="drive">Google Drive</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={navCategory}
                    onChange={e => setNavCategory(e.target.value as any)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="teroka">Teroka</option>
                    <option value="penyelidikan">Penyelidikan</option>
                    <option value="pengajaran">Pengajaran</option>
                    <option value="inovasi">Inovasi</option>
                    <option value="quicklink">Pautan Pantas</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNavLinkModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0c1f38] text-white text-xs font-bold rounded-xl"
                >
                  Simpan Pautan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. Tukar Kata Laluan Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-500" />
                <span>Tukar Kata Laluan Admin</span>
              </h3>
              <button onClick={() => setIsPasswordModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Kata Laluan Baru</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Sekurang-kurangnya 5 aksara"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Sahkan Kata Laluan</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Ulang kata laluan"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl shadow-xs"
                >
                  Kemaskini Kata Laluan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModalOpen}
        title="Pengesahan Pemadaman"
        message={`Adakah anda pasti ingin memadam rekod "${deleteTarget?.title}"? Tindakan ini tidak boleh diundur.`}
        confirmLabel="Ya, Padam Rekod"
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmModalOpen(false);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
};
