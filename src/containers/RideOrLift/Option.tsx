import React from 'react';
import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DeviceDimensions } from 'utils/device';
import { Body } from 'components/Typography/Typography';
import { Animated } from 'react-native';
import { colors } from 'utils/colors';

export const optionSize = DeviceDimensions.width / 3;

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

interface FloatingButtonProps {
  icon: string;
  onPress?: () => void;
  style?: any;
  label: string;
  iconStyle?: any;
}

const Option: React.FC<FloatingButtonProps> = ({
  style,
  icon,
  onPress,
  label,
  iconStyle
}) => {
  return (

    <OptionContainer
      style={style}
    >
      <OptionTouchable
        onPress={onPress}
        activeOpacity={0.6}
      >
        <AnimatedIcon size={60} name={icon} color={colors.main} style={iconStyle} />
      </OptionTouchable>
      <StyledBody>{label}</StyledBody>
    </OptionContainer>

  )
}

export default Option;

const OptionTouchable = styled.TouchableOpacity`
  width: ${optionSize}px;
  height: ${optionSize}px;
  backgroundColor: white;
  padding: 5px;
  border-radius: ${optionSize / 2}px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  elevation: 5;
`

const OptionContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledBody = styled(Body)`
  margin-top: 8px;
`