import EncryptedStorage from 'react-native-encrypted-storage';

class Storage {
  storage = EncryptedStorage;
  constructor(storage: typeof EncryptedStorage) {
    this.storage = storage;
  }

  async getItem(key: string) {
    return this.storage.getItem(key);
  }

  async setItem(key: string, value: string) {
    return this.storage.setItem(key, value);
  }

  async removeItem(key: string) {
    this.storage.removeItem(key);
  }
}

const storage = new Storage(EncryptedStorage);

export default storage;
