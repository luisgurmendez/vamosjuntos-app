import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Body } from 'components/Typography/Typography';
import { Animated } from 'react-native';
import { colors } from 'utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

interface FloatingButtonProps {
  icon: string;
  onPress?: any // () => void;
  style?: any;
  label: string;
  iconStyle?: any;
  size?: number;
}

const OptionButton: React.FC<FloatingButtonProps> = ({ style, icon, onPress, label, iconStyle, size = 60 }) => {
  return (
    <OptionContainer style={style}>
      <OptionTouchable onPress={onPress} activeOpacity={0.6} size={size}>
        <AnimatedIcon size={size * 0.5} name={icon} color={colors.main} style={iconStyle} />
      </OptionTouchable>
      <TextPositioner size={size}>
        <StyledBody>{label}</StyledBody>
      </TextPositioner>
    </OptionContainer>
  );
};

export default OptionButton;

const OptionTouchable = styled(TouchableOpacity) <{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: white;
  border-radius: ${(props) => props.size / 2}px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const OptionContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledBody = styled(Body)`
  color: white;
`;

const TextPositioner = styled.View<{ size: number }>`
  bottom: -${(props) => props.size * 0.25 + 8}px;
  position: absolute;
`;
