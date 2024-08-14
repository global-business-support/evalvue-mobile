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
import { getBooleanData, getStringData } from './API-Management/mmkv-Storage'; // Assuming this is your storage utility
import { storeData } from './API-Management/mmkv-Storage';

const Stack = createNativeStackNavigator();
 
export default function AppStack() {
  const [viewedOnboarding, setViewedOnboarding] = useState(false); // Loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  
  const checkOnboaring =  () =>{
   
    if(getBooleanData("viewedOnboarding")){
      setViewedOnboarding(true);
    }
    else{
      setViewedOnboarding(false)
    }
  
  }


  useEffect(() => {
    // if(!getStringData('viewedOnboarding')){
    //   storeData("viewedOnboarding" , false)
    // }
    checkOnboaring()
    const initializeApp = async () => {
      try {
        // Check for onboarding status
        const hasViewedOnboarding = await getOnboardingStatus();
        if (hasViewedOnboarding === false) {
          setOnboardingStatus(false); // Initialize with false if not set
        }

        // Check for access token
        const accessToken = await getStringData('accessToken');
        if (accessToken) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      } catch (error) {
        console.error('Error initializing app', error); 
        setIsAuthenticated(false); // Handle errors gracefully
      }
    };

    initializeApp();
  }, []);



  return (
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={AppTabs}
              options={{ headerShown: false }}
            />
            {/* Optionally, you can also add other authenticated routes here */}
          </>
        ) : (
          <>
          {!viewedOnboarding && (<Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
              listeners={{
                blur: async () => await setOnboardingStatus(true),
              }}
            />)}
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="Dashboard"
              component={AppTabs}
              options={{ headerShown: false }}
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
          </>
        )}
      </Stack.Navigator>
  );
}
