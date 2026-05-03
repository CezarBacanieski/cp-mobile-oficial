import AsyncStorage from '@react-native-async-storage/async-storage';

const memoryStore = new Map<string, string>();

function readLocalStorage(key: string) {
  if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) return null;
  return globalThis.localStorage.getItem(key);
}

function writeLocalStorage(key: string, value: string) {
  if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) return;
  globalThis.localStorage.setItem(key, value);
}

function removeLocalStorage(key: string) {
  if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) return;
  globalThis.localStorage.removeItem(key);
}

export const storage = {
  async getItem(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      const localValue = readLocalStorage(key);
      return localValue ?? memoryStore.get(key) ?? null;
    }
  },
  async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
      return;
    } catch {
      writeLocalStorage(key, value);
      memoryStore.set(key, value);
    }
  },
  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      return;
    } catch {
      removeLocalStorage(key);
      memoryStore.delete(key);
    }
  },
};
