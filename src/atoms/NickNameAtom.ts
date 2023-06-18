import {RecoilState, atom, selector} from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';
import STORAGE_KEY from '../constants/StorageKey';

export const nicknameAtom: RecoilState<string> = atom({
  key: 'nicknameAtom',
  default: '',
});

export const nicknameSelector = selector({
  key: 'NicknameSelector',
  get: async ({get}) => {
    const nickname = get(nicknameAtom);
    if (nickname.length) {
      return nickname;
    } else {
      const encryptedNickname = await EncryptedStorage.getItem(
        STORAGE_KEY.NICKNAME_KEY,
      );
      if (encryptedNickname) {
        return encryptedNickname;
      } else {
        return '';
      }
    }
  },
  set(opts, newValue) {
    const {set} = opts;
    set(nicknameAtom, newValue);
    if (typeof newValue === 'string') {
      EncryptedStorage.setItem(STORAGE_KEY.NICKNAME_KEY, newValue);
    }
  },
});
