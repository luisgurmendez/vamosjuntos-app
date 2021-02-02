import React from 'react'
import styled from 'styled-components/native';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { FAST_ANIMATION_DURATION } from 'utils/animation';
import { useAnimation } from 'react-native-animation-hooks';
import Circle from 'components/Circle/Circle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from 'components/Logo/Logo';
import PlusSvg from 'components/TabMenuNavigator/PlusIcon';
import { MenuButtonProps } from 'components/TabMenuNavigator/Menu';
import { colors } from 'utils/colors';

const MenuButton: React.FC<MenuButtonProps> = ({ active, onPress }) => {
  const paddings = useSafeAreaInsets();
  const safeAreaPositioningStyles = { bottom: paddings.bottom };

  const animation = useAnimation({
    type: 'timing',
    toValue: active ? 1 : 0,
    duration: FAST_ANIMATION_DURATION,
    useNativeDriver: true
  });

  const getButtonAnimation = () => {
    return { transform: [{ rotate: animation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] }) }] };
  }

  return (
    <Circle>
      <AnimatedPlusButton style={[getButtonAnimation(), safeAreaPositioningStyles]} activeOpacity={1} onPress={onPress}>
        <Logo size={60} />
      </AnimatedPlusButton>
    </Circle>
  );
};

export default MenuButton;

const ButtonTouchable = styled.TouchableOpacity`
  padding: 15px;
  width: 60px;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  align-self: center;
  bottom: 0px;
  border-radius: 30px;
  z-index: 200;
`;

const AnimatedPlusButton = Animated.createAnimatedComponent(ButtonTouchable);
