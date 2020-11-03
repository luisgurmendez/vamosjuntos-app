import { useNavigation } from '@react-navigation/native';
import { Title } from 'components/Typography/Typography';
import { Screens } from 'containers/Screens';
import React from 'react';
import styled from 'styled-components/native';
import { StackNavigationAPI } from 'types/StackNavigationAPI';
import Option, { optionSize } from './Option';

const RideOrLift: React.FC = () => {

  const navigation: StackNavigationAPI = useNavigation<any>();

  const handleRidePress = () => {
    navigation.push(Screens.LIFT)
  }

  const handleLiftPress = () => {
    navigation.push(Screens.LIFT)
  }

  return (
    <Container>
      <StyledTitle>Hoy vas a ...</StyledTitle>
      <OptionsContainer>
        <StyledOption
          onPress={handleRidePress}
          iconStyle={{ transform: [{ rotate: '380deg' }] }}
          label="hacer dedo"
          icon="thumb-up"
        />
        <Option onPress={handleLiftPress} label="levantar a alguien" icon="car" />
      </OptionsContainer>
    </Container>
  )
}

export default RideOrLift;

const StyledOption = styled(Option)`
  margin-right: ${optionSize / 3}px;
`

const OptionsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  transform: translateY(-${optionSize / 2}px);
`

const StyledTitle = styled(Title)`
  position: absolute;
  top: 64px;
`

const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

// const thumbsAnimation = useRef(new Animated.Value(0)).current;
// useEffect(() => {
//   Animated.loop(Animated.sequence(
//     [
//       Animated.timing(
//         thumbsAnimation,
//         {
//           toValue: 1,
//           duration: 300,
//           easing: Easing.linear,
//           useNativeDriver: false
//         }
//       ),
//       Animated.timing(
//         thumbsAnimation,
//         {
//           toValue: 0,
//           duration: 300,
//           easing: Easing.linear,
//           useNativeDriver: false
//         }
//       ),
//       Animated.timing(
//         thumbsAnimation,
//         {
//           toValue: 1,
//           duration: 300,
//           easing: Easing.linear,
//           useNativeDriver: false
//         }
//       ),
//       Animated.timing(
//         thumbsAnimation,
//         {
//           toValue: 0,
//           duration: 300,
//           easing: Easing.linear,
//           useNativeDriver: false
//         }
//       ),
//       Animated.delay(3000),
//     ])).start();
// }, [thumbsAnimation]);

// const spin = thumbsAnimation.interpolate({
//   inputRange: [0, 1,],
//   outputRange: ['380deg', '330deg']
// });