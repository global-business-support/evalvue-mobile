import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Components/Authentication/Login';
import Register from './Components/Forms/UserRegistration'
// import OtpPassword from './Components/Authentication/OtpPassword';
import Onboarding from './OnboardingScreens/Onboarding.jsx';
import CustomModal from './Components/CustomModal/CustomModal.jsx';
import PdfRender from './Components/PdfRender/PdfRender.jsx';

const Stack = createNativeStackNavigator();

export default function AppStack() { 
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        {/* <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
  );
}
