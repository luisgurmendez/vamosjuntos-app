import React, { useRef, useState } from 'react';
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';

interface CircleProps {
  w?: boolean;
}

const Circle: React.FC<CircleProps> = ({ w = true, children }) => {
  const [radius, setRadius] = useState(30);

  const handleLayout = (event: LayoutChangeEvent) => {
    if (w) {
      setRadius(event.nativeEvent.layout.width / 2);
    } else {
      setRadius(event.nativeEvent.layout.height / 2);
    }
  };

  const circleStyle: StyleProp<ViewStyle> = {
    borderRadius: radius
  };

  if (radius !== 0) {
    if (w) {
      circleStyle.height = radius * 2;
    } else {
      circleStyle.width = radius * 2;
    }
  }

  const childrenCount = React.Children.count(children);

  if (childrenCount > 1) {
    return children;
  }

  return React.Children.map<any, any>(children, (c) => {
    if (c && typeof c !== 'string') {
      const _styles = c.props.style ? c.props.style : {};
      return React.cloneElement(c, { onLayout: handleLayout, style: [_styles, circleStyle] });
    }
  });
};

export default Circle;
