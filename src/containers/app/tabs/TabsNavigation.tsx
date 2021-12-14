import React, { useEffect } from 'react';
import Notifications, { NotificationsTabOptions } from './Notifications';
import ConfigurationNavigation, { ConfigurationTabOptions } from './Configuration';
import RidesNavigation, { RidesTabOptions } from './Rides';
import ProfileNavigation, { ProfileTabOptions } from './Profile';
import { useSelector } from 'react-redux';
import { getNumberOfUnseenNotifications } from 'state/notification/selectors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Screens } from 'containers/Screens';
import { AppState } from 'state/types';
import { useNavigation } from '@react-navigation/native';
import { getPendingRides } from 'state/ride/selectors';
import useStorage from 'hooks/useStorage';
import Storage from 'storage/Storage';
import { getUser } from 'state/user/selectors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreateRideTabOptions } from './CreateRide/CreateRideTabOptions';
import CreateRideDummyScreen from './CreateRide/CreateRideDummyScreen';

const Tab = createBottomTabNavigator();

const TabsNavigation: React.FC = () => {

  const user = useSelector(getUser);
  const numOfNotificaitons = useSelector(getNumberOfUnseenNotifications);
  const numOfPendingRides = useSelector(getPendingRides).length;
  const numOfProfileValuesNeedingFixes = user?.phone === undefined || user?.phone === '' || user?.phone === null ? 1 : 0;
  useRedirectInitialRoute();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Tab.Navigator
          tabBarOptions={{ showLabel: true }}
        >
          <Tab.Screen name={Screens.RIDES_TAB} options={RidesTabOptions(numOfPendingRides)} component={RidesNavigation} />
          <Tab.Screen name={Screens.NOTIFICATIONS_TAB} options={NotificationsTabOptions(numOfNotificaitons)} component={Notifications} />
          <Tab.Screen listeners={{
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              navigation.push(Screens.RIDE);
            },
          }} name={Screens.CREATE_RIDE_TAB} options={CreateRideTabOptions()} component={CreateRideDummyScreen} />
          <Tab.Screen name={Screens.PROFILE_TAB} options={ProfileTabOptions(numOfProfileValuesNeedingFixes)} component={ProfileNavigation} />
          <Tab.Screen name={Screens.SETTINGS_TAB} options={ConfigurationTabOptions} component={ConfigurationNavigation} />
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default TabsNavigation;


function useRedirectInitialRoute() {
  const navigation = useNavigation<any>();
  const passenger = useSelector((state: AppState) => state.user.owesReview);
  const { value: showWelcomeScreen } = useStorage(Storage.SHOULD_WELCOME, false);

  // Check if user need to make a review
  useEffect(() => {
    if (passenger !== undefined) {
      const to = setTimeout(() => {
        navigation.push(Screens.REVIEW, { passenger: passenger })
      }, 3000)

      return () => {
        clearTimeout(to)
      }
    }

  }, [passenger, navigation]);

  useEffect(() => {
    if (showWelcomeScreen) {
      navigation.replace(Screens.WELCOME)
    }
  }, [showWelcomeScreen, navigation]);
}
