import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import PolicyIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feed from '../Components/Pages/Feed';
import PdfRender from '../Components/PdfRender/PdfRender';
import DrawerContent from './DrawerContent';
import { primary } from '../Components/Styles/customStyle';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '90%',
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
    </Drawer.Navigator>
  );
}

export default AppDrawer;
