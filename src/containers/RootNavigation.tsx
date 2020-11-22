import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { Screens } from './Screens';
import AppNavigation from './app/AppNavigation';
import AuthNavigation from './auth/AuthNavigation';

enableScreens();
const Stack = createNativeStackNavigator();

const RootNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atras',
        headerShown: false
      }}>
      <Stack.Screen name={Screens.AUTH} component={AuthNavigation} />
      <Stack.Screen name={Screens.APP} component={AppNavigation} />
    </Stack.Navigator>
  )
}

export default RootNavigation;