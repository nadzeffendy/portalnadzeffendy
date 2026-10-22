const AVATAR_STORAGE_KEY = 'nadzeffendy_portal_custom_avatar_v1';

type AvatarListener = (avatarUrl: string | null) => void;
const listeners: Set<AvatarListener> = new Set();

export function getCustomAvatar(): string | null {
  try {
    const saved = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (saved) return saved;
    const adminSaved = localStorage.getItem('nadzeffendy_admin_profile_v1');
    if (adminSaved) {
      const parsed = JSON.parse(adminSaved);
      if (parsed.photoUrl) return parsed.photoUrl;
    }
    return null;
  } catch (e) {
    return null;
  }
}

export function setCustomAvatar(dataUrl: string): void {
  try {
    localStorage.setItem(AVATAR_STORAGE_KEY, dataUrl);
    listeners.forEach(l => l(dataUrl));
    
    // Also sync with admin profile storage so CV and profile pages reflect immediately
    try {
      const adminProfileRaw = localStorage.getItem('nadzeffendy_admin_profile_v1');
      if (adminProfileRaw) {
        const parsed = JSON.parse(adminProfileRaw);
        parsed.photoUrl = dataUrl;
        localStorage.setItem('nadzeffendy_admin_profile_v1', JSON.stringify(parsed));
      }
    } catch (_) {}
  } catch (e) {
    console.error('Failed to save avatar:', e);
  }
}

export function resetCustomAvatar(): void {
  try {
    localStorage.removeItem(AVATAR_STORAGE_KEY);
    listeners.forEach(l => l(null));
  } catch (e) {
    console.error('Failed to reset avatar:', e);
  }
}

export function subscribeToAvatar(listener: AvatarListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
