// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
// import './gesture-handler';
import React, {useState} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import Login from './Components/Authentication/Login';
import Register from './Components/Forms/UserRegistration';
// import OtpPassword from './Components/Authentication/OtpPassword';
import Onboarding from './OnboardingScreens/Onboarding.jsx';
import CustomModal from './Components/CustomModal/CustomModal.jsx';
import PdfRender from './Components/PdfRender/PdfRender.jsx';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack.tsx';
import AppDrawer from './Drawer/AppDrawer.jsx'
import AppTabs from './Drawer/AppTabs.jsx';
import { windowHeight } from './Components/Styles/customStyle.js';
import NetworkErrorOverlay from './Components/CustomModal/NetworkErrorOverlay.js';
export default function App() {
  return (
    <View style={{backgroundColor: '#FFF', height: windowHeight}}>
    <NavigationContainer>
      <StatusBar 
       animated={true}
        backgroundColor="white"
        barStyle='dark-content'
        />
 
      <AppStack/>
   
      <NetworkErrorOverlay />
    </NavigationContainer>
    </View>
  );
}
// App.js
// App.js
// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import OfferPoster from './Components/Othercomponent/OfferPosters'; // Import the OfferPoster component

// const App = () => {
//   const [showPoster, setShowPoster] = useState(true); // Initially set to true to show poster

//   // Function to close the poster
//   const closePoster = () => setShowPoster(true);

//   useEffect(() => {
   
//   }, []);

//   return (
//     <View style={styles.container}>
//       <OfferPoster
//         mediaUri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0K2zhP2SXRepTZrgtqUpTYcFotdUuUIulKQ&s'} // Local video file
//         type="image" // Specify the type as 'video'
//         visible={showPoster}
//         onClose={closePoster}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default App;

