import { Screens } from 'containers/Screens';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Rides from './Rides';
import RideDetails from './RideDetails';

const Stack = createStackNavigator();

const RidesNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerBackTitle: 'Atras',
        headerShown: false
      }}>
      <Stack.Screen name={Screens.RIDES} component={Rides} />
      <Stack.Screen name={Screens.RIDE} component={RideDetails} />
    </Stack.Navigator>
  );
};

export default RidesNavigation;
