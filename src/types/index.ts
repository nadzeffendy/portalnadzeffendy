export type PageId =
  | 'home'
  | 'profile'
  | 'teaching'
  | 'innovations'
  | 'publications'
  | 'cv'
  | 'news'
  | 'gallery'
  | 'admin'
  | 'database'
  | 'drive'
  | 'contact';

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  year: string;
}

export interface ServiceRecord {
  id: string;
  period: string;
  role: string;
  institution: string;
  department?: string;
  highlights?: string[];
}

export interface TeachingCourse {
  id: string;
  code: string;
  name: string;
  description: string;
  level: string;
  tags: string[];
  materialsCount: number;
  driveUrl?: string;
  websiteUrl?: string;
}

export interface InnovationProject {
  id: string;
  year: string;
  title: string;
  acronym: string;
  category: string;
  description: string;
  features: string[];
  status: 'Active' | 'Completed' | 'In Progress';
  iconName: string;
  driveUrl?: string;
  websiteUrl?: string;
}

export interface PublicationItem {
  id: string;
  year: string;
  title: string;
  type: 'Book' | 'Ebook' | 'Conference Paper' | 'Journal';
  venue?: string;
  doi?: string;
  summary: string;
  tags: string[];
  driveUrl?: string;
  websiteUrl?: string;
}

export interface NavigationLink {
  id: string;
  title: string;
  url: string;
  type: 'website' | 'drive' | 'internal';
  targetPage?: PageId;
  category: 'header' | 'teroka' | 'penyelidikan' | 'pengajaran' | 'inovasi' | 'quicklink';
  description?: string;
  badge?: string;
}

export interface ProfessionalMembership {
  id: string;
  body: string;
  membershipNo: string;
  role?: string;
  badge?: string;
}

export interface AwardItem {
  id: string;
  year: string;
  title: string;
  issuer: string;
  type: 'Anugerah' | 'Pingat' | 'Sijil';
}

export interface ExpertiseService {
  id: string;
  title: string;
  organization: string;
  category: string;
}

export interface ReferencePerson {
  name: string;
  title: string;
  department: string;
  institution: string;
  location: string;
}

// Database Hub Records
export interface DatabaseRecord {
  id: string;
  category: 'pelajar' | 'bahan_kuliah' | 'inovasi' | 'penyelidikan' | 'pautan_navigasi' | 'tempahan_penceramah';
  title: string;
  description: string;
  authorOrSubmitter: string;
  email?: string;
  status: 'Baru' | 'Dalam Proses' | 'Selesai' | 'Arkib';
  dateAdded: string;
  tags?: string[];
  link?: string;
  driveUrl?: string;
  websiteUrl?: string;
}

// Google Drive Item
export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink?: string;
  webContentLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
  owners?: { displayName: string; emailAddress: string; photoLink?: string }[];
  isFolder?: boolean;
}
