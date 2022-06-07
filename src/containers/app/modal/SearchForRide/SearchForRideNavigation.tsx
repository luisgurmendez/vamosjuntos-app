import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchForRideScreens } from './Screens';
import SearchForRide from './SearchForRide';
import WhereFromWhereTo from './WhereFromWhereTo';
import { SearchForRideProvider } from './SearchForRideContext';
import When from './When';

const forFade = ({ current }: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator();

const SearchForRideNavigation: React.FC = () => {

  return (
    <SearchForRideProvider>

      <Stack.Navigator
        screenOptions={{
          headerBackTitle: 'Atrás',
          headerShown: false,
          cardStyleInterpolator: forFade
        }}>
        <Stack.Screen name={SearchForRideScreens.SEARCH_FOR_RIDE} component={SearchForRide} />
        <Stack.Screen
          name={SearchForRideScreens.WHERE_FROM_WHERE_TO}
          // options={{cardStyleInterpolator: forFade}}
          component={WhereFromWhereTo} />
        <Stack.Screen
          name={SearchForRideScreens.WHEN}
          // options={{cardStyleInterpolator: forFade}}
          component={When} />
      </Stack.Navigator>
    </SearchForRideProvider>

  );
};

export default SearchForRideNavigation;