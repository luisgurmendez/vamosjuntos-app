import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import RideOrLift from './RideOrLift/RideOrLift';
import Login from './Login/Login';
import { Screens } from './Screens';
import LiftStack from './RideOrLift/Lift/Lift';

enableScreens();
const Stack = createNativeStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atras',
        headerShown: false
      }}>
      <Stack.Screen name={Screens.RIDE_OR_LIFT} component={RideOrLift} />
      <Stack.Screen name={Screens.LOGIN} component={Login} />
      <Stack.Screen name={Screens.LIFT} component={LiftStack} />
    </Stack.Navigator>
  )
}

export default AppStack;