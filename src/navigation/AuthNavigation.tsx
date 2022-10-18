import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/Auth/Login';
import SignUp from '../screen/Auth/SignUp';
import ForgotPassword from '../screen/Auth/ForgotPassword';
import ResetPassword from '../screen/Auth/ResetPassword';
import OtpCheck from '../screen/Auth/OtpCheck';
import DashboardNavigation from './DashboardNavigation';
import {AuthNavigationTypes} from '../types/AuthNavigationTypes';

const Stack = createNativeStackNavigator<AuthNavigationTypes>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpCheck"
        component={OtpCheck}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={DashboardNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
