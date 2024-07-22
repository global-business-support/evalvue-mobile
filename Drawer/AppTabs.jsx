import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OrgList from '../Components/Pages/OrgList';
import OrgRegistration from '../Components/Forms/OrgRegistration';
import Subscription from '../Components/Payment-Pages/Subscription';
import Notifications from '../Components/Pages/Notifications';
import Feed from '../Components/Pages/Feed';
import HomeIcon from 'react-native-vector-icons/Ionicons';
import OrgIcon from 'react-native-vector-icons/Octicons';
import HistoryIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import SearchByAadhar from '../Components/Pages/SearchByAadhar';
import EmployeeList from '../Components/Pages/EmployeeList';
import EmployeeDetails from '../Components/Pages/EmployeeDetails';
import EmpForm from '../Components/Forms/EmpForm';
import AppDrawer from './AppDrawer';
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const OrgStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={AppDrawer} />
      <HomeStack.Screen name="SearchByAadhar" component={SearchByAadhar} />
    </HomeStack.Navigator>
  );
}
function OrgStackScreen() {
  return (
    <OrgStack.Navigator screenOptions={{headerShown: false}}>
      <OrgStack.Screen name="OrganizationList" component={OrgList} />
      <OrgStack.Screen name="EmployeeList" component={EmployeeList} />
      <OrgStack.Screen name="EmployeeDetails" component={EmployeeDetails} />
      <OrgStack.Screen name="AddOrganization" component={OrgRegistration} />
      <OrgStack.Screen name="AddEmployee" component={EmpForm} />
    </OrgStack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <HomeIcon
              name="home"
              size={26}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Oganization"
        component={OrgStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <OrgIcon
              name="organization"
              size={26}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={OrgRegistration}
        options={{
          tabBarIcon: ({focused}) => (
            <OrgIcon
              name="diff-added"
              size={26}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={Subscription}
        options={{
          tabBarIcon: ({focused}) => (
            <HistoryIcon
              name="history"
              size={26}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notifications}
        options={{
          tabBarIcon: ({focused}) => (
            <HomeIcon
              name="notifications"
              size={26}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppTabs;
