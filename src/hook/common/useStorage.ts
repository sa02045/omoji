import storage from '../../utils/Storage';

const STORAGE_KEY = {
  ACCESS_TOKEN_KEY: 'ACCESS_TOKEN_KEY',
  REFRESH_TOKEN_KEY: 'REFRESH_TOKEN_KEY',
  NICKNAME_KEY: 'NICKNAME_KEY',
} as const;

export function useStorage() {
  async function setStorage(key: string, value: string) {
    await storage.setItem(key, value);
  }

  async function getStorage(key: keyof typeof STORAGE_KEY) {
    const value = await storage.getItem(key);
    return value;
  }

  return {getStorage, setStorage};
}
