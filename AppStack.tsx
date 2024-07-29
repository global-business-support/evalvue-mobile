import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Components/Authentication/Login';
import UserRegistration from './Components/Forms/UserRegistration';
import Onboarding from './OnboardingScreens/Onboarding';
import AppTabs from './Drawer/AppTabs';
import OtpPassword from './Components/Authentication/OtpPassword';
import ForgotPassword from './Components/Authentication/ForgotPassword';
import { getOnboardingStatus, setOnboardingStatus } from './Utils/Storage';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasViewedOnboarding = getOnboardingStatus();
      if (hasViewedOnboarding === null) {
        // If there is no value, assume it's the first launch
        setOnboardingStatus(false); // Initialize with false
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(!hasViewedOnboarding);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isFirstLaunch === null) {
    // Optionally render a splash screen or loading indicator while checking
    return null;
  }

  return (
      <Stack.Navigator>
        {isFirstLaunch ? (
          <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
              listeners={{
                // Set onboarding status to true when Onboarding screen is done
                blur: async () => await setOnboardingStatus(true),
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={UserRegistration}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dashboard"
              component={AppTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Verify"
              component={OtpPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
  );
}
