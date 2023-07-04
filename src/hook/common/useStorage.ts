import storage from '../../utils/Storage';

export function useStorage() {
  async function setStorage(key: string, value: unknown) {
    await storage.setItem(key, value);
  }

  async function getStorage(key: string) {
    const value = await storage.getItem(key);
    return value;
  }

  return {getStorage, setStorage};
}
