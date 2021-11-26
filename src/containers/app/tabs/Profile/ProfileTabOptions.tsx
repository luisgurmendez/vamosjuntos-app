import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

export const ProfileTabOptions = (numOfProfileValuesNeedingFixes: number): BottomTabNavigationOptions => ({
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused, size, color }) => <Icon name="user" size={size} color={color} />,
  tabBarBadge: numOfProfileValuesNeedingFixes !== 0 ? numOfProfileValuesNeedingFixes : undefined
});
