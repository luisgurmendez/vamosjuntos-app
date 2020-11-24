import React from 'react';
import Notifications, { NotificationsTabOptions } from './Notifications';
import Configuration, { ConfigurationTabOptions } from './Configuration';
import Travels, { TravelsTabOptions } from './Travels';
import Profile, { ProfileTabOptions } from './Profile';
import createBottomTabWithMenuNavigator from 'components/TabMenuNavigator/BottomTabWithMenuNavigator';
import { RenderItemMenu } from './Menu/Menu';

const Tab = createBottomTabWithMenuNavigator();

const TabsNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      menuOptions={{
        RenderMenuItem: RenderItemMenu,
        menu: ['lift', 'ride']
      }}
      tabBarOptions={{ showLabel: true }}>
      <Tab.Screen name="Travels" options={TravelsTabOptions} component={Travels} />
      <Tab.Screen name="Notification" options={NotificationsTabOptions} component={Notifications} />
      <Tab.Screen name="Profile" options={ProfileTabOptions} component={Profile} />
      <Tab.Screen name="Settings" options={ConfigurationTabOptions} component={Configuration} />
    </Tab.Navigator>
  );
};
export default TabsNavigation;
