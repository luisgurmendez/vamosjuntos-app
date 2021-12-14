import { useNavigation } from '@react-navigation/native';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import React from 'react';
import { StackNavigationAPI } from 'types/Navigation';

interface ArrowBackProps {
  onBack?: () => void;
  color?:string;
}

const BackArrow: React.FC<ArrowBackProps> = ({ onBack, color = "#4285F4" }) => {
  const navigation: StackNavigationAPI = useNavigation<any>();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.pop();
    }
  };

  return <PressableIcon size={40} color={color} name={'arrow-left'} onPress={handleBack} />;
};

export default BackArrow;
