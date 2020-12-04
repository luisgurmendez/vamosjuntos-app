import { usePlatform } from 'hooks/usePlatform';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Keyboard, StyleSheet, TextInput } from 'react-native';
import DismissKeyboard from './DismissKeyboardView';

const { State: TextInputState } = TextInput;

const ANIMATION_SPEED = 300;

const KeyboardShift: React.FC = ({ children }) => {
  const shift = useRef(new Animated.Value(0)).current;
  const { isAndroid } = usePlatform();

  const handleKeyboardDidHide = () => {
    Animated.timing(shift, {
      toValue: 0,
      duration: ANIMATION_SPEED,
      useNativeDriver: true
    }).start();
  };

  const handleKeyboardDidShow = (event: any) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const focusedInputRef = TextInputState.currentlyFocusedInput();

    if (focusedInputRef) {
      focusedInputRef.measure((originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight) - 16;
        if (gap >= 0) {
          return;
        }
        Animated.timing(shift, {
          toValue: gap,
          duration: ANIMATION_SPEED,
          useNativeDriver: true
        }).start();
      });
    }
  };

  useEffect(() => {
    const showEvent = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow'
    const hideEvent = isAndroid ? 'keyboardDidHide' : 'keyboardWillHide'

    const keyboardDidShowSub = Keyboard.addListener(showEvent, handleKeyboardDidShow);
    const keyboardDidHideSub = Keyboard.addListener(hideEvent, handleKeyboardDidHide);

    return () => {
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  }, [handleKeyboardDidHide, handleKeyboardDidShow, isAndroid]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
      <DismissKeyboard>{children}</DismissKeyboard>
    </Animated.View>
  );
};

export default KeyboardShift;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    top: 0,
    bottom: 0,
    position: 'relative'
  }
});
