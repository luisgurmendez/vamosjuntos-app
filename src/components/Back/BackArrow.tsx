import { useNavigation } from '@react-navigation/native';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import React from 'react';
import { StackNavigationAPI } from 'types/StackNavigationAPI';

interface ArrowBackProps {
  onBack?: () => void;
}

const BackArrow: React.FC<ArrowBackProps> = ({ onBack }) => {

  const navigation: StackNavigationAPI = useNavigation<any>();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.pop();
    }
  }

  return (
    <PressableIcon size={40} color="#4285F4" name={"arrow-left"} onPress={handleBack} />
  )
}

export default BackArrow;