import { Screens } from 'containers/Screens';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigation from './tabs/TabsNavigation';
import LiftStack from './modal/RideOrLift/Lift/Lift';
import Profile from './tabs/Profile';
import Score from './modal/Score/Score';

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerBackTitle: 'Atras',
        headerShown: false
      }}>
      <Stack.Screen name={Screens.TABS} component={TabsNavigation} />
      <Stack.Screen name={Screens.LIFT} component={LiftStack} />
      <Stack.Screen name={Screens.SCORE} component={Score} />
      <Stack.Screen name={Screens.RIDE} component={Profile} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
