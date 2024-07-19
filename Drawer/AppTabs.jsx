import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../Components/Authentication/Login';
import Register from '../Components/Forms/UserRegistration';
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Login} />
      <Tab.Screen name="Settings" component={Register} />
    </Tab.Navigator>
  );
}

export default AppTabs;