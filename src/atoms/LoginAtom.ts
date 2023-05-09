import {RecoilState, atom} from 'recoil';
export const loginAtom: RecoilState<boolean> = atom({
  key: 'loginAtom',
  default: false,
});
