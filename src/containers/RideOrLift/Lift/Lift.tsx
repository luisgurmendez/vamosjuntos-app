import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { LiftScreens } from './LiftScreens';
import HowMany from './LiftForm/HowMany';
import Price from './LiftForm/Price';
import LiftWhen from './LiftForm/LiftWhen';
import LiftWhereFrom from './LiftForm/LiftWhereFrom';
import LiftWhereTo from './LiftForm/LiftWhereTo';

enableScreens();
const Stack = createNativeStackNavigator();

const LiftStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atras',
        headerShown: false
      }}>
      <Stack.Screen
        name={LiftScreens.WHERE_TO}
        component={LiftWhereTo}
      />
      <Stack.Screen
        name={LiftScreens.WHERE_FROM}
        component={LiftWhereFrom} />
      <Stack.Screen
        name={LiftScreens.HOW_MANY}
        component={HowMany} />
      <Stack.Screen
        name={LiftScreens.WHEN}
        component={LiftWhen} />
      <Stack.Screen
        name={LiftScreens.PRICE}
        component={Price} />
    </Stack.Navigator>
  )
}

export default LiftStack;
