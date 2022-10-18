import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import Dashboard from '../screen/Dashboard';
import CreateMeeting from '../screen/CreateMeeting';
import JoinMeeting from '../screen/JoinMeeting';
import AllMeeting from '../screen/AllMeeting';
import Meeting from '../screen/Meeting';
import {Platform} from 'react-native';
import {DashboardNavigationTypes} from '../types/DashboardNavigationTypes';
import DrawerNavigation from './DrawerNavigation';

const Stack = createNativeStackNavigator<DashboardNavigationTypes>();

const DashboardNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateMeeting"
        component={CreateMeeting}
        options={{
          title: 'Create your meeting',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#26a69a',
          },
          headerTitleStyle: {
            fontFamily: 'Jost-Black',
            color: 'white',
            fontSize: Platform.OS === 'ios' ? 22 : 20,
          },
        }}
      />
      <Stack.Screen
        name="JoinMeeting"
        component={JoinMeeting}
        options={{
          title: 'Join meeting',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#26a69a',
          },
          headerTitleStyle: {
            fontFamily: 'Jost-Black',
            color: 'white',
            fontSize: Platform.OS === 'ios' ? 22 : 20,
          },
        }}
      />
      <Stack.Screen
        name="AllMeeting"
        component={AllMeeting}
        options={{
          title: 'All Meeting',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#DBA800',
          },
          headerTitleStyle: {
            fontFamily: 'Jost-Black',
            fontSize: Platform.OS === 'ios' ? 22 : 20,
          },
        }}
      />
      <Stack.Screen
        name="Meeting"
        component={Meeting}
        options={{
          title: 'Meeting ID: 754-124-535',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#DBA800',
          },
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'Jost-Black',
            fontSize: Platform.OS === 'ios' ? 22 : 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;
