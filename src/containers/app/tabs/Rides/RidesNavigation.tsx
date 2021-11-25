import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import styled from 'styled-components/native';
import RideRequests from './RideRequests';
import Rides from './Rides';
import RidesScreens from './Screens';

const Stack = createNativeStackNavigator();

interface ConfigurationStackProps { }

const ConfigurationStack: React.FC<ConfigurationStackProps> = ({ }) => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atrás',
        headerShown: false
      }}>
      <Stack.Screen name={RidesScreens.RIDES} component={Rides} />
      <Stack.Screen name={RidesScreens.RIDE_REQUESTS} component={RideRequests} />
    </Stack.Navigator>
  )

}

export default ConfigurationStack;

const Container = styled.View``