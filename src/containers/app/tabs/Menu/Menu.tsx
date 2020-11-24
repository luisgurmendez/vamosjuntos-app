import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';
import React from 'react';
import { View } from 'react-native';
import OptionButton from './MenuItemButton';

interface RenderItemMenuProps {
  item: string;
  onCloseMenu: () => void;
}

export const RenderItemMenu: React.FC<RenderItemMenuProps> = ({ item, onCloseMenu }) => {
  const navigation: any = useNavigation();
  const handleOpenModals = () => {
    onCloseMenu();
    navigation.push(Screens.LIFT);
  };

  const handleOpenScore = () => {
    onCloseMenu();
    navigation.push(Screens.SCORE);
  };

  switch (item) {
    case 'ride':
      return (
        <OptionButton
          onPress={handleOpenModals}
          iconStyle={{ transform: [{ rotate: '20deg' }] }}
          label=""
          icon="thumb-up"
        />
      );
    case 'lift':
      return <OptionButton onPress={handleOpenScore} label="" icon="car" />;
  }

  return <View style={{ width: 50, height: 50, backgroundColor: 'red', borderRadius: 25 }} />;
};

export const menu = ['ride', 'lift'];
