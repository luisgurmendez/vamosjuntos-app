import React from 'react';
import { createRideRequest } from 'api/callables';
import crashlytics from '@react-native-firebase/crashlytics';
import Toaster from 'components/Toaster/Toaster';
import { useDispatch } from 'react-redux';
import { addRideRequest } from 'state/ride/actions';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { SearchForRideScreens } from './Screens';
import SearchForRide from './SearchForRide';
import JoinRide from '../JoinRide/JoinRide';
import WhereFromWhereTo from './WhereFromWhereTo';
import { SearchForRideProvider } from './SearchForRideContext';
import When from './When';

const forFade = ({ current }:any) => ({
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
          }}>
          <Stack.Screen name={SearchForRideScreens.SEARCH_FOR_RIDE} component={SearchForRide} />
          <Stack.Screen 
          name={SearchForRideScreens.WHERE_FROM_WHERE_TO}
          options={{
            cardStyleInterpolator: forFade
          }}
          component={WhereFromWhereTo} />
          <Stack.Screen 
          name={SearchForRideScreens.WHEN}
          options={{
            cardStyleInterpolator: forFade
          }}
          component={When} />
        </Stack.Navigator>
      {/* </Formik> */}
      </SearchForRideProvider>

  );
};

export default SearchForRideNavigation;
