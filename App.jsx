import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack'; // Ensure correct import path
import { navigationRef } from './API-Management/navigationService'; // Ensure correct import path
import NetworkErrorOverlay from './Components/CustomModal/NetworkErrorOverlay'; // Ensure correct import path
import { windowHeight } from './Components/Styles/customStyle'; // Ensure correct import path

export default function App() {
  return (
    <View style={{ backgroundColor: '#FFF', height: windowHeight }}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle='dark-content'
        />
        <AppStack />
        <NetworkErrorOverlay />
      </NavigationContainer>
    </View>
  );
}
