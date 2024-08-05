import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const storeData = (key, value) => {
  try {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      storage.set(key, value);
    } else {
      console.error(`Failed to store ${key}. Value must be of type string, number, or boolean.`);
    }
  } catch (e) {
    console.error(`Failed to store ${key}`, e);
  }
};

export const removeData = (key) => {
  try {
    storage.delete(key);
  } catch (e) {
    console.error(`Failed to remove ${key}`, e);
  }
};

export const getStringData = (key) => {
  try {
    return storage.getString(key);
  } catch (e) {
    console.error(`Failed to get ${key}`, e);
    return null;
  }
};

export const getBooleanData = (key) => {
  try {
    return storage.getBoolean(key);
  } catch (e) {
    console.error(`Failed to get ${key}`, e);
    return null;
  }
};

export const getNumberData = (key) => {
  try {
    return storage.getNumber(key);
  } catch (e) {
    console.error(`Failed to get ${key}`, e);
    return null;
  }
};