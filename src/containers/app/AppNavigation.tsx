import { Screens } from 'containers/Screens';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigation from './tabs/TabsNavigation';
import LiftStack from './modal/RideOrLift/Lift/Lift';
import Profile from './tabs/Profile';
import Review from './modal/Review/Review';
import styled from 'styled-components/native';
import Toaster from 'components/Toaster/Toaster';
import Camera from 'components/Camera/Camera';

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {
  return (
    <AppContainer>
      <Camera />
      <Toaster />
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: 'Atras',
          headerShown: false
        }}>
        <Stack.Screen name={Screens.TABS} component={TabsNavigation} />
        <Stack.Screen name={Screens.LIFT} component={LiftStack} />
        <Stack.Screen name={Screens.REVIEW} component={Review} />
        <Stack.Screen name={Screens.RIDE} component={Profile} />
      </Stack.Navigator>
    </AppContainer>
  );
};

export default AppNavigation;

const AppContainer = styled.View`
  flex: 1;
  position: relative;
`