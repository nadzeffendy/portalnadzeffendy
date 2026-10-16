const AVATAR_STORAGE_KEY = 'nadzeffendy_portal_custom_avatar_v1';

type AvatarListener = (avatarUrl: string | null) => void;
const listeners: Set<AvatarListener> = new Set();

export function getCustomAvatar(): string | null {
  try {
    return localStorage.getItem(AVATAR_STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

export function setCustomAvatar(dataUrl: string): void {
  try {
    localStorage.setItem(AVATAR_STORAGE_KEY, dataUrl);
    listeners.forEach(l => l(dataUrl));
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
