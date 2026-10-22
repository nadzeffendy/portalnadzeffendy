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
  PUBLICATIONS as INITIAL_PUBLICATIONS,
  INNOVATIONS as INITIAL_INNOVATIONS,
  TEACHING_COURSES as INITIAL_COURSES,
  PERSONAL_INFO as INITIAL_PERSONAL_INFO,
  EDUCATIONS as INITIAL_EDUCATIONS,
  SERVICE_HISTORY as INITIAL_SERVICE_HISTORY,
  AWARDS as INITIAL_AWARDS,
  MEMBERSHIPS as INITIAL_MEMBERSHIPS,
} from '../data/nadzEffendyData';

const STORAGE_KEY_PUBLICATIONS = 'nadzeffendy_admin_publications_v2';
const STORAGE_KEY_INNOVATIONS = 'nadzeffendy_admin_innovations_v2';
const STORAGE_KEY_COURSES = 'nadzeffendy_admin_courses_v2';
const STORAGE_KEY_NAVLINKS = 'nadzeffendy_admin_navlinks_v2';
const STORAGE_KEY_PROFILE = 'nadzeffendy_admin_profile_v2';
const STORAGE_KEY_EXPERTISE = 'nadzeffendy_admin_expertise_v3';
const STORAGE_KEY_RESEARCH = 'nadzeffendy_admin_research_v2';
const STORAGE_KEY_CV = 'nadzeffendy_admin_cv_v2';

// Initial Navigation & Drive links
const INITIAL_NAVLINKS: NavigationLink[] = [
  {
    id: 'nav-drive-main',
    title: 'Arkib Utama Google Drive (Nadz Effendy)',
    url: 'https://drive.google.com/drive/u/0/my-drive',
    type: 'drive',
    category: 'teroka',
    description: 'Pautan storan awan rasmi untuk semua manuskrip, bahan kursus & dokumentasi inovasi.',
    badge: 'Storan Awan',
  },
  {
    id: 'nav-ptss-elearning',
    title: 'Portal CIDOS / e-Learning Politeknik Malaysia',
    url: 'https://cidos.ptss.edu.my',
    type: 'website',
    category: 'pengajaran',
    description: 'Laman pengurusan pembelajaran digital (LMS) rasmi PTSS.',
    badge: 'LMS PTSS',
  },
  {
    id: 'nav-sispen3k-live',
    title: 'Portal Sistem Penilaian SISPEN3K (KSM PTSS)',
    url: 'https://ptss.edu.my/sispen3k',
    type: 'website',
    category: 'inovasi',
    description: 'Aplikasi web rasmi pentaksiran Kursus Kemahiran Kelana (3K).',
    badge: 'Live Web App',
  },
  {
    id: 'nav-ipmas-drive',
    title: 'Folder Kertas Kerja & Templat iPMAS 2026',
    url: 'https://drive.google.com/drive/u/0/folders/ipmas-templates',
    type: 'drive',
    category: 'inovasi',
    description: 'Folder templat format kertas kerja rasmi politeknik di Google Drive.',
    badge: 'Google Drive',
  },
  {
    id: 'nav-jacoit-doi',
    title: 'Pautan Artikel JACoIT 2026 (AI & BI in SMEs)',
    url: 'https://doi.org/10.1016/j.jacoit.2026.01.004',
    type: 'website',
    category: 'penyelidikan',
    description: 'Akses penuh ke manuskrip jurnal dalam talian.',
    badge: 'DOI Web',
  },
  {
    id: 'nav-chatgpt-heroes',
    title: 'Buku Digital CHATGPT HEROES: Panduan Pintar Pelajar',
    url: 'https://drive.google.com/file/d/chatgpt-heroes-preview/view',
    type: 'drive',
    category: 'penyelidikan',
    description: 'Muat turun pratonton modul e-buku kecerdasan buatan di Google Drive.',
    badge: 'E-Book Drive',
  },
];

// Initial seeded enriched publications
const SEEDED_PUBLICATIONS: PublicationItem[] = INITIAL_PUBLICATIONS.map(pub => {
  if (pub.id === 'pub-6') {
    return {
      ...pub,
      driveUrl: 'https://drive.google.com/file/d/jacoit-2026-manuscript/view',
      websiteUrl: 'https://doi.org/10.1016/j.jacoit.2026.01.004',
    };
  }
  if (pub.id === 'pub-7') {
    return {
      ...pub,
      driveUrl: 'https://drive.google.com/file/d/chatgpt-heroes-full/view',
      websiteUrl: 'https://nadzeffendy.my/chatgpt-heroes',
    };
  }
  return {
    ...pub,
    driveUrl: 'https://drive.google.com/drive/u/0/my-drive',
    websiteUrl: 'https://ptss.edu.my',
  };
});

