import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { Screens } from 'containers/Screens';
import Login from './Login/Login';
import Register from './Register/Register';

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
      <Stack.Screen name={Screens.REGISTER} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
