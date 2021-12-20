import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { IconProps } from 'react-native-vector-icons/Icon';
import { colors } from 'utils/colors';

interface PressableIconProps extends IconProps {
  onPress?: () => void;
  activeOpacity?: number;
  disabled?: boolean;
}

const PressableIcon: React.FC<PressableIconProps> = ({ disabled = false, activeOpacity = 0.3, onPress, style, ...iconProps }) => {

  const handlePress = () => {
    (!disabled && onPress) && onPress();
  }

  return (
    <TouchableOpacity activeOpacity={activeOpacity} style={style} onPress={handlePress}>
      <Icon color={disabled ? colors.gray : colors.black} {...iconProps} />
    </TouchableOpacity>
  );
};

export default PressableIcon;
