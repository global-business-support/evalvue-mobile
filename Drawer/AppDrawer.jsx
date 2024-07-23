import 'react-native-gesture-handler';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import PolicyIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../Components/Authentication/Login';
import Register from '../Components/Forms/UserRegistration';
import DrawerContent from './DrawerContent';
import PdfRender from '../Components/PdfRender/PdfRender';
import Feed from '../Components/Pages/Feed';
import {primary} from '../Components/Styles/customStyle';

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
          drawerIcon: ({size}) => (
            <Icon name={'appstore1'} size={size} color={primary} />
          ),
          drawerActiveBackgroundColor: '#DAE0E2',
          drawerActiveTintColor: 'black',
          drawerInactiveBackgroundColor: '#F2F5F7',
          drawerActiveTintColor: 'black',
        }}
      />
      <Drawer.Screen
        name="Terms and Conditions"
        component={PdfRender}
        initialParams={{
          pdfUrl: 'http://api.evalvue.com/media/Policy/privacy policy.pdf',
        }}
        options={{
          drawerIcon: ({size}) => (
            <PolicyIcon name={'shield-alert'} size={size} color={primary} />
          ),
          drawerActiveBackgroundColor: '#DAE0E2',
          drawerActiveTintColor: 'black',
          drawerInactiveBackgroundColor: '#F2F5F7',
          drawerActiveTintColor: 'black',
        }}
      />
      <Drawer.Screen
        name="Refund Policies"
        component={PdfRender}
        initialParams={{
          pdfUrl: 'http://api.evalvue.com/media/Policy/privacy policy.pdf',
        }}
        options={{
          drawerIcon: ({size}) => (
            <PolicyIcon name={'shield-refresh'} size={size} color={primary} />
          ),
          drawerActiveBackgroundColor: '#DAE0E2',
          drawerActiveTintColor: 'black',
          drawerInactiveBackgroundColor: '#F2F5F7',
          drawerActiveTintColor: 'black',
        }}
      />
      <Drawer.Screen
        name="Privacy Policies"
        component={PdfRender}
        initialParams={{
          pdfUrl: 'http://api.evalvue.com/media/Policy/privacy policy.pdf',
        }}
        options={{
          drawerIcon: ({size}) => (
            <PolicyIcon name={'shield-lock'} size={size} color={primary} />
          ),
          drawerActiveBackgroundColor: '#DAE0E2',
          drawerActiveTintColor: 'black',
          drawerInactiveBackgroundColor: '#F2F5F7',
          drawerActiveTintColor: 'black',
        }}
      />
    </Drawer.Navigator>
  );
}

export default AppDrawer;

const styles = StyleSheet.create({
  heading: {
    width: '100%',
    // backgroundColor : '#6739B7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  icon: {
    fontSize: 25,
    color: '#6739B7',
  },
});
