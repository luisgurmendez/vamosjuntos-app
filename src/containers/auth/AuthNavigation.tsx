import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { Screens } from 'containers/Screens';
import Login from './Login/Login';
import Register from './Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';

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
      <Stack.Screen options={{ headerShown: true }} name={Screens.REGISTER} component={Register} />
      <Stack.Screen options={{ headerShown: true }} name={Screens.FORGOT_PASSWORD} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
