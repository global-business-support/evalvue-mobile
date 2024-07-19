import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
// import Login from './Components/Authentication/Login';
// import OtpPassword from './Components/Authentication/OtpPassword';
import Onboarding from './OnboardingScreens/Onboarding.jsx';
import CustomModal from './Components/CustomModal/CustomModal.jsx';
import PdfRender from './Components/PdfRender/PdfRender.jsx';
import EmployeeDetails from './Components/Pages/EmployeeDetails.jsx';
import OrgList from './Components/Pages/OrgList.jsx';
import Profile from './Components/Pages/Profile.jsx';
import Feed from './Components/Pages/Feed.jsx';
import LandingPage from './Components/Header-Footer/LandingPage.jsx';

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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {/* <PdfRender /> */}
      </View>
    </>
  );
}

export default App;
