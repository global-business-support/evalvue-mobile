import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const getOnboardingStatus = async () => {
  try {
    const value = storage.getString('hasViewedOnboarding');
    return value === 'true';
  } catch (e) {
    console.error('Failed to fetch onboarding status', e);
    return null;
  }
};

export const setOnboardingStatus = async (status) => {
  try {
    storage.set('hasViewedOnboarding', status ? 'true' : 'false');
  } catch (e) {
    console.error('Failed to save onboarding status', e);
  }
};

