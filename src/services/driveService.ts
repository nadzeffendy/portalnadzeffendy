import { DriveFileItem } from '../types';
import { getAccessToken } from './firebase';

const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

// Academic demo files curated from Nadz Effendy's publications and courses
export const DEMO_DRIVE_FILES: DriveFileItem[] = [
  {
    id: 'demo-doc-1',
    name: 'CHATGPT HEROES - Panduan Pintar Pelajar.pdf',
    mimeType: 'application/pdf',
    size: '4250000',
    modifiedTime: '2024-08-12T10:30:00Z',
    webViewLink: 'https://ptss.edu.my/nadzeffendy/chatgpt-heroes',
    webContentLink: '#',
    isFolder: false,
  },
  {
    id: 'demo-doc-2',
    name: 'SPSH 2025 - The Perception and Use of Generative AI.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: '1850000',
    modifiedTime: '2025-05-20T14:15:00Z',
    webViewLink: '#',
    webContentLink: '#',
    isFolder: false,
  },
  {
    id: 'demo-folder-1',
    name: 'Kursus Network & Cybersecurity 2026',
    mimeType: 'application/vnd.google-apps.folder',
    modifiedTime: '2026-03-01T09:00:00Z',
    isFolder: true,
  },
  {
    id: 'demo-doc-3',
    name: 'iPMAS - Intelligent Paperwork Management System (Proposal & Tech Spec).pdf',
    mimeType: 'application/pdf',
    size: '3120000',
    modifiedTime: '2026-01-18T16:45:00Z',
    webViewLink: '#',
    webContentLink: '#',
    isFolder: false,
  },
  {
    id: 'demo-doc-4',
    name: 'ViralPreneur AI Mastery - Modul Latihan Koridor Utara.pptx',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    size: '12800000',
    modifiedTime: '2024-11-04T11:20:00Z',
    webViewLink: '#',
    webContentLink: '#',
    isFolder: false,
  },
  {
    id: 'demo-doc-5',
    name: 'JACoIT 2026 - AI & Business Intelligence in SMEs.pdf',
    mimeType: 'application/pdf',
    size: '2450000',
    modifiedTime: '2026-02-14T08:10:00Z',
    webViewLink: '#',
    webContentLink: '#',
    isFolder: false,
  },
  {
    id: 'demo-folder-2',
    name: 'Bahan Kokurikulum & Persekutuan Pengakap',
    mimeType: 'application/vnd.google-apps.folder',
    modifiedTime: '2025-09-10T12:00:00Z',
    isFolder: true,
  },
  {
    id: 'demo-doc-6',
    name: 'Jadual Kuliah & Rubrik Penilaian JMSK-PTSS.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: '950000',
    modifiedTime: '2026-02-28T10:00:00Z',
    webViewLink: '#',
    webContentLink: '#',
    isFolder: false,
  },
];

export async function listDriveFiles(searchQuery?: string): Promise<{ files: DriveFileItem[]; isLive: boolean; error?: string }> {
  const token = await getAccessToken();

  if (!token) {
    // Return sample academic files if not authenticated yet
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const filtered = DEMO_DRIVE_FILES.filter(
        f => f.name.toLowerCase().includes(q)
      );
      return { files: filtered, isLive: false };
    }
    return { files: DEMO_DRIVE_FILES, isLive: false };
  }

  try {
    let q = "trashed = false";
    if (searchQuery && searchQuery.trim()) {
      const escaped = searchQuery.replace(/'/g, "\\'");
      q += ` and name contains '${escaped}'`;
    }

    const params = new URLSearchParams({
      pageSize: '60',
      fields: 'nextPageToken,files(id,name,mimeType,size,modifiedTime,webViewLink,webContentLink,iconLink,thumbnailLink,owners)',
      orderBy: 'folder,modifiedTime desc',
      q,
    });

    const res = await fetch(`${DRIVE_API_URL}/files?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      const msg = errJson.error?.message || `HTTP ${res.status}: ${res.statusText}`;
      console.warn('Drive API error:', msg);
      return { files: DEMO_DRIVE_FILES, isLive: false, error: msg };
    }

    const data = await res.json();
    const driveFiles: DriveFileItem[] = (data.files || []).map((f: any) => ({
      id: f.id,
      name: f.name,
      mimeType: f.mimeType,
      size: f.size,
      modifiedTime: f.modifiedTime,
      webViewLink: f.webViewLink,
      webContentLink: f.webContentLink,
      iconLink: f.iconLink,
      thumbnailLink: f.thumbnailLink,
      owners: f.owners,
      isFolder: f.mimeType === 'application/vnd.google-apps.folder',
    }));

    return { files: driveFiles, isLive: true };
  } catch (err: any) {
    console.error('Error fetching Google Drive files:', err);
    return { files: DEMO_DRIVE_FILES, isLive: false, error: err.message };
  }
}

export async function uploadFileToDrive(file: File, description?: string): Promise<DriveFileItem> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Sila log masuk dengan akaun Google terlebih dahulu untuk memuat naik ke Google Drive.');
  }

  const metadata = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    description: description || 'Dimuat naik melalui Portal Nadz Effendy',
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const reader = new FileReader();
  const fileDataPromise = new Promise<ArrayBuffer>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

  const fileData = await fileDataPromise;

  const metadataPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(
    metadata
  )}`;
  const fileHeader = `${delimiter}Content-Type: ${metadata.mimeType}\r\nContent-Transfer-Encoding: base64\r\n\r\n`;

  // Convert arrayBuffer to base64
  let binary = '';
  const bytes = new Uint8Array(fileData);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64Data = btoa(binary);

  const multipartRequestBody =
    metadataPart + fileHeader + base64Data + closeDelimiter;

  const res = await fetch(DRIVE_UPLOAD_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error?.message || 'Gagal memuat naik fail ke Google Drive');
  }

  const uploaded = await res.json();
  return {
    id: uploaded.id,
    name: uploaded.name,
    mimeType: uploaded.mimeType,
    size: uploaded.size,
    modifiedTime: new Date().toISOString(),
    webViewLink: uploaded.webViewLink,
    webContentLink: uploaded.webContentLink,
    isFolder: false,
  };
}

export async function createDriveFolder(folderName: string): Promise<DriveFileItem> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Sila log masuk dengan Google untuk mencipta folder.');
  }

  const metadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  const res = await fetch(`${DRIVE_API_URL}/files`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Gagal mencipta folder Google Drive');
  }

  const data = await res.json();
  return {
    id: data.id,
    name: data.name,
    mimeType: data.mimeType,
    modifiedTime: new Date().toISOString(),
    isFolder: true,
  };
}

export async function deleteDriveFile(fileId: string): Promise<boolean> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Sila log masuk dengan Google.');
  }

  const res = await fetch(`${DRIVE_API_URL}/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Gagal memadam fail dari Google Drive');
  }

  return true;
}

export function formatFileSize(bytes?: string | number): string {
  if (!bytes) return 'N/A';
  const num = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(num) || num === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(num) / Math.log(k));
  return `${parseFloat((num / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
