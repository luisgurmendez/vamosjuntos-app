import { Screens } from 'containers/Screens';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile/Profile';
import Comments from './Comments/Comments';

const Stack = createStackNavigator();

const ProfileNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atras',
        headerShown: false
      }}>
      <Stack.Screen name={Screens.PROFILE} component={Profile} />
      <Stack.Screen name={Screens.COMMENTS} component={Comments} />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
