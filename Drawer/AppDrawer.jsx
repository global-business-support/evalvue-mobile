import 'react-native-gesture-handler'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Entypo';
import Login from '../Components/Authentication/Login';
import Register from '../Components/Forms/UserRegistration';
import DrawerContent from './DrawerContent';
import PdfRender from '../Components/PdfRender/PdfRender';
import Feed from '../Components/Pages/Feed';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator
     drawerContent={props => <DrawerContent {...props}/>}
     screenOptions={{
    //  headerShown: false,
      drawerStyle:{
        width :'90%'
      }
     }}
    >
     
      <Drawer.Screen name="View all feed" component={Feed} 
      options={{
        drawerActiveBackgroundColor : "#DAE0E2",
        drawerActiveTintColor : 'black'
      }
      }/>
      <Drawer.Screen name="Terms and Conditions" component={PdfRender} 
      options={{
        drawerActiveBackgroundColor : "#DAE0E2",
        drawerActiveTintColor : 'black',
      }
      }/>
      <Drawer.Screen name="Refund Policies" component={PdfRender} 
      options={{
        drawerActiveBackgroundColor : "#DAE0E2",
        drawerActiveTintColor : 'black',
      }
      }/>
      <Drawer.Screen name="Privacy Policies" component={PdfRender} 
      options={{
        drawerActiveBackgroundColor : "#DAE0E2",
        drawerActiveTintColor : 'black',
      }
      }/>
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
})