
import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface LoaderProps {
  size?: number;
  color?: string;
}

interface LoaderState {
  spinAnim: Animated.Value;
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Loading extends Component<LoaderProps, LoaderState> {
  constructor(props: any) {
    super(props);
    this.state = { spinAnim: new Animated.Value(0) }
  }

  componentDidMount() {
    Animated.loop(Animated.timing(
      this.state.spinAnim,
      {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true
      }
    )).start();
  }

  render() {
    const { size = 25, color = "white" } = this.props;

    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <AnimatedIcon name="loading" size={size} color={color} style={{ transform: [{ rotate: spin }] }} />
      </View>
    );
  }
}

export default Loading;