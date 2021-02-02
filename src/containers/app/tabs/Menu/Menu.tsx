import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';
import React from 'react';
import { View } from 'react-native';
import MenuItemButton from './MenuItemButton';

interface RenderItemMenuProps {
  item: string;
  onCloseMenu: () => void;
}

export const RenderItemMenu: React.FC<RenderItemMenuProps> = ({ item, onCloseMenu }) => {
  const navigation: any = useNavigation();

  const handleOpenLift = () => {
    onCloseMenu();
    navigation.push(Screens.LIFT);
  };

  const handleOpenRide = () => {
    onCloseMenu();
    navigation.push(Screens.RIDE);
  };

  switch (item) {
    case 'lift':
      return (
        <MenuItemButton
          onPress={handleOpenLift}
          label="¿Me llevas?"
          iconStyle={{ transform: [{ rotate: '20deg' }] }}
          icon="thumb-up"
        />
      );
    case 'ride':
      return <MenuItemButton onPress={handleOpenRide} label="Te llevo" icon="car" />;
  }

  return <View style={{ width: 50, height: 50, backgroundColor: 'red', borderRadius: 25 }} />;
};

export const menu = ['ride', 'lift'];
