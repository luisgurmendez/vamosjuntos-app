import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

export const ConfigurationTabOptions: BottomTabNavigationOptions = {
  tabBarLabel: 'Configuracion',
  tabBarIcon: ({ focused, size, color }) => <Icon name="settings" size={size} color={color} />,
  tabBarBadge: undefined, // TODO como hacer esto??
}