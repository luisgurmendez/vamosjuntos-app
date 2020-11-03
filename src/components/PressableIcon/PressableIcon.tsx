import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { IconProps } from 'react-native-vector-icons/Icon';
import { colors } from 'utils/colors';

interface PressableIconProps extends IconProps {
  onPress?: () => void;
}

const PressableIcon: React.FC<PressableIconProps> = ({ onPress, style, ...iconProps }) => {

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon color={colors.black} {...iconProps} />
    </TouchableOpacity>
  )
}

export default PressableIcon;