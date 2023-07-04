import EncryptedStorage from 'react-native-encrypted-storage';

class Storage {
  storage = EncryptedStorage;
  constructor(storage: typeof EncryptedStorage) {
    this.storage = storage;
  }

  async getItem(key: string) {
    return await this.storage.getItem(key);
  }

  async setItem(key: string, value: unknown) {
    return await this.storage.setItem(key, JSON.stringify(value));
  }
}

const storage = new Storage(EncryptedStorage);

export default storage;
