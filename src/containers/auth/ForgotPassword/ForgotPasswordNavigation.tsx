import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import Screens from './Screens';
import ForgotPasswordPhone from './ForgotPasswordPhone';

enableScreens();
const Stack = createNativeStackNavigator();

const ForgotPasswordNavigation: React.FC = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atras',
        headerShown: false
      }}>
      <Stack.Screen name={Screens.PHONE} component={ForgotPasswordPhone} />
      <Stack.Screen name={Screens.CODE_CONFIRMATION} component={ForgotPasswordPhone} />
      <Stack.Screen options={{ headerShown: true }} name={Screens.RESET_PASSWORD} component={ForgotPasswordPhone} />
    </Stack.Navigator>
  );
};

export default ForgotPasswordNavigation;
