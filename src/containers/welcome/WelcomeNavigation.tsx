
import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { Screens } from 'containers/Screens';
import Permissions from './Permissions/Permissions';

enableScreens();
const Stack = createNativeStackNavigator();


interface WelcomeNavigatorProps { }

const WelcomeNavigation: React.FC<WelcomeNavigatorProps> = ({ }) => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atras',
        headerShown: false
      }}>
      <Stack.Screen name={Screens.PERMISSIONS} component={Permissions} />
    </Stack.Navigator>
  )

}

export default WelcomeNavigation;
