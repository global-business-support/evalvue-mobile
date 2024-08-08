import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PhoneIcon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';
import PolicyIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AboutIcon from 'react-native-vector-icons/AntDesign';
import Feed from '../Components/Pages/Feed';
import PdfRender from '../Components/PdfRender/PdfRender';
import DrawerContent from './DrawerContent';
import { primary } from '../Components/Styles/customStyle';
import ContactUs from '../Components/Pages/ContactUs';
import AboutUs from '../Components/Pages/AboutUs';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '100%',
        },
      }}>
      <Drawer.Screen
        name="View all feed"
        component={Feed}
        options={{
          drawerIcon: ({ size }) => (
            <Icon name={'appstore1'} size={size} color={primary} />
          ),
          drawerActiveBackgroundColor: '#DAE0E2',
          drawerActiveTintColor: 'black',
          drawerInactiveBackgroundColor: '#F2F5F7',
          drawerInactiveTintColor: 'black',
        }}
      />
      <Drawer.Screen
        name="Terms and Conditions"
        component={PdfRender}
        initialParams={{
          pdfUrl: 'https://api.evalvue.com/media/Terms/Terms and Conditions.pdf',
        }}
        options={{
          drawerIcon: ({ size }) => (
            <PolicyIcon name={'shield-alert'} size={size} color={primary} />
          ),
          drawerActiveBackgroundColor: '#DAE0E2',
          drawerActiveTintColor: 'black',
          drawerInactiveBackgroundColor: '#F2F5F7',
          drawerInactiveTintColor: 'black',
        }}
      />
      <Drawer.Screen
        name="Refund Policies"
        component={PdfRender}
        initialParams={{
          pdfUrl: 'https://api.evalvue.com/media/Refund/Refund Policy.pdf',
        }}
        options={{
          drawerIcon: ({ size }) => (
            <PolicyIcon name={'shield-refresh'} size={size} color={primary} />
          ),
          drawerActiveBackgroundColor: '#DAE0E2',
          drawerActiveTintColor: 'black',
          drawerInactiveBackgroundColor: '#F2F5F7',
          drawerInactiveTintColor: 'black',
        }}
      />
      <Drawer.Screen
        name="Privacy Policies"
        component={PdfRender}
        initialParams={{
          pdfUrl: 'https://api.evalvue.com/media/Policy/privacy policy.pdf',
        }}
        options={{
          drawerIcon: ({ size }) => (
            <PolicyIcon name={'shield-lock'} size={size} color={primary} />
          ),
          drawerActiveBackgroundColor: '#DAE0E2',
          drawerActiveTintColor: 'black',
          drawerInactiveBackgroundColor: '#F2F5F7',
          drawerInactiveTintColor: 'black',
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUs}
        options={{
          drawerIcon: ({ size }) => (
            <PhoneIcon name={'phone-alt'} size={size} color={primary} />
          ),
          drawerActiveBackgroundColor: '#DAE0E2',
          drawerActiveTintColor: 'black',
          drawerInactiveBackgroundColor: '#F2F5F7',
          drawerInactiveTintColor: 'black',
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          drawerIcon: ({ size }) => (
            <AboutIcon name={'exclamationcircle'} size={size} color={primary} />
          ),
          drawerActiveBackgroundColor: '#DAE0E2',
          drawerActiveTintColor: 'black',
          drawerInactiveBackgroundColor: '#F2F5F7',
          drawerInactiveTintColor: 'black',
        }}
      />
    </Drawer.Navigator>
  );
}

export default AppDrawer;