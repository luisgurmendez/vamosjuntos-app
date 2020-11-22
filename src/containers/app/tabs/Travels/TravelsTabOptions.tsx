import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

export const TravelsTabOptions: BottomTabNavigationOptions = {
  tabBarLabel: 'Viajes',
  tabBarIcon: ({ focused, size, color }) => <Icon name="navigation" size={size} color={color} />,
  tabBarBadge: undefined, // TODO como hacer esto??
}