import { DatabaseRecord } from '../types';

const STORAGE_KEY = 'nadzeffendy_portal_database_v1';

export const INITIAL_DATABASE_RECORDS: DatabaseRecord[] = [
  {
    id: 'rec-1',
    category: 'bahan_kuliah',
    title: 'Modul Asas Keselamatan Siber (Cybersecurity Fundamentals)',
    description: 'Slaid lengkap mengenai prinsip CIA Triad, pencegahan serangan malware, firewall, dan amalan terbaik sekuriti rangkaian.',
    authorOrSubmitter: 'En. Nasrul Effendy bin Mat Nasir',
    email: 'nasrul.effendy@ptss.edu.my',
    status: 'Selesai',
    dateAdded: '2026-03-01',
    tags: ['Cybersecurity', 'JTMK', 'Semester 4'],
    link: 'https://ptss.edu.my/elearning',
  },
  {
    id: 'rec-2',
    category: 'inovasi',
    title: 'iPMAS (Intelligent Paperwork Management System)',
    description: 'Sistem pengurusan kertas kerja pintar berasaskan kecerdasan buatan untuk semakan format standard dan jejak kelulusan pantas.',
    authorOrSubmitter: 'Kumpulan Penyelidik Inovasi PTSS',
    email: 'nadzeffendy@gmail.com',
    status: 'Dalam Proses',
    dateAdded: '2026-02-15',
    tags: ['Inovasi', 'AI', 'Workflow Automation', 'iPMAS'],
    link: '#',
  },
  {
    id: 'rec-sispen3k',
    category: 'inovasi',
    title: 'SISPEN3K - Sistem Penilaian Bersepadu Kursus Kemahiran Kelana (3K)',
    description: 'Sistem Penilaian Bersepadu Kursus Kemahiran Kelana (3K) Daerah KSM Politeknik Tuanku Syed Sirajuddin untuk penilaian kemahiran kelana, pendaftaran penilai dan laporan berkomputer.',
    authorOrSubmitter: 'En. Nasrul Effendy bin Mat Nasir',
    email: 'nasrul.effendy@ptss.edu.my',
    status: 'Selesai',
    dateAdded: '2024-05-18',
    tags: ['SISPEN3K', 'Pengakap', 'Kelanasiswa', 'Inovasi PTSS'],
    link: '#',
  },
  {
    id: 'rec-3',
    category: 'tempahan_penceramah',
    title: 'Permohonan Bengkel "AI Mastery & Creative Content Keusahawanan"',
    description: 'Jemputan sebagai penceramah pakar bagi 45 usahawan komuniti Zon Utara untuk mengoptimumkan pemasaran menggunakan Generative AI.',
    authorOrSubmitter: 'Pusat Khidmat Kontraktor / Empowerncer',
    email: 'koridor.utara@empower.gov.my',
    status: 'Baru',
    dateAdded: '2026-03-10',
    tags: ['ViralPreneur', 'AI Mastery', 'Zon Utara'],
    link: '#',
  },
  {
    id: 'rec-4',
    category: 'pelajar',
    title: 'Bimbingan Projek Akhir: IoT Smart Environmental Sensor PTSS',
    description: 'Konsultasi reka bentuk seni bina rangkaian LoRaWAN dan enkripsi payload data sensor pelajar Diploma Teknologi Maklumat.',
    authorOrSubmitter: 'Ahmad Faiz (Pelajar Tahun Akhir DDT)',
    email: 'faiz.ddt23@student.ptss.edu.my',
    status: 'Dalam Proses',
    dateAdded: '2026-03-08',
    tags: ['Projek Pelajar', 'Network', 'Penyeliaan'],
    link: '#',
  },
  {
    id: 'rec-5',
    category: 'bahan_kuliah',
    title: 'Lab Sheet: Network Routing & Packet Analysis (Wireshark)',
    description: 'Panduan amali makmal menganalisis paket TCP/IP, DNS handshake, dan pengesanan paket anomali.',
    authorOrSubmitter: 'En. Nasrul Effendy bin Mat Nasir',
    email: 'nasrul.effendy@ptss.edu.my',
    status: 'Selesai',
    dateAdded: '2026-02-20',
    tags: ['Wireshark', 'Networking', 'Amali'],
    link: '#',
  },
  {
    id: 'rec-6',
    category: 'inovasi',
    title: 'iCERT (Intelligent Certificate Generator & Verifier)',
    description: 'Inovasi penjanaan sijil digital automatik dengan kod QR pengesahan integriti bagi program latihan politeknik.',
    authorOrSubmitter: 'Unit Latihan Dan Pendidikan Lanjutan PTSS',
    email: 'nasrul.effendy@ptss.edu.my',
    status: 'Selesai',
    dateAdded: '2020-07-15',
    tags: ['Sijil Digital', 'ULPL', 'Inovasi 2020'],
    link: '#',
  },
];

type Listener = (records: DatabaseRecord[]) => void;
const listeners: Set<Listener> = new Set();

function notifyListeners(records: DatabaseRecord[]) {
  listeners.forEach((listener) => {
    try {
      listener(records);
    } catch (e) {
      console.error(e);
    }
  });
}

export function getDatabaseRecords(category?: string): DatabaseRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATABASE_RECORDS));
      return category && category !== 'all'
        ? INITIAL_DATABASE_RECORDS.filter(r => r.category === category)
        : INITIAL_DATABASE_RECORDS;
    }
    const parsed: DatabaseRecord[] = JSON.parse(raw);
    if (category && category !== 'all') {
      return parsed.filter(r => r.category === category);
    }
    return parsed;
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    return INITIAL_DATABASE_RECORDS;
  }
}

export function addDatabaseRecord(
  record: Omit<DatabaseRecord, 'id' | 'dateAdded'> & { dateAdded?: string }
): DatabaseRecord {
  const current = getDatabaseRecords();
  const newRecord: DatabaseRecord = {
    ...record,
    id: `rec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    dateAdded: record.dateAdded || new Date().toISOString().split('T')[0],
  };

  const updated = [newRecord, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyListeners(updated);
  return newRecord;
}

export function updateDatabaseRecord(id: string, updates: Partial<DatabaseRecord>): boolean {
  const current = getDatabaseRecords();
  const index = current.findIndex(r => r.id === id);
  if (index === -1) return false;

  current[index] = { ...current[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  notifyListeners(current);
  return true;
}

export function deleteDatabaseRecord(id: string): boolean {
  const current = getDatabaseRecords();
  const filtered = current.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  notifyListeners(filtered);
  return true;
}

export function subscribeToDatabase(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function exportDatabaseAsJSON(): string {
  const data = getDatabaseRecords();
  return JSON.stringify(data, null, 2);
}

export function importDatabaseFromJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      notifyListeners(parsed);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Invalid JSON for import:', err);
    return false;
  }
}

export function resetDatabaseToDefault(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATABASE_RECORDS));
  notifyListeners(INITIAL_DATABASE_RECORDS);
}
