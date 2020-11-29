import React from 'react';
import Notifications, { NotificationsTabOptions } from './Notifications';
import Configuration, { ConfigurationTabOptions } from './Configuration';
import RidesNavigation, { RidesTabOptions } from './Rides';
import Profile, { ProfileTabOptions } from './Profile';
import createBottomTabWithMenuNavigator from 'components/TabMenuNavigator/BottomTabWithMenuNavigator';
import { RenderItemMenu } from './Menu/Menu';
import { Screens } from 'containers/Screens';

const Tab = createBottomTabWithMenuNavigator();

const TabsNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      menuOptions={{
        RenderMenuItem: RenderItemMenu,
        menu: ['lift', 'ride']
      }}

      tabBarOptions={{ showLabel: true }}>
      <Tab.Screen name={Screens.RIDES_TAB} options={RidesTabOptions} component={RidesNavigation} />
      <Tab.Screen name={Screens.NOTIFICATIONS_TAB} options={NotificationsTabOptions} component={Notifications} />
      <Tab.Screen name={Screens.PROFILE_TAB} options={ProfileTabOptions} component={Profile} />
      <Tab.Screen name={Screens.SETTINGS_TAB} options={ConfigurationTabOptions} component={Configuration} />
    </Tab.Navigator>
  );
};
export default TabsNavigation;
