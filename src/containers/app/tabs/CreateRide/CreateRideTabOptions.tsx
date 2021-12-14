import React from 'react';
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Feather';


export const CreateRideTabOptions = (): BottomTabNavigationOptions => ({
  tabBarLabel: 'Crea un viaje',
  tabBarIcon: ({ focused, size, color }) => <Icon name="plus" size={size} color={color} />,
  tabBarBadge: undefined,
});


