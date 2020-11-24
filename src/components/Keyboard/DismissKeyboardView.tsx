import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

interface WithChildren {
  children: React.ReactNode;
}

const DismissKeyboard: React.FC<WithChildren> = ({ children }) => {
  const handleDismiss = () => {
    console.log('dismiss keyboard');
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismiss}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
