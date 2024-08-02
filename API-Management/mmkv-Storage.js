import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
export const storeData = (key, value) => {
  storage.set(key, value);
};
export const removeData = (key, value) => {
  storage.delete(key, value);
};
export const getStringData = (key) => {
  return storage.getString(key);
};
export const getBooleanData = (key) => {
    return storage.getBoolean(key);
  };

