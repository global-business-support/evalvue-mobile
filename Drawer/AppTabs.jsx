import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import HomeIcon from 'react-native-vector-icons/Ionicons';
import SubIcon from 'react-native-vector-icons/MaterialIcons';
import OrgIcon from 'react-native-vector-icons/Octicons';
import HistoryIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import OrgList from '../Components/Pages/OrgList';
import OrgRegistration from '../Components/Forms/OrgRegistration';
import Subscription from '../Components/Payment-Pages/Subscription';
import PaymentHistory from '../Components/Payment-Pages/PaymentHistory';
import Notifications from '../Components/Pages/Notifications';
import SearchByAadhar from '../Components/Pages/SearchByAadhar';
import EmployeeList from '../Components/Pages/EmployeeList';
import EmployeeDetails from '../Components/Pages/EmployeeDetails';
import EmpForm from '../Components/Forms/EmpForm';
import AppDrawer from './AppDrawer';
import PostReview from '../Components/Forms/PostReview';
import AddToOrganization from '../Components/Pages/AddToOrganization';
import { primary } from '../Components/Styles/customStyle';
import EmpInfo from '../Components/Pages/EmpInfo';
import OrgInfo from '../Components/Pages/OrgInfo';
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const OrgStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={AppDrawer} />
      <HomeStack.Screen name="SearchByAadhar" component={SearchByAadhar} />
      <HomeStack.Screen name="EmployeeDetails" component={EmployeeDetails} />
      <HomeStack.Screen name="AddToOrganization" component={AddToOrganization} />
      <HomeStack.Screen name="EmployeeList" component={EmployeeList} />
      <HomeStack.Screen name="AddReview" component={PostReview} />
      <HomeStack.Screen name="Notifications" component={Notifications} />
      <HomeStack.Screen name="EmpInfo" component={EmpInfo} />
      <HomeStack.Screen name="OrgInfo" component={OrgInfo} />
      <HomeStack.Screen name="OrganizationList" component={OrgList} />
    </HomeStack.Navigator>
  );
}

function OrgStackScreen() {
  return (
    <OrgStack.Navigator screenOptions={{ headerShown: false }}>
      <OrgStack.Screen name="OrganizationList" component={OrgList} />
      <OrgStack.Screen name="EmployeeList" component={EmployeeList} />
      <OrgStack.Screen name="EmployeeDetails" component={EmployeeDetails} />
      <OrgStack.Screen name="AddOrganization" component={OrgRegistration} />
      <OrgStack.Screen name="AddEmployee" component={EmpForm} />
      <OrgStack.Screen name="AddReview" component={PostReview} />
    </OrgStack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: '#FFF',
        borderTopWidth: 0.3,
        borderColor: '#2e3131'
      }
    }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              name="home"
              size={23}
              color={focused ? primary : '#47535E'}
              style={focused ? styles.activeIcon : styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Organization"
        component={OrgStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <OrgIcon
              name="organization"
              size={23}
              color={focused ? primary : '#47535E'}
              style={focused ? styles.activeIcon : styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={OrgRegistration}
        options={{
          tabBarIcon: ({ focused }) => (
            <OrgIcon
              name="diff-added"
              size={23}
              color={focused ? primary : '#47535E'}
              style={focused ? styles.activeIcon : styles.icon}
            />
          ),
          initialParams: { editOrgData: { editorg: false }, }
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={Subscription}
        options={{
          tabBarIcon: ({ focused }) => (
            <SubIcon
              name="subscriptions"
              size={23}
              color={focused ? primary : '#47535E'}
              style={focused ? styles.activeIcon : styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={{
          tabBarIcon: ({ focused }) => (
            <HistoryIcon
              name="history"
              size={23}
              color={focused ? primary : '#47535E'}
              style={focused ? styles.activeIcon : styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
  },
  activeIcon: {
    backgroundColor: '#C0C0E7', 
    padding: 6,
    textAlign: 'center',
    verticalAlign: 'middle',
    height: 40,
    width: 40,
    borderRadius: 50,
    transform: [{ scale: 1.08 }],
  },
});

export default AppTabs;
