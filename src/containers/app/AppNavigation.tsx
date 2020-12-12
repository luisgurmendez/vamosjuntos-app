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
import AppInitialDataFetcher from './AppInitialDataFetcher';
import WelcomeNavigation from 'containers/app/welcome/WelcomeNavigation';

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {

  const shouldShowWelcome = false;

  return (
    <AppContainer>
      <Camera />
      <Toaster />
      <AppInitialDataFetcher>
        <Stack.Navigator
          initialRouteName={shouldShowWelcome ? Screens.WELCOME : Screens.TABS}
          screenOptions={{
            headerBackTitle: 'Atras',
            headerShown: false
          }}>
          <Stack.Screen name={Screens.TABS} component={TabsNavigation} />
          <Stack.Screen name={Screens.LIFT} component={LiftStack} />
          <Stack.Screen name={Screens.REVIEW} component={Review} />
          <Stack.Screen name={Screens.RIDE} component={Profile} />
          <Stack.Screen name={Screens.WELCOME} component={WelcomeNavigation} />
        </Stack.Navigator>
      </AppInitialDataFetcher>
    </AppContainer>
  );
};

export default AppNavigation;

const AppContainer = styled.View`
  flex: 1;
  position: relative;
`