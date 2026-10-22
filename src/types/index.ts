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

// Kepakaran CRUD Type
export interface ExpertiseItem {
  id: string;
  title: string;
  category: string;
  level?: string;
  description: string;
  tags: string[];
  badge?: string;
  organization?: string;
}

// Penyelidikan CRUD Type
export interface ResearchItem {
  id: string;
  title: string;
  year: string;
  type: 'Jurnal Berindeks' | 'Persidangan' | 'Buku' | 'E-Buku' | 'Geran TVET' | 'Kertas Kerja';
  venue: string;
  doi?: string;
  summary: string;
  tags: string[];
  grantAmount?: string;
  status: 'Diterbitkan' | 'Selesai' | 'Dalam Proses' | 'Aktif';
  driveUrl?: string;
  websiteUrl?: string;
}

// CV Images & Media Attachments (Photo/Image feature for CV)
export interface CVImageAttachment {
  id: string;
  title: string;
  url: string; // Base64 data URL or external URL
  type: 'profile' | 'certificate' | 'award' | 'document';
  description?: string;
  dateAdded: string;
}

// CV Full CRUD Structure
export interface AdminCVData {
  photoUrl: string; // Main CV photo (data URL or direct URL)
  photoCaption?: string;
  headline?: string;
  summary?: string;
  pdfDownloadUrl?: string;
  images: CVImageAttachment[];
  educations: Education[];
  experiences: ServiceRecord[];
  awards: AwardItem[];
  memberships: ProfessionalMembership[];
  skills: string[];
}

// Gallery Album & Photos CRUD Types
export interface GalleryPhoto {
  id: string;
  url: string; // Base64 data URL or image URL
  caption: string;
  dateAdded?: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  year?: string;
  photos: GalleryPhoto[];
}
