import React, { useState } from 'react';
import { View } from 'react-native';
import { Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';

const ANIAMTION_DURATION = 200;

interface PressAnimationProps {
  disabled?: boolean;
}

const PressAnimation: React.FC<PressAnimationProps> = ({ disabled = false, children }) => {

  const [pressing, setPressing] = useState(false);

  const animation = useAnimation({
    type: 'timing',
    toValue: !disabled && pressing ? 1 : 0,
    duration: ANIAMTION_DURATION,
    useNativeDriver: false
  })

  const handlePressIn = () => { console.log('pressing!'); setPressing(true); }
  const handlePressOut = () => setPressing(false);

  const animatedStyles = {
    transform: [{
      scaleX: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.95]
      })
    },
    {
      scaleY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.95]
      })
    }]
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={handlePressIn} onPressOut={handlePressOut}>
      <TouchableWithoutFeedback>
        <Animated.View style={animatedStyles}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  )
}

export default PressAnimation;