import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notifications, { NotificationsTabOptions } from './Notifications';
import Configuration, { ConfigurationTabOptions } from './Configuration';
import Plus, { PlusOptions } from './Plus/Plus';
import Travels, { TravelsTabOptions } from './Travels';
import Profile, { ProfileTabOptions } from './Profile';
import PortalHost from 'components/Portal/PortalHost';

const Tab = createBottomTabNavigator();

const TabsNavigation: React.FC = () => {
  return (
    <PortalHost>
      <Tab.Navigator tabBarOptions={{ showLabel: true }}>
        <Tab.Screen name="Travels" options={TravelsTabOptions} component={Travels} />
        <Tab.Screen name="Notification" options={NotificationsTabOptions} component={Notifications} />
        <Tab.Screen name="Plus" options={PlusOptions} component={Plus} />
        <Tab.Screen name="Profile" options={ProfileTabOptions} component={Profile} />
        <Tab.Screen name="Settings" options={ConfigurationTabOptions} component={Configuration} />
      </Tab.Navigator>
    </PortalHost>

  );
}
export default TabsNavigation; 
