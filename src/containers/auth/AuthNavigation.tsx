import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { Screens } from 'containers/Screens';
import Login from './Login/Login';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import RegisterNavigation from './Register/RegisterNavigation';
import Toaster from 'components/Toaster/Toaster';

enableScreens();
const Stack = createNativeStackNavigator();

const AuthNavigation: React.FC = () => {

  return (
    <>
      <Toaster />
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: 'Atrás',
          headerShown: false
        }}>
        <Stack.Screen name={Screens.LOGIN} component={Login} />
        <Stack.Screen name={Screens.REGISTER} component={RegisterNavigation} />
        <Stack.Screen name={Screens.FORGOT_PASSWORD} component={ForgotPassword} />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigation;
