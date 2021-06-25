import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

export const RidesTabOptions = (numOfPendingRides: number): BottomTabNavigationOptions => ({
  tabBarLabel: 'Viajes',
  tabBarIcon: ({ focused, size, color }) => <Icon name="navigation" size={size} color={color} />,
  tabBarBadge: numOfPendingRides !== 0 ? numOfPendingRides : undefined
});
