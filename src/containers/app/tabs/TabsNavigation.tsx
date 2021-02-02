import React, { useEffect } from 'react';
import Notifications, { NotificationsTabOptions } from './Notifications';
import ConfigurationNavigation, { ConfigurationTabOptions } from './Configuration';
import RidesNavigation, { RidesTabOptions } from './Rides';
import ProfileNavigation, { ProfileTabOptions } from './Profile';
import createBottomTabWithMenuNavigator from 'components/TabMenuNavigator/BottomTabWithMenuNavigator';
import { RenderItemMenu } from './Menu/Menu';
import { useSelector } from 'react-redux';
import { getNumberOfUnseenNotifications } from 'state/notification/selectors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Screens } from 'containers/Screens';
import { AppState } from 'state/types';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabWithMenuNavigator();

const TabsNavigation: React.FC = () => {

  const numOfNotificaitons = useSelector(getNumberOfUnseenNotifications);

  const navigation = useNavigation<any>();
  const passenger = useSelector((state: AppState) => state.user.owesReview)

  useEffect(() => {
    if (passenger !== undefined) {
      const to = setTimeout(() => {
        navigation.push(Screens.REVIEW, { passenger: passenger })
      }, 3000)

      return () => {
        clearTimeout(to)
      }
    }

  }, [passenger, navigation])

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Tab.Navigator
          menuOptions={{
            RenderMenuItem: RenderItemMenu,
            menu: ['ride', 'lift']
          }}
          tabBarOptions={{ showLabel: true }}>
          <Tab.Screen name={Screens.RIDES_TAB} options={RidesTabOptions} component={RidesNavigation} />
          <Tab.Screen name={Screens.NOTIFICATIONS_TAB} options={NotificationsTabOptions(numOfNotificaitons)} component={Notifications} />
          <Tab.Screen name={Screens.PROFILE_TAB} options={ProfileTabOptions} component={ProfileNavigation} />
          <Tab.Screen name={Screens.SETTINGS_TAB} options={ConfigurationTabOptions} component={ConfigurationNavigation} />
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default TabsNavigation;