// Initial seeded enriched innovations
const SEEDED_INNOVATIONS: InnovationProject[] = INITIAL_INNOVATIONS.map(inno => {
  if (inno.acronym === 'SISPEN3K') {
    return {
      ...inno,
      driveUrl: 'https://drive.google.com/drive/u/0/folders/sispen3k-docs',
      websiteUrl: 'https://ptss.edu.my/sispen3k',
    };
  }
  if (inno.acronym === 'iPMAS') {
    return {
      ...inno,
      driveUrl: 'https://drive.google.com/drive/u/0/folders/ipmas-templates',
      websiteUrl: 'https://nadzeffendy.my/ipmas',
    };
  }
  return {
    ...inno,
    driveUrl: 'https://drive.google.com/drive/u/0/my-drive',
    websiteUrl: 'https://ptss.edu.my',
  };
});

// Initial seeded enriched courses
const SEEDED_COURSES: TeachingCourse[] = INITIAL_COURSES.map(crs => ({
  ...crs,
  driveUrl: `https://drive.google.com/drive/u/0/folders/${crs.code.toLowerCase()}-materials`,
  websiteUrl: 'https://cidos.ptss.edu.my',
}));

// Initial seeded Kepakaran (Expertise)
const SEEDED_EXPERTISE: ExpertiseItem[] = [
  {
    id: 'exp-1',
    title: 'Keselamatan Siber (Cybersecurity) & InfoSec',
    category: 'Keselamatan Maklumat',
    level: 'Pengamal TVET',
    description: 'Pengkhususan dalam prinsip kerahsiaan data (CIA triad), pengauditan keselamatan rangkaian, pencegahan ancaman siber, dan dasar pematuhan ISO 27001.',
    tags: ['Cybersecurity', 'CIA Triad', 'Audit Keselamatan', 'InfoSec'],
    badge: 'Pegawai DH12 PTSS',
    organization: 'JTMK PTSS',
  },
  {
    id: 'exp-2',
    title: 'Rangkaian Komputer Cisco & Komunikasi Data',
    category: 'Teknologi Rangkaian',
    level: 'Pengamal TVET',
    description: 'Konfigurasi penghalaan (routing), pensuisan (switching), protokol TCP/IP, VLAN, subnetting IPv4/IPv6, dan infrastruktur rangkaian kampus berskala tinggi.',
    tags: ['Cisco CCNA', 'Routing & Switching', 'TCP/IP', 'Network Infra'],
    badge: 'Cisco Certified',
    organization: 'Cisco Networking Academy',
  },
  {
    id: 'exp-3',
    title: 'Pembangunan Inovasi Digital TVET (SISPEN3K & iPMAS)',
    category: 'Inovasi Digital',
    level: 'Pembangun Sistem',
    description: 'Merangka arkitektur dan sistem perisian berimpak tinggi untuk pengurusan kokurikulum kelana (SISPEN3K), pengurusan kertas kerja pintar (iPMAS), dan automasi sijil (iCERT).',
    tags: ['SISPEN3K', 'iPMAS', 'iCERT', 'Sistem Web TVET'],
    badge: 'Inovasi Emas PTSS',
    organization: 'Politeknik Tuanku Syed Sirajuddin',
  },
  {
    id: 'exp-4',
    title: 'Kecerdasan Buatan Generatif (GenAI) & ChatGPT Education',
    category: 'Kecerdasan Buatan',
    level: 'Penulis & Trainer',
    description: 'Penulis buku "ChatGPT Heroes" dan penyelidik aplikasi AI dalam metodologi pengajaran TVET, etika penggunaan model bahasa besar, dan automasi analitik.',
    tags: ['Generative AI', 'ChatGPT Heroes', 'Prompt Engineering', 'AI TVET'],
    badge: 'Penulis & Trainer AI',
    organization: 'JPPKK / MyAIS',
  },
  {
    id: 'exp-5',
    title: 'Pembangunan Sistem Web, Cloud & Google Workspace',
    category: 'Pengkomputeran Awan',
    level: 'Pembangun Web',
    description: 'Penyepaduan Google Workspace REST API, pengautomatan dokumen menggunakan Apps Script, pangkalan data masa nyata, dan pembangunan platform moden.',
    tags: ['Google Workspace', 'Cloud REST API', 'Apps Script', 'Full-Stack'],
    badge: 'Google Workspace Pro',
    organization: 'Google Cloud Platform',
  },
  {
    id: 'exp-6',
    title: 'Latihan Profesional CIDB & Pembangunan Bakat NCER',
    category: 'Konsultansi & Latihan',
    level: 'Jurulatih Bertauliah',
    description: 'Jurulatih bertauliah program keusahawanan dan teknikal peringkat kebangsaan, merangka modul latihan industri dan pembangunan kapasiti komuniti.',
    tags: ['CIDB Trainer', 'NCER Empower', 'TVET Lifelong Learning'],
    badge: 'CIDB Certified Trainer',
    organization: 'CIDB Malaysia / NCER',
  },
  {
    id: 'exp-7',
    title: 'Tenaga Pengajar - Pusat Khidmat Kontraktor CIDB & ViralPreneur',
    category: 'Tenaga Pengajar',
    level: 'Tenaga Pengajar',
    description: 'Pusat Khidmat Kontraktor (PKK) bagi tajuk "Google sebagai Platform Perniagaan" di bawah CIDB, serta Penceramah Bengkel "ViralPreneur AI Creative Content Marketing".',
    tags: ['Tenaga Pengajar', 'PKK CIDB', 'Google Platform Perniagaan', 'ViralPreneur', 'Content Marketing'],
    badge: 'Tenaga Pengajar PKK CIDB',
    organization: 'Pusat Khidmat Kontraktor (CIDB) & NCER',
  },
  {
    id: 'exp-8',
    title: 'Pereka Grafik - Modul Pemasaran MOTAC & Pelan Sukan KBS',
    category: 'Pereka Grafik',
    level: 'Pereka Grafik',
    description: 'Pereka grafik bagi Modul Latihan Pemasaran Digital di bawah MOTAC, serta Buku Pelan Sukan Industri Negara di bawah KBS.',
    tags: ['Pereka Grafik', 'MOTAC', 'Pemasaran Digital', 'KBS', 'Pelan Sukan Industri Negara'],
    badge: 'Pereka Grafik Penerbitan',
    organization: 'MOTAC & KBS Malaysia',
  },
];

// Initial seeded Penyelidikan (Research)
const SEEDED_RESEARCH: ResearchItem[] = [
  {
    id: 'res-1',
    title: 'Artificial Intelligence and Business Intelligence in Small and Medium Enterprises: A Bibliometric Review of Emerging Research Directions',
    year: '2026',
    type: 'Jurnal Berindeks',
    venue: 'Journal of Applied Computing and Information Technology (JACoIT)',
    doi: '10.1016/j.jacoit.2026.01.004',
    summary: 'Kajian bibliometrik merungkai trend pengaplikasian AI dan Business Intelligence (BI) bagi meningkatkan daya saing industri perusahaan kecil dan sederhana (PKS).',
    tags: ['Artificial Intelligence', 'Business Intelligence', 'SMEs', 'Bibliometrics'],
    status: 'Diterbitkan',
    grantAmount: 'RM 15,000 (Geran Dalaman TVET)',
    driveUrl: 'https://drive.google.com/file/d/jacoit-2026-manuscript/view',
    websiteUrl: 'https://doi.org/10.1016/j.jacoit.2026.01.004',
  },
  {
    id: 'res-2',
    title: 'Sentiments of Cyber Independence and Indigenous Technologies in Malaysian Higher Education During Industrial Revolution 5.0 Era',
    year: '2025',
    type: 'Persidangan',
    venue: 'International Conference on Computing & Informatics (ICOCI 2025)',
    summary: 'Kajian empirikal mengenai kedaulatan siber dan kebergantungan kepada teknologi perisian tempatan di kalangan institusi pengajian tinggi Malaysia.',
    tags: ['Cyber Independence', 'IR 5.0', 'Higher Education', 'Indigenous Tech'],
    status: 'Diterbitkan',
    driveUrl: 'https://drive.google.com/file/d/icoci-2025-paper/view',
    websiteUrl: 'https://icoci.cms.net.my',
  },
  {
    id: 'res-3',
    title: 'TVET 360°: Empowering Politeknik Tuanku Syed Sirajuddin Students through Lifelong Learning and Industry-Aligned Competency',
    year: '2025',
    type: 'Persidangan',
    venue: 'Seminar Penyelidikan Sains Sosial & Humaniora (SPSH 2025)',
    summary: 'Model kerangka kompetensi holistik TVET 360° yang menggabungkan kemahiran teknikal digital, etika siber, dan kelayakan profesional.',
    tags: ['TVET 360°', 'PTSS', 'Lifelong Learning', 'Kompetensi Industri'],
    status: 'Diterbitkan',
    grantAmount: 'Geran Penyelidikan Institusi JPPKK',
    driveUrl: 'https://drive.google.com/file/d/spsh-2025-tvet360/view',
    websiteUrl: 'https://ptss.edu.my/spsh2025',
  },
  {
    id: 'res-4',
    title: 'CHATGPT HEROES: Panduan Pintar Pelajar Menjana Produktiviti Akademik Beretika',
    year: '2024',
    type: 'Buku',
    venue: 'Penerbitan Mandiri Pendidikan TVET',
    summary: 'Buku panduan komprehensif untuk melatih pelajar memanfaatkan Generative AI dan prompt engineering secara bertanggungjawab.',
    tags: ['ChatGPT', 'Buku Panduan', 'AI Education'],
    status: 'Diterbitkan',
    driveUrl: 'https://drive.google.com/file/d/chatgpt-heroes-preview/view',
    websiteUrl: 'https://nadzeffendy.my/chatgpt-heroes',
  },
  {
    id: 'res-5',
    title: 'Pembangunan Sistem Penilaian Bersepadu SISPEN3K Kursus Kemahiran Kelana KSM PTSS',
    year: '2024',
    type: 'Geran TVET',
    venue: 'Projek Penyelidikan Gunaan Politeknik Tuanku Syed Sirajuddin',
    summary: 'Penyelidikan pembangunan sistem berasaskan web untuk merevolusikan pentaksiran aktiviti kepengakapan kelanasiswa tanpa pembaziran kertas.',
    tags: ['SISPEN3K', 'Penyelidikan Gunaan', 'KSM PTSS', 'Kelanasiswa'],
    status: 'Selesai',
    grantAmount: 'Geran Inovasi Kokurikulum PTSS',
    driveUrl: 'https://drive.google.com/drive/u/0/folders/sispen3k-docs',
    websiteUrl: 'https://ptss.edu.my/sispen3k',
  },
];

// Initial seeded CV Images and attachments
const SEEDED_CV_ATTACHMENTS: CVImageAttachment[] = [
  {
    id: 'img-profile-main',
    title: 'Foto Potret Rasmi CV (Nadz Effendy)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    type: 'profile',
    description: 'Foto rasmi potret resolusi tinggi untuk CV Infografik dan profil PTSS.',
    dateAdded: '2026-01-10',
  },
  {
    id: 'img-apc-2015',
    title: 'Sijil Anugerah Perkhidmatan Cemerlang (APC 2015)',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
    type: 'award',
    description: 'Sijil APC Kementerian Pendidikan Tinggi / JPPKK.',
    dateAdded: '2025-11-20',
  },
  {
    id: 'img-gold-sispen3k',
    title: 'Sijil Pingat Emas Inovasi SISPEN3K 2024',
    url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80',
    type: 'certificate',
    description: 'Sijil Anugerah Inovasi Digital Terbaik Daerah KSM PTSS.',
    dateAdded: '2024-12-15',
  },
];

// Initial seeded CV Full Data
const SEEDED_CV_DATA: AdminCVData = {
  photoUrl: '', // Uses default portrait or uploaded base64 data URL
  photoCaption: 'En. Nasrul Effendy bin Mat Nasir (Pegawai Pendidikan Pengajian Tinggi DH12)',
  headline: 'Curriculum Vitae Infografik Lengkap 4 Halaman',
  summary: 'Pensyarah Kanan DH12 dan Penyelidik TVET di Politeknik Tuanku Syed Sirajuddin dengan rekod cemerlang lebih 20 tahun dalam Keselamatan Siber, Komunikasi Data, Pengurusan Inovasi (SISPEN3K & iPMAS), dan Kecerdasan Buatan.',
  pdfDownloadUrl: 'https://drive.google.com/file/d/cv-nasrul-effendy-ptss/view',
  images: SEEDED_CV_ATTACHMENTS,
  educations: INITIAL_EDUCATIONS,
  experiences: INITIAL_SERVICE_HISTORY,
  awards: INITIAL_AWARDS,
  memberships: INITIAL_MEMBERSHIPS,
  skills: [
    'Cybersecurity & Network Security (CIA Triad)',
    'Cisco Routing & Switching (TCP/IP, VLAN, OSPF)',
    'Inovasi Digital TVET (SISPEN3K, iPMAS, iCERT)',
    'Generative AI & ChatGPT Educational Prompting',
    'Google Workspace & Cloud Automation REST APIs',
    'Pengurusan Kokurikulum & Kepengakapan Malaysia',
  ],
};

// Subscriber listeners
const listeners: Array<() => void> = [];

export function subscribeToAdminData(callback: () => void): () => void {
  listeners.push(callback);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

function notifyAll() {
  listeners.forEach(cb => {
    try {
      cb();
    } catch (e) {
      console.error('Subscriber notify error:', e);
    }
  });
}

// ==========================================
// 1. PROFIL CRUD
// ==========================================
export function getAdminProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(INITIAL_PERSONAL_INFO));
      return INITIAL_PERSONAL_INFO;
    }
    return { ...INITIAL_PERSONAL_INFO, ...JSON.parse(raw) };
  } catch (e) {
    return INITIAL_PERSONAL_INFO;
  }
}

export function updateAdminProfile(updates: Partial<typeof INITIAL_PERSONAL_INFO>): boolean {
  try {
    const current = getAdminProfile();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updated));
    notifyAll();
    return true;
  } catch (e) {
    return false;
  }
}

// ==========================================
// 2. KEPAKARAN CRUD
// ==========================================
export function getAdminExpertise(): ExpertiseItem[] {
  try {
    let items: ExpertiseItem[] = [];
    const raw = localStorage.getItem(STORAGE_KEY_EXPERTISE);
    if (!raw) {
      items = SEEDED_EXPERTISE;
      localStorage.setItem(STORAGE_KEY_EXPERTISE, JSON.stringify(SEEDED_EXPERTISE));
      return items;
    } else {
      items = JSON.parse(raw);
    }

    // Auto-clean any legacy overclaims ("Pakar Utama", "Pakar Kanan", "Pakar")
    let hasChanged = false;
    items = items.map(item => {
      let updated = { ...item };
      if (updated.level && updated.level.toLowerCase().includes('pakar')) {
        updated.level = updated.category || 'Bidang TVET';
        hasChanged = true;
      }
      if (updated.badge && updated.badge.toLowerCase().includes('pakar siber')) {
        updated.badge = 'Pegawai DH12 PTSS';
        hasChanged = true;
      }
      if (updated.description && updated.description.startsWith('Pakar dalam')) {
        updated.description = updated.description.replace('Pakar dalam', 'Pengkhususan dalam');
        hasChanged = true;
      }
      return updated;
    });

    // Ensure exp-7 (Tenaga Pengajar) exists
    if (!items.some(i => i.id === 'exp-7' || i.title.includes('Tenaga Pengajar'))) {
      const item7 = SEEDED_EXPERTISE.find(i => i.id === 'exp-7');
      if (item7) {
        items.push(item7);
        hasChanged = true;
      }
    }

    // Ensure exp-8 (Pereka Grafik) exists
    if (!items.some(i => i.id === 'exp-8' || i.title.includes('Pereka Grafik'))) {
      const item8 = SEEDED_EXPERTISE.find(i => i.id === 'exp-8');
      if (item8) {
        items.push(item8);
        hasChanged = true;
      }
    }

    if (hasChanged) {
      localStorage.setItem(STORAGE_KEY_EXPERTISE, JSON.stringify(items));
    }
    return items;
  } catch (e) {
    return SEEDED_EXPERTISE;
  }
}

export function addAdminExpertise(item: Omit<ExpertiseItem, 'id'>): ExpertiseItem {
  const current = getAdminExpertise();
  const newItem: ExpertiseItem = {
    ...item,
    id: `exp-${Date.now()}`,
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEY_EXPERTISE, JSON.stringify(updated));
  notifyAll();
  return newItem;
}

export function updateAdminExpertise(id: string, updates: Partial<ExpertiseItem>): boolean {
  const current = getAdminExpertise();
  const idx = current.findIndex(i => i.id === id);
  if (idx === -1) return false;
  current[idx] = { ...current[idx], ...updates };
  localStorage.setItem(STORAGE_KEY_EXPERTISE, JSON.stringify(current));
  notifyAll();
  return true;
}

export function deleteAdminExpertise(id: string): boolean {
  const current = getAdminExpertise();
  const filtered = current.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY_EXPERTISE, JSON.stringify(filtered));
  notifyAll();
  return true;
}

// ==========================================
// 3. PENYELIDIKAN CRUD
// ==========================================
export function getAdminResearch(): ResearchItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RESEARCH);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_RESEARCH, JSON.stringify(SEEDED_RESEARCH));
      return SEEDED_RESEARCH;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEEDED_RESEARCH;
  }
}

export function addAdminResearch(item: Omit<ResearchItem, 'id'>): ResearchItem {
  const current = getAdminResearch();
  const newItem: ResearchItem = {
    ...item,
    id: `res-${Date.now()}`,
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEY_RESEARCH, JSON.stringify(updated));
  notifyAll();
  return newItem;
}

export function updateAdminResearch(id: string, updates: Partial<ResearchItem>): boolean {
  const current = getAdminResearch();
  const idx = current.findIndex(i => i.id === id);
  if (idx === -1) return false;
  current[idx] = { ...current[idx], ...updates };
  localStorage.setItem(STORAGE_KEY_RESEARCH, JSON.stringify(current));
  notifyAll();
  return true;
}

export function deleteAdminResearch(id: string): boolean {
  const current = getAdminResearch();
  const filtered = current.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY_RESEARCH, JSON.stringify(filtered));
  notifyAll();
  return true;
}

// Compatibility for Publications
export function getAdminPublications(): PublicationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PUBLICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(SEEDED_PUBLICATIONS));
      return SEEDED_PUBLICATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEEDED_PUBLICATIONS;
  }
}

export function addAdminPublication(item: Omit<PublicationItem, 'id'>): PublicationItem {
  const current = getAdminPublications();
  const newItem: PublicationItem = {
    ...item,
    id: `pub-${Date.now()}`,
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(updated));
  notifyAll();
  return newItem;
}

export function updateAdminPublication(id: string, updates: Partial<PublicationItem>): boolean {
  const current = getAdminPublications();
  const idx = current.findIndex(i => i.id === id);
  if (idx === -1) return false;
  current[idx] = { ...current[idx], ...updates };
  localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(current));
  notifyAll();
  return true;
}

export function deleteAdminPublication(id: string): boolean {
  const current = getAdminPublications();
  const filtered = current.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(filtered));
  notifyAll();
  return true;
}

// ==========================================
// 4. INOVASI CRUD (HANYA DALAM ADMIN SAHAJA)
// ==========================================
export function getAdminInnovations(): InnovationProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INNOVATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_INNOVATIONS, JSON.stringify(SEEDED_INNOVATIONS));
      return SEEDED_INNOVATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEEDED_INNOVATIONS;
  }
}

export function addAdminInnovation(item: Omit<InnovationProject, 'id'>): InnovationProject {
  const current = getAdminInnovations();
  const newItem: InnovationProject = {
    ...item,
    id: `inv-${Date.now()}`,
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEY_INNOVATIONS, JSON.stringify(updated));
  notifyAll();
  return newItem;
}

export function updateAdminInnovation(id: string, updates: Partial<InnovationProject>): boolean {
  const current = getAdminInnovations();
  const idx = current.findIndex(i => i.id === id);
  if (idx === -1) return false;
  current[idx] = { ...current[idx], ...updates };
  localStorage.setItem(STORAGE_KEY_INNOVATIONS, JSON.stringify(current));
  notifyAll();
  return true;
}

export function deleteAdminInnovation(id: string): boolean {
  const current = getAdminInnovations();
  const filtered = current.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY_INNOVATIONS, JSON.stringify(filtered));
  notifyAll();
  return true;
}

// ==========================================
// 5. CV CRUD DENGAN FUNGSI GAMBAR / IMEJ
// ==========================================
export function getAdminCVData(): AdminCVData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CV);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_CV, JSON.stringify(SEEDED_CV_DATA));
      return SEEDED_CV_DATA;
    }
    const parsed = JSON.parse(raw);
    return { ...SEEDED_CV_DATA, ...parsed };
  } catch (e) {
    return SEEDED_CV_DATA;
  }
}

export function updateAdminCVData(updates: Partial<AdminCVData>): boolean {
  try {
    const current = getAdminCVData();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY_CV, JSON.stringify(updated));
    notifyAll();
    return true;
  } catch (e) {
    return false;
  }
}

// Special functions for CV images / photos
export function uploadCVPhoto(photoUrl: string, caption?: string): boolean {
  try {
    const current = getAdminCVData();
    const updated: AdminCVData = {
      ...current,
      photoUrl,
      photoCaption: caption || current.photoCaption,
    };
    localStorage.setItem(STORAGE_KEY_CV, JSON.stringify(updated));

    // Also sync with AdminProfile avatar if requested
    updateAdminProfile({ photoUrl });

    notifyAll();
    return true;
  } catch (e) {
    return false;
  }
}

export function addCVImageAttachment(
  img: Omit<CVImageAttachment, 'id' | 'dateAdded'>
): CVImageAttachment {
  const current = getAdminCVData();
  const newAttachment: CVImageAttachment = {
    ...img,
    id: `cv-img-${Date.now()}`,
    dateAdded: new Date().toISOString().split('T')[0],
  };
  const updatedImages = [newAttachment, ...(current.images || [])];
  updateAdminCVData({ images: updatedImages });
  return newAttachment;
}

export function deleteCVImageAttachment(id: string): boolean {
  const current = getAdminCVData();
  const updatedImages = (current.images || []).filter(img => img.id !== id);
  return updateAdminCVData({ images: updatedImages });
}

// CV Sub-item CRUD: Educations
export function addCVEducation(edu: Omit<Education, 'id'>): Education {
  const current = getAdminCVData();
  const newEdu: Education = { ...edu, id: `edu-${Date.now()}` };
  const updated = [newEdu, ...(current.educations || [])];
  updateAdminCVData({ educations: updated });
  return newEdu;
}

export function updateCVEducation(id: string, updates: Partial<Education>): boolean {
  const current = getAdminCVData();
  const list = [...(current.educations || [])];
  const idx = list.findIndex(e => e.id === id);
  if (idx === -1) return false;
  list[idx] = { ...list[idx], ...updates };
  return updateAdminCVData({ educations: list });
}

export function deleteCVEducation(id: string): boolean {
  const current = getAdminCVData();
  const filtered = (current.educations || []).filter(e => e.id !== id);
  return updateAdminCVData({ educations: filtered });
}

// CV Sub-item CRUD: Experiences
export function addCVExperience(exp: Omit<ServiceRecord, 'id'>): ServiceRecord {
  const current = getAdminCVData();
  const newExp: ServiceRecord = { ...exp, id: `srv-${Date.now()}` };
  const updated = [newExp, ...(current.experiences || [])];
  updateAdminCVData({ experiences: updated });
  return newExp;
}

export function updateCVExperience(id: string, updates: Partial<ServiceRecord>): boolean {
  const current = getAdminCVData();
  const list = [...(current.experiences || [])];
  const idx = list.findIndex(e => e.id === id);
  if (idx === -1) return false;
  list[idx] = { ...list[idx], ...updates };
  return updateAdminCVData({ experiences: list });
}

export function deleteCVExperience(id: string): boolean {
  const current = getAdminCVData();
  const filtered = (current.experiences || []).filter(e => e.id !== id);
  return updateAdminCVData({ experiences: filtered });
}

// CV Sub-item CRUD: Awards
export function addCVAward(award: Omit<AwardItem, 'id'>): AwardItem {
  const current = getAdminCVData();
  const newAward: AwardItem = { ...award, id: `awd-${Date.now()}` };
  const updated = [newAward, ...(current.awards || [])];
  updateAdminCVData({ awards: updated });
  return newAward;
}

export function updateCVAward(id: string, updates: Partial<AwardItem>): boolean {
  const current = getAdminCVData();
  const list = [...(current.awards || [])];
  const idx = list.findIndex(a => a.id === id);
  if (idx === -1) return false;
  list[idx] = { ...list[idx], ...updates };
  return updateAdminCVData({ awards: list });
}

export function deleteCVAward(id: string): boolean {
  const current = getAdminCVData();
  const filtered = (current.awards || []).filter(a => a.id !== id);
  return updateAdminCVData({ awards: filtered });
}

// ==========================================
// 6. COURSES & NAVLINKS (UTILITIES)
// ==========================================
export function getAdminCourses(): TeachingCourse[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COURSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(SEEDED_COURSES));
      return SEEDED_COURSES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEEDED_COURSES;
  }
}

export function addAdminCourse(item: Omit<TeachingCourse, 'id'>): TeachingCourse {
  const current = getAdminCourses();
  const newItem: TeachingCourse = {
    ...item,
    id: `crs-${Date.now()}`,
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(updated));
  notifyAll();
  return newItem;
}

export function updateAdminCourse(id: string, updates: Partial<TeachingCourse>): boolean {
  const current = getAdminCourses();
  const idx = current.findIndex(i => i.id === id);
  if (idx === -1) return false;
  current[idx] = { ...current[idx], ...updates };
  localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(current));
  notifyAll();
  return true;
}

export function deleteAdminCourse(id: string): boolean {
  const current = getAdminCourses();
  const filtered = current.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(filtered));
  notifyAll();
  return true;
}

export function getAdminNavLinks(): NavigationLink[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NAVLINKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(INITIAL_NAVLINKS));
      return INITIAL_NAVLINKS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_NAVLINKS;
  }
}

export function addAdminNavLink(item: Omit<NavigationLink, 'id'>): NavigationLink {
  const current = getAdminNavLinks();
  const newItem: NavigationLink = {
    ...item,
    id: `nav-${Date.now()}`,
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(updated));
  notifyAll();
  return newItem;
}

export function updateAdminNavLink(id: string, updates: Partial<NavigationLink>): boolean {
  const current = getAdminNavLinks();
  const idx = current.findIndex(i => i.id === id);
  if (idx === -1) return false;
  current[idx] = { ...current[idx], ...updates };
  localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(current));
  notifyAll();
  return true;
}

export function deleteAdminNavLink(id: string): boolean {
  const current = getAdminNavLinks();
  const filtered = current.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(filtered));
  notifyAll();
  return true;
}

// ==========================================
// 7. BACKUP, RESTORE & RESET
// ==========================================
export function exportAllAdminDataJSON(): string {
  const data = {
    exportedAt: new Date().toISOString(),
    profile: getAdminProfile(),
    expertise: getAdminExpertise(),
    research: getAdminResearch(),
    innovations: getAdminInnovations(),
    cvData: getAdminCVData(),
    publications: getAdminPublications(),
    courses: getAdminCourses(),
    navLinks: getAdminNavLinks(),
  };
  return JSON.stringify(data, null, 2);
}

export function importAllAdminDataJSON(jsonStr: string): boolean {
  try {
    const data = JSON.parse(jsonStr);
    if (data.profile) localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(data.profile));
    if (data.expertise) localStorage.setItem(STORAGE_KEY_EXPERTISE, JSON.stringify(data.expertise));
    if (data.research) localStorage.setItem(STORAGE_KEY_RESEARCH, JSON.stringify(data.research));
    if (data.innovations) localStorage.setItem(STORAGE_KEY_INNOVATIONS, JSON.stringify(data.innovations));
    if (data.cvData) localStorage.setItem(STORAGE_KEY_CV, JSON.stringify(data.cvData));
    if (data.publications) localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(data.publications));
    if (data.courses) localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(data.courses));
    if (data.navLinks) localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(data.navLinks));
    notifyAll();
    return true;
  } catch (e) {
    console.error('Import error:', e);
    return false;
  }
}

export function resetAllAdminDataToDefault(): void {
  localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(INITIAL_PERSONAL_INFO));
  localStorage.setItem(STORAGE_KEY_EXPERTISE, JSON.stringify(SEEDED_EXPERTISE));
  localStorage.setItem(STORAGE_KEY_RESEARCH, JSON.stringify(SEEDED_RESEARCH));
  localStorage.setItem(STORAGE_KEY_INNOVATIONS, JSON.stringify(SEEDED_INNOVATIONS));
  localStorage.setItem(STORAGE_KEY_CV, JSON.stringify(SEEDED_CV_DATA));
  localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(SEEDED_PUBLICATIONS));
  localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(SEEDED_COURSES));
  localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(INITIAL_NAVLINKS));
  notifyAll();
}
