import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import Screens from './Screens';
import Register from './Register';

enableScreens();
const Stack = createNativeStackNavigator();

const RegisterNavigation: React.FC = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atrás',
        headerShown: false
      }}>
      <Stack.Screen name={Screens.REGISTER} component={Register} />
      {/* <Stack.Screen name={Screens.CODE_CONFIRMATION} component={RegisterCodeConfirmation} /> */}
    </Stack.Navigator>
  );
};

export default RegisterNavigation;
