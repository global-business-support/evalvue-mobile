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
import { getStringData, getBooleanData, removeData } from './API-Management/mmkv-Storage';


const Stack = createNativeStackNavigator();
export default function AppStack() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  // useEffect(() => {
  //   const initializeApp = async () => {
  //     try {
  //       const hasViewedOnboarding = await getOnboardingStatus();
  //       if (hasViewedOnboarding === null) {
  //         await setOnboardingStatus(false);
  //         setIsFirstLaunch(true);
  //       } else {
  //         setIsFirstLaunch(!hasViewedOnboarding);
  //       }

  //       const token = await getStringData('accessToken');
  //       const tokenExpiry = await getStringData('accessTokenExpiry');
  //       const now = new Date().getTime();

  //       if (token && tokenExpiry && now < parseInt(tokenExpiry, 10)) {
  //         setIsAuthenticated(true);
  //       } else if (token) {
  //         setSessionExpired(true);
  //         removeData('accessToken');
  //         removeData('accessTokenExpiry');
  //       }
  //     } catch (error) {
  //       console.error('Error initializing app', error);
  //     }
  //   };
  //   initializeApp();
  // }, []);
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const hasViewedOnboarding = getStringData('hasViewedOnboarding');
        if (hasViewedOnboarding === null) {
          storeData('hasViewedOnboarding', 'false');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(hasViewedOnboarding !== 'true');
        }
  
        const token = getStringData('accessToken');
        const tokenExpiry = getStringData('accessTokenExpiry');
  
        if (token ) {
          setIsAuthenticated(true);
        } else if (tokenExpiry) {
          setSessionExpired(true);
          removeData('accessToken');
          removeData('accessTokenExpiry');
        }
      } catch (error) {
        console.error('Error initializing app', error);
      }
    };
    initializeApp();
  }, []);
  

  if (isFirstLaunch === null) {
    return null; // Optionally render a loading component
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
                blur: async () => await setOnboardingStatus(true),
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dashboard"
              component={AppTabs} // Ensure this is correct
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            {isAuthenticated ? (
              <Stack.Screen
                name="Dashboard"
                component={AppTabs} // Ensure this is correct
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                  initialParams={{ sessionExpired }}
                />
                <Stack.Screen
                  name="Register"
                  component={UserRegistration}
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
                <Stack.Screen
                  name="Dashboard"
                  component={AppTabs} // Ensure this is correct
                  options={{ headerShown: false }}
                />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
  );
}
