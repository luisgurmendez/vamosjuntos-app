import { useNavigation } from '@react-navigation/native';
import BackArrow from 'components/Back/BackArrow';
import Button from 'components/Button/Button';
import { Title } from 'components/Typography/Typography';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationAPI } from 'types/StackNavigationAPI';

interface WizardProps {
  title?: string;
  showBack?: boolean;
  onNext?: () => void;
  nextText?: string;
  nextScreen?: string;
  nextDisabled?: boolean;
}

const Wizard: React.FC<WizardProps> = ({
  title,
  nextScreen,
  onNext,
  showBack = true,
  nextText = 'Siguiente',
  nextDisabled = false,
  children
}) => {
  const navigation: StackNavigationAPI = useNavigation<any>();

  const handleNext = () => {
    if (onNext === undefined) {
      if (nextScreen) {
        navigation.push(nextScreen);
      }
    } else {
      onNext();
    }
  };

  return (
    <Container>
      <PaddingContainer>
        <Header>
          {showBack && <BackArrow />}
          <Title>{title}</Title>
          <View />
        </Header>
        <Content>{children}</Content>
        <Footer>
          <Button disabled={nextDisabled} onPress={handleNext}>
            {nextText}
          </Button>
        </Footer>
      </PaddingContainer>
    </Container>
  );
};

export default Wizard;

const Header = styled.View`
  display: flex;
  padding: 8px 0px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  z-index: 100;
`;

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  width: 100%;
`;

const PaddingContainer = styled.View`
  padding: 0px 24px;
  flex: 1;
`;
