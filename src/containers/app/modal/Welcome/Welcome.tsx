import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import PageSlider from 'components/PageSlider/PageSlider';
import { Screens } from 'containers/Screens';
import WelcomeSlide from './slides/WelcomeSlide';
import HowItWorksSlide from './slides/HowItWorksSlide';
import TermsAndConditionsSlide from './slides/TermsAndConditionsSlide';
import Storage from 'storage/Storage';


// TODO: Implement Welcome screens.
// Screens:
/**
 * 1. Welcome
 * 2. How it works?  copy from https://support.blablacar.com/hc/es/articles/360015367779--C%C3%B3mo-funciona-
 *    1. Driver creates a ride
 *    2. User searchs and ask to join ride
 *    3. Driver accepts user
 *    4. Payment
 *    5. Enjoy your ride!
 * 
 * 3. Accept terms and conditions   (if terms aren't accepted yet!) example: https://blog.blablacar.es/about-us/terms-and-conditions
 * 
 */

const Welcome: React.FC = () => {
  const navigation: any = useNavigation();

  const slides = [
    <WelcomeSlide />,
    <HowItWorksSlide />,
    <TermsAndConditionsSlide />
  ];

  const handleOnDone = async () => {
    await Storage.setItem(Storage.SHOULD_WELCOME, false);
    navigation.replace(Screens.TABS);
  }

  return (
    <Container>
      <PageSlider pages={slides} onDone={handleOnDone} />
    </Container>
  );
}

export default Welcome;

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: rgb(104,157,246);
`