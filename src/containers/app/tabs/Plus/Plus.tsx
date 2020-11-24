import { Title } from 'components/Typography/Typography';
import React, { useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import Backdrop from './Backdrop';
import { FAST_ANIMATION_DURATION } from 'utils/animation';
import { useAnimation } from 'react-native-animation-hooks';
import RadialButtonGroup from './RadialButtonGroup';
import OptionButton from './OptionButton';
import Portal from 'components/Portal/Portal';
import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';

export default function Plus() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Title>Plus!!</Title>
    </View>
  );
}

export const PlusOptions: BottomTabNavigationOptions = {
  tabBarLabel: '',
  tabBarIcon: ({ focused, size, color }) => null,
  tabBarBadge: undefined, // TODO como hacer esto??
  tabBarButton: () => <PlusBtn />
};

const PlusBtn: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const plusBtnRef = useRef(null);

  const navigation = useNavigation<any>();

  const animation = useAnimation({
    type: 'timing',
    toValue: showMenu ? 1 : 0,
    duration: FAST_ANIMATION_DURATION,
    useNativeDriver: true
  });

  const getPlusButtonAnimation = () => ({
    transform: [{ rotate: animation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] }) }]
  });

  const handleOpenModals = () => {
    setShowMenu(false);
    navigation.push(Screens.LIFT);
  };

  const handleOpenScore = () => {
    setShowMenu(false);
    navigation.push(Screens.SCORE);
  };

  return (
    <PlusButtonContainer>
      <Portal>
        <AnimatedPlusButton
          ref={plusBtnRef}
          style={getPlusButtonAnimation()}
          activeOpacity={1}
          onPress={() => setShowMenu((s) => !s)}>
          <Icon name="plus" size={30} color={colors.white} />
        </AnimatedPlusButton>
        <RadialButtonGroup
          show={showMenu}
          style={{ zIndex: 30, position: 'absolute', bottom: 0, alignSelf: 'center' }}
          distance={100}>
          <OptionButton
            onPress={handleOpenModals}
            iconStyle={{ transform: [{ rotate: '20deg' }] }}
            label=""
            icon="thumb-up"
          />
          <OptionButton onPress={handleOpenScore} label="" icon="car" />
        </RadialButtonGroup>
        <Backdrop show={showMenu} opacity={0.3} onClose={() => setShowMenu(false)} />
      </Portal>
    </PlusButtonContainer>
  );
};

const PlusButton = styled.TouchableOpacity`
  border-radius: 30px;
  width: 60px;
  height: 60px;
  background-color: ${colors.main};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  align-self: center;
  bottom: 30px;
  z-index: 2000;
`;

const PlusButtonContainer = styled.View`
  position: relative;
  flex: 1;
  justify-content: center;
  flex-direction: row;
`;

const Btn = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: red;
  z-index: 2000;
  transform: translate(-25px, -25px);
`;

const AnimatedPlusButton = Animated.createAnimatedComponent(PlusButton);
