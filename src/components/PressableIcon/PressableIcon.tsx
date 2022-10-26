import React from 'react';
import { TextStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/Feather';
import { IconProps } from 'react-native-vector-icons/Icon';
import { colors } from 'utils/colors';
import { Icon, IconProviders } from 'utils/icons';

interface PressableIconProps extends IconProps {
  onPress?: () => void;
  activeOpacity?: number;
  disabled?: boolean;
  iconStyle?: TextStyle;
  iconProvider?: IconProviders;
}

const PressableIcon: React.FC<PressableIconProps> = ({
  disabled = false,
  activeOpacity = 0.3,
  iconProvider = IconProviders.Feather,
  onPress,
  style,
  iconStyle,
  ...iconProps
}) => {

  const handlePress = () => {
    (!disabled && onPress) && onPress();
  }

  return (
    <TouchableOpacity activeOpacity={activeOpacity} style={style} onPress={handlePress}>
      <Icon provider={iconProvider} color={disabled ? colors.gray : colors.black} style={iconStyle} {...iconProps} />
    </TouchableOpacity>
  );
};

export default PressableIcon;
