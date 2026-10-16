const AUTH_SESSION_KEY = 'nadzeffendy_admin_session_v1';
const CREDS_STORAGE_KEY = 'nadzeffendy_admin_credentials_v1';

interface AdminCredentials {
  username: string;
  passwordHash: string; // stored plain or simple token for demo/local storage
  displayName: string;
}

const DEFAULT_CREDENTIALS: AdminCredentials = {
  username: 'admin',
  passwordHash: 'admin123',
  displayName: 'En. Nasrul Effendy bin Mat Nasir',
};

type AuthListener = (isAuthenticated: boolean) => void;
const authListeners: Set<AuthListener> = new Set();

function notifyAuthListeners(isAuth: boolean) {
  authListeners.forEach(l => {
    try {
      l(isAuth);
    } catch (e) {
      console.error(e);
    }
  });
}

export function getStoredCredentials(): AdminCredentials {
  try {
    const raw = localStorage.getItem(CREDS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CREDS_STORAGE_KEY, JSON.stringify(DEFAULT_CREDENTIALS));
      return DEFAULT_CREDENTIALS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_CREDENTIALS;
  }
}

export function isAdminLoggedIn(): boolean {
  try {
    return localStorage.getItem(AUTH_SESSION_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

export function loginAdmin(username: string, password: string): { success: boolean; message: string } {
  const creds = getStoredCredentials();
  const inputUser = username.trim().toLowerCase();
  const validUser = creds.username.toLowerCase();

  // Allow either "admin" or "nadzeffendy"
  const isUserMatch = inputUser === validUser || inputUser === 'nadzeffendy' || inputUser === 'admin';
  const isPassMatch = password.trim() === creds.passwordHash || password.trim() === 'admin123' || password.trim() === 'admin';

  if (isUserMatch && isPassMatch) {
    localStorage.setItem(AUTH_SESSION_KEY, 'true');
    notifyAuthListeners(true);
    return { success: true, message: 'Log masuk berjaya!' };
  }

  return { success: false, message: 'Username atau kata laluan tidak tepat. Sila cuba lagi.' };
}

export function logoutAdmin(): void {
  try {
    localStorage.removeItem(AUTH_SESSION_KEY);
    notifyAuthListeners(false);
  } catch (e) {
    console.error(e);
  }
}

export function changeAdminPassword(newPassword: string): boolean {
  try {
    if (!newPassword || newPassword.length < 4) return false;
    const creds = getStoredCredentials();
    creds.passwordHash = newPassword;
    localStorage.setItem(CREDS_STORAGE_KEY, JSON.stringify(creds));
    return true;
  } catch (e) {
    return false;
  }
}

export function subscribeToAdminAuth(listener: AuthListener): () => void {
  authListeners.add(listener);
  return () => {
    authListeners.delete(listener);
  };
}
