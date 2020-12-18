import React from 'react';
import Notifications, { NotificationsTabOptions } from './Notifications';
import ConfigurationNavigation, { ConfigurationTabOptions } from './Configuration';
import Rides, { RidesTabOptions } from './Rides';
import ProfileNavigation, { ProfileTabOptions } from './Profile';
import createBottomTabWithMenuNavigator from 'components/TabMenuNavigator/BottomTabWithMenuNavigator';
import { RenderItemMenu } from './Menu/Menu';
import { Screens } from 'containers/Screens';
import { useSelector } from 'react-redux';
import { getNumberOfUnseenNotifications } from 'state/notification/selectors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabWithMenuNavigator();

const TabsNavigation: React.FC = () => {

  const numOfNotificaitons = useSelector(getNumberOfUnseenNotifications)

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Tab.Navigator
          menuOptions={{
            RenderMenuItem: RenderItemMenu,
            menu: ['ride', 'lift']
          }}
          tabBarOptions={{ showLabel: true }}>
          <Tab.Screen name={Screens.RIDES_TAB} options={RidesTabOptions} component={Rides} />
          <Tab.Screen name={Screens.NOTIFICATIONS_TAB} options={NotificationsTabOptions(numOfNotificaitons)} component={Notifications} />
          <Tab.Screen name={Screens.PROFILE_TAB} options={ProfileTabOptions} component={ProfileNavigation} />
          <Tab.Screen name={Screens.SETTINGS_TAB} options={ConfigurationTabOptions} component={ConfigurationNavigation} />
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default TabsNavigation;
