import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { Screens } from 'containers/Screens';
import Login from './Login/Login';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import RegisterNavigation from './Register/RegisterNavigation';
import ForgotPasswordNavigation from './ForgotPassword/ForgotPasswordNavigation';

enableScreens();
const Stack = createNativeStackNavigator();

const AuthNavigation: React.FC = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atras',
        headerShown: false
      }}>
      <Stack.Screen name={Screens.LOGIN} component={Login} />
      <Stack.Screen name={Screens.REGISTER} component={RegisterNavigation} />
      <Stack.Screen name={Screens.FORGOT_PASSWORD} component={ForgotPasswordNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
