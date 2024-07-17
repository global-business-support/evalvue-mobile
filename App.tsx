import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
// import Login from './Components/Authentication/Login';
// import OtpPassword from './Components/Authentication/OtpPassword';
import Onboarding from './OnboardingScreens/Onboarding.jsx';
import SplashScreen from './Components/SplashScreen.jsx';
import CustomModal from './Components/CustomModal/CustomModal.jsx';
import PdfRender from './Components/PdfRender/PdfRender.jsx';

function App(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(true);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Onboarding />
        {/* <PdfRender/> */}
        <CustomModal visible={modalVisible} onClose={handleCloseModal} />
      </View>
    </>
  );
}

export default App;
