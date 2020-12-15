import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

export const NotificationsTabOptions = (numberOfNotification: number): BottomTabNavigationOptions => ({
  tabBarLabel: 'Alertas',
  tabBarIcon: ({ focused, size, color }) => <Icon name="bell" style={focused ? { transform: [{ rotate: '-10deg' }] } : {}} size={size} color={color} />,
  tabBarBadge: numberOfNotification !== 0 ? numberOfNotification : undefined
});
