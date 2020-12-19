import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { Screens } from './Screens';
import AppNavigation from './app/AppNavigation';
import AuthNavigation from './auth/AuthNavigation';
import { useSelector } from 'react-redux';
import { getIsUserLoggedIn } from 'state/user/selectors';

enableScreens();
const Stack = createNativeStackNavigator();

const RootNavigation: React.FC = () => {

  const isLoggedIn = useSelector(getIsUserLoggedIn);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atras',
        headerShown: false,
      }}>
      {isLoggedIn ?
        <Stack.Screen name={Screens.APP} component={AppNavigation} />
        :
        <Stack.Screen name={Screens.AUTH} component={AuthNavigation} />
      }
    </Stack.Navigator>
  );
};

export default RootNavigation;
