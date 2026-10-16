import {
  PublicationItem,
  InnovationProject,
  TeachingCourse,
  NavigationLink,
} from '../types';
import {
  PUBLICATIONS as INITIAL_PUBLICATIONS,
  INNOVATIONS as INITIAL_INNOVATIONS,
  TEACHING_COURSES as INITIAL_COURSES,
  PERSONAL_INFO as INITIAL_PERSONAL_INFO,
} from '../data/nadzEffendyData';

const STORAGE_KEY_PUBLICATIONS = 'nadzeffendy_admin_publications_v2';
const STORAGE_KEY_INNOVATIONS = 'nadzeffendy_admin_innovations_v2';
const STORAGE_KEY_COURSES = 'nadzeffendy_admin_courses_v2';
const STORAGE_KEY_NAVLINKS = 'nadzeffendy_admin_navlinks_v2';
const STORAGE_KEY_PROFILE = 'nadzeffendy_admin_profile_v2';

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
const SEEDED_INNOVATIONS: InnovationProject[] = INITIAL_INNOVATIONS.map(inv => {
  if (inv.acronym === 'SISPEN3K') {
    return {
      ...inv,
      driveUrl: 'https://drive.google.com/drive/u/0/folders/sispen3k-docs',
      websiteUrl: 'https://ptss.edu.my/sispen3k',
    };
  }
  if (inv.acronym === 'iPMAS') {
    return {
      ...inv,
      driveUrl: 'https://drive.google.com/drive/u/0/folders/ipmas-project',
      websiteUrl: 'https://ipmas.ptss.edu.my',
    };
  }
  if (inv.acronym === 'iCERT') {
    return {
      ...inv,
      driveUrl: 'https://drive.google.com/drive/u/0/folders/icert-ulpl',
      websiteUrl: 'https://icert.ptss.edu.my',
    };
  }
  return {
    ...inv,
    driveUrl: 'https://drive.google.com/drive/u/0/my-drive',
    websiteUrl: 'https://ptss.edu.my',
  };
});

// Initial seeded enriched courses
const SEEDED_COURSES: TeachingCourse[] = INITIAL_COURSES.map(crs => {
  return {
    ...crs,
    driveUrl: `https://drive.google.com/drive/u/0/folders/${crs.code.toLowerCase()}-materials`,
    websiteUrl: `https://cidos.ptss.edu.my/course/${crs.code}`,
  };
});

// Listeners
type SimpleListener = () => void;
const changeListeners: Set<SimpleListener> = new Set();

function notifyAll() {
  changeListeners.forEach(listener => {
    try {
      listener();
    } catch (e) {
      console.error(e);
    }
  });
}

export function subscribeToAdminData(listener: SimpleListener): () => void {
  changeListeners.add(listener);
  return () => {
    changeListeners.delete(listener);
  };
}

// ==========================================
// 1. PUBLICATIONS CRUD
// ==========================================
export function getAdminPublications(): PublicationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PUBLICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(SEEDED_PUBLICATIONS));
      return SEEDED_PUBLICATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error(e);
    return SEEDED_PUBLICATIONS;
  }
}

export function addAdminPublication(item: Omit<PublicationItem, 'id'>): PublicationItem {
  const current = getAdminPublications();
  const newItem: PublicationItem = {
    ...item,
    id: `pub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(updated));
  notifyAll();
  return newItem;
}

export function updateAdminPublication(id: string, updates: Partial<PublicationItem>): boolean {
  const current = getAdminPublications();
  const idx = current.findIndex(p => p.id === id);
  if (idx === -1) return false;
  current[idx] = { ...current[idx], ...updates };
  localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(current));
  notifyAll();
  return true;
}

export function deleteAdminPublication(id: string): boolean {
  const current = getAdminPublications();
  const updated = current.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(updated));
  notifyAll();
  return true;
}

// ==========================================
// 2. INNOVATIONS CRUD
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
    console.error(e);
    return SEEDED_INNOVATIONS;
  }
}

export function addAdminInnovation(item: Omit<InnovationProject, 'id'>): InnovationProject {
  const current = getAdminInnovations();
  const newItem: InnovationProject = {
    ...item,
    id: `inv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
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
  const updated = current.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY_INNOVATIONS, JSON.stringify(updated));
  notifyAll();
  return true;
}

// ==========================================
// 3. TEACHING COURSES CRUD
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
    console.error(e);
    return SEEDED_COURSES;
  }
}

export function addAdminCourse(item: Omit<TeachingCourse, 'id'>): TeachingCourse {
  const current = getAdminCourses();
  const newItem: TeachingCourse = {
    ...item,
    id: `crs-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(updated));
  notifyAll();
  return newItem;
}

export function updateAdminCourse(id: string, updates: Partial<TeachingCourse>): boolean {
  const current = getAdminCourses();
  const idx = current.findIndex(c => c.id === id);
  if (idx === -1) return false;
  current[idx] = { ...current[idx], ...updates };
  localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(current));
  notifyAll();
  return true;
}

export function deleteAdminCourse(id: string): boolean {
  const current = getAdminCourses();
  const updated = current.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(updated));
  notifyAll();
  return true;
}

// ==========================================
// 4. NAVIGATION & DRIVE LINKS CRUD
// ==========================================
export function getAdminNavLinks(): NavigationLink[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NAVLINKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(INITIAL_NAVLINKS));
      return INITIAL_NAVLINKS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error(e);
    return INITIAL_NAVLINKS;
  }
}

export function addAdminNavLink(link: Omit<NavigationLink, 'id'>): NavigationLink {
  const current = getAdminNavLinks();
  const newLink: NavigationLink = {
    ...link,
    id: `nav-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  };
  const updated = [newLink, ...current];
  localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(updated));
  notifyAll();
  return newLink;
}

export function updateAdminNavLink(id: string, updates: Partial<NavigationLink>): boolean {
  const current = getAdminNavLinks();
  const idx = current.findIndex(l => l.id === id);
  if (idx === -1) return false;
  current[idx] = { ...current[idx], ...updates };
  localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(current));
  notifyAll();
  return true;
}

export function deleteAdminNavLink(id: string): boolean {
  const current = getAdminNavLinks();
  const updated = current.filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(updated));
  notifyAll();
  return true;
}

// ==========================================
// 5. BACKUP & RESET ALL
// ==========================================
export function exportAllAdminDataJSON(): string {
  const fullBackup = {
    publications: getAdminPublications(),
    innovations: getAdminInnovations(),
    courses: getAdminCourses(),
    navLinks: getAdminNavLinks(),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(fullBackup, null, 2);
}

export function importAllAdminDataJSON(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed.publications && Array.isArray(parsed.publications)) {
      localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(parsed.publications));
    }
    if (parsed.innovations && Array.isArray(parsed.innovations)) {
      localStorage.setItem(STORAGE_KEY_INNOVATIONS, JSON.stringify(parsed.innovations));
    }
    if (parsed.courses && Array.isArray(parsed.courses)) {
      localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(parsed.courses));
    }
    if (parsed.navLinks && Array.isArray(parsed.navLinks)) {
      localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(parsed.navLinks));
    }
    notifyAll();
    return true;
  } catch (err) {
    console.error('Import failed:', err);
    return false;
  }
}

export function getAdminProfile(): typeof INITIAL_PERSONAL_INFO {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(INITIAL_PERSONAL_INFO));
      return INITIAL_PERSONAL_INFO;
    }
    return JSON.parse(raw);
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

export function resetAllAdminDataToDefault(): void {
  localStorage.setItem(STORAGE_KEY_PUBLICATIONS, JSON.stringify(SEEDED_PUBLICATIONS));
  localStorage.setItem(STORAGE_KEY_INNOVATIONS, JSON.stringify(SEEDED_INNOVATIONS));
  localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(SEEDED_COURSES));
  localStorage.setItem(STORAGE_KEY_NAVLINKS, JSON.stringify(INITIAL_NAVLINKS));
  localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(INITIAL_PERSONAL_INFO));
  notifyAll();
}
