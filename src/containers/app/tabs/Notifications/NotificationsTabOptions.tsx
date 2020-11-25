import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

export const NotificationsTabOptions: BottomTabNavigationOptions = {
  tabBarLabel: 'Alertas',
  tabBarIcon: ({ focused, size, color }) => <Icon name="bell" size={size} color={color} />,
  tabBarBadge: 2 // TODO como hacer esto??
};
