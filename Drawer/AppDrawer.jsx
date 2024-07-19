import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../Components/Authentication/Login';
import Register from '../Components/Forms/UserRegistration';
const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Login} />
      <Drawer.Screen name="Article" component={Register} />
    </Drawer.Navigator>
  );
}

export default AppDrawer;