import React, { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

const TranslatedMenuItem: React.FC = ({ children }) => {
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(30);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };

  return (
    <View onLayout={handleLayout} style={{ transform: [{ translateX: -width / 2 }, { translateY: -height / 2 }] }}>
      {children}
    </View>
  );
};

export default TranslatedMenuItem;
