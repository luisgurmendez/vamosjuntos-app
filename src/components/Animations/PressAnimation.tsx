import { WithChildren } from 'components/types';
import React, { useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';

const ANIAMTION_DURATION = 200;

interface PressAnimationProps extends WithChildren {
  disabled?: boolean;
  onPress?: () => void;
}

const PressAnimation: React.FC<PressAnimationProps> = ({ onPress, disabled = false, children }) => {
  const [pressing, setPressing] = useState(false);

  const animation = useAnimation({
    type: 'timing',
    toValue: !disabled && pressing ? 1 : 0,
    duration: ANIAMTION_DURATION,
    useNativeDriver: false
  });

  const handlePressIn = () => {
    setPressing(true);
  };
  const handlePressOut = () => {
    setPressing(false);
    onPress && onPress();
  };

  const animatedStyles = {
    transform: [
      {
        scaleX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.9]
        })
      },
      {
        scaleY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.9]
        })
      }
    ]
  };

  return (
    <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={animatedStyles}>{children}</Animated.View>
    </TouchableOpacity>
  );
};

export default PressAnimation;
