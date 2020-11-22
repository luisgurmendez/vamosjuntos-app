import { Stylable } from 'components/types';
import React, { Ref, useEffect, useRef, useState } from 'react';
import { View, ViewStyle, Animated } from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';
import { FAST_ANIMATION_DURATION } from 'utils/animation';

interface RadialButtonGroupProps extends Stylable<ViewStyle> {
  distance?: number;
  show?: boolean; // To make in & out animation
}

const RadialButtonGroup: React.FC<RadialButtonGroupProps> = ({ children, show = false, style, distance = 100 }) => {

  const numberOfButtons = React.Children.count(children);
  const shiftedDegs = 180 / (numberOfButtons + 1);
  const [showing, setShowing] = useState(false);

  //TODO: How to make this reutilizable useInOutAnimation / or a component?
  useEffect(() => {
    if (show) {
      setShowing(true)
    } else {
      const timeout = setTimeout(() => {
        setShowing(false);
      }, FAST_ANIMATION_DURATION)

      return () => {
        clearInterval(timeout);
      }
    }
  }, [show, setShowing]);

  if (!showing) {
    return null
  }

  const calcY = (i: number) => {
    return Math.sin(degToRad((i + 1) * shiftedDegs)) * distance;
  }

  const calcX = (i: number) => {
    return -1 * Math.cos(degToRad((i + 1) * shiftedDegs)) * distance;
  }

  return (
    <View style={[style]}>
      { React.Children.map<any, any>(children, (c, i) => {

        if (c !== undefined) {

          const bottom = calcY(i);
          const left = calcX(i);

          return (
            <AnimatedEntranceAndPositioner show={show} bottom={bottom} left={left} c={c} />
          )
        }

        return null;
      })}
    </View>
  )

}

export default RadialButtonGroup;

function degToRad(deg: number): number {
  return deg * Math.PI / 180
}

interface AEAPProps {
  bottom: number;
  left: number;
  c: any;
  show: boolean;
}

const AnimatedEntranceAndPositioner: React.FC<AEAPProps> = ({ show, bottom, left, c }) => {

  const animation = useAnimation({
    type: 'timing',
    initialValue: 0,
    toValue: show ? 1 : 0,
    duration: FAST_ANIMATION_DURATION,
    useNativeDriver: true,
  })

  const animatedStyles = {
    position: 'absolute' as 'absolute',
    bottom: bottom,
    left: left,
    transform: [
      { translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [-left, 0] }) },
      { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [bottom, 0] }) },
    ]
  }

  return (
    <Animated.View style={animatedStyles}>
      {c}
    </Animated.View>
  )
} 