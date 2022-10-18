import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../screen/Dashboard';
import {Platform} from 'react-native';
import CustomDrawer from '../components/CustomDrawer';
import ProfileScreen from '../screen/ProfileScreen';
import Icon from 'react-native-vector-icons/Feather';
Icon.loadFont();
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
          fontFamily: 'Jost-SemiBold',
        },
        // drawerActiveBackgroundColor: '#26a69a',
        drawerActiveTintColor: '#26a69a',
        drawerInactiveTintColor: 'black',
        headerTintColor: 'white',
      }}
      useLegacyImplementation
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Crew Meet',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#26a69a',
          },
          headerTitleStyle: {
            fontFamily: 'Jost-Black',
            color: 'white',
            fontSize: Platform.OS === 'ios' ? 22 : 20,
          },
          drawerIcon: ({color}) => {
            return <Icon name="video" size={25} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Your Profile',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#26a69a',
          },
          headerTitleStyle: {
            fontFamily: 'Jost-Black',
            color: 'white',
            fontSize: Platform.OS === 'ios' ? 22 : 20,
          },
          drawerIcon: ({color}) => {
            return <Icon name="user" size={25} color={color} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerNavigation;
