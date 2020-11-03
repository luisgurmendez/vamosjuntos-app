import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import WhereTo from './LiftForm/WhereTo';
import { LiftScreens } from './LiftScreens';
import WhereFrom from './LiftForm/WhereFrom';
import HowMany from './LiftForm/HowMany';
import When from './LiftForm/When';

enableScreens();
const Stack = createNativeStackNavigator();

const LiftStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atras'
      }}>
      <Stack.Screen options={{ headerShown: false, title: "A donde vas?" }} name={LiftScreens.LIFT_WHERE_TO} component={WhereTo} />
      <Stack.Screen options={{ headerShown: false, title: "De donde salis?" }} name={LiftScreens.LIFT_WHERE_FROM} component={WhereFrom} />
      <Stack.Screen options={{ headerShown: false, title: "Counts llevas?" }} name={LiftScreens.HOW_MANY} component={HowMany} />
      <Stack.Screen options={{ headerShown: false, title: "Counts llevas?" }} name={LiftScreens.WHEN} component={When} />
    </Stack.Navigator>
  )
}

export default LiftStack;