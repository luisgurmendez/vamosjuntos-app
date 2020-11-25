import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';
import { useSelector } from 'react-redux';
import { AppState } from 'state/types';
import { DeviceDimensions } from 'utils/device';

const ANIAMTION_DURATION = 400;

const AnimatedCamera: React.FC = ({ children }) => {

  const [showingCamera, setShowingCamera] = useState(false);
  const showCamera = useSelector((state: AppState) => state.camera.showCamera);

  useEffect(() => {
    if (showCamera) {
      setShowingCamera(true)
    } else {
      const timeout = setTimeout(() => {
        setShowingCamera(show => !show);
      }, ANIAMTION_DURATION)

      return () => {
        clearInterval(timeout);
      }
    }
  }, [showCamera, setShowingCamera]);

  const animation = useAnimation({
    type: 'timing',
    toValue: showCamera ? 1 : 0,
    duration: ANIAMTION_DURATION,
    useNativeDriver: false
  })

  const screenRatio = DeviceDimensions.width / DeviceDimensions.height;
  const widthAnimation = animation.interpolate({ inputRange: [0, screenRatio, 1], outputRange: [0, DeviceDimensions.width, DeviceDimensions.width] });

  const marginLeftAnimation = animation.interpolate({ inputRange: [0, screenRatio, 1], outputRange: [DeviceDimensions.width / 2, 0, 0] });
  const marginTopAnimation = animation.interpolate({ inputRange: [0, 1], outputRange: [DeviceDimensions.height / 2, 0] });
  const heightAnimation = animation.interpolate({ inputRange: [0, 1], outputRange: [0, DeviceDimensions.height] });

  if (!showingCamera) {
    return null;
  }

  return (
    <Animated.View style={{
      overflow: 'hidden',
      width: widthAnimation,
      height: heightAnimation,
      marginLeft: marginLeftAnimation,
      marginTop: marginTopAnimation,
      borderRadius: animation.interpolate({ inputRange: [screenRatio, 1], outputRange: [DeviceDimensions.width / 2, 0] }),
    }}
    >
      {children}
    </Animated.View >
  )
}

export default AnimatedCamera;
