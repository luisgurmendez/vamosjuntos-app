import React, { useRef, useState } from 'react';
import { Animated, Image, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { DeviceDimensions } from 'utils/device';
// import img from 'assets/cabral7.jpeg';

interface ProfileProps {

}

const Profile: React.FC<ProfileProps> = () => {

  const [scrollY] = useState(new Animated.Value(0));

  const handleScroll =
    //  (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // scrollY.setValue(e.nativeEvent.contentOffset.y);
    // return
    Animated.event(
      [
        {
          nativeEvent: { contentOffset: { y: scrollY } }
        }
      ], {
      useNativeDriver: true
    })
  // }

  const coverContainerScaleAnimation = scrollY.interpolate({ inputRange: [-100, 0, 1000], outputRange: [2, 1, 1] });
  return (
    <Container scrollEventThrottle={32} onScroll={handleScroll}>
      <AnimatedCoverContainer style={[{ transform: [{ scale: coverContainerScaleAnimation }] }]}>
        <Image style={{ flex: 1, width: DeviceDimensions.width }} resizeMode="cover" source={require('../../assets/cabral7.jpeg')} />
      </AnimatedCoverContainer>
      <ProfileImageContainer>
        <AnimatedProfileImage style={[{ transform: [{ scale: 1 }, { translateY: -80 }] }]} />
      </ProfileImageContainer>
      <Content>
      </Content>
    </Container >
  )
}
export default Profile;


const Container = styled(Animated.ScrollView)`
flex: 1;
width: 100%;
height: 100%;
borderWidth: 1px;
borderColor: red;
`

const CoverContainer = styled.View`
  backgroundColor: ${colors.main};
  height: 200px;
`
const AnimatedCoverContainer = Animated.createAnimatedComponent(CoverContainer);

const ProfileImageContainer = styled.View`
  position: relative;
  margin-left: 24px;
  zIndex: 60;
`
const ProfileImage = styled.View`
  zIndex: 60;
  width: 160px;
  height: 160px;
  borderRadius: 80px;
  backgroundColor: lightgray;
  position: absolute;
  borderWidth: 3px;
  borderColor: white;
`
const AnimatedProfileImage = Animated.createAnimatedComponent(ProfileImage);

const Content = styled.View`
  flex-grow: 1;
  backgroundColor: lightblue;
  padding-top: 80px;
  minHeight: ${2 * DeviceDimensions.height}px;
`
