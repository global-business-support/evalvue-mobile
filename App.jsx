// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
// import './gesture-handler';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Login from './Components/Authentication/Login';
import Register from './Components/Forms/UserRegistration';
// import OtpPassword from './Components/Authentication/OtpPassword';
import Onboarding from './OnboardingScreens/Onboarding.jsx';
import CustomModal from './Components/CustomModal/CustomModal.jsx';
import PdfRender from './Components/PdfRender/PdfRender.jsx';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack.tsx';
import AppDrawer from './Drawer/AppDrawer.jsx'
import AppTabs from './Drawer/AppTabs.jsx';
export default function App() {
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator>
        <Drawer.Screen name="Feed" component={Login} />
        <Drawer.Screen name="Article" component={Register} />
      </Drawer.Navigator> */}
      {/* <AppStack/> */}
      {/* <AppDrawer/> */}
      {/* <AppTabs/> */}
    </NavigationContainer>
  );
}
