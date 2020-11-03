import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

interface WithChildren {
  children: React.ReactNode
}

const DismissKeyboard: React.FC<WithChildren> = ({ children }) => {
  return (
    <TouchableWithoutFeedback style={{ flex: 1, borderWidth: 1, borderColor: 'red' }} onPress={() => { Keyboard.dismiss() }}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;