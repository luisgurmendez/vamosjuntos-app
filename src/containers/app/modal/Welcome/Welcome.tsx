import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import PageSliderPagination from 'components/PageSlider/PageSliderPagination';
import PageSlider from 'components/PageSlider/PageSlider';
import WelcomePage from './pages/WelcomePage';
import { Screens } from 'containers/Screens';

const Welcome: React.FC = () => {
  const navigation: any = useNavigation();

  const pages = [
    <WelcomePage />,
    <WelcomePage />,
    <WelcomePage />,
    <WelcomePage />,
    <WelcomePage />,
    <WelcomePage />,
  ];

  const handleOnDone = () => {
    navigation.replace(Screens.TABS);
  }

  return (
    <Container>
      <PageSlider pages={pages} onDone={handleOnDone} />
    </Container>
  );
}

export default Welcome;

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: rgb(104,157,246);
`