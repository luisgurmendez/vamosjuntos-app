import { useNavigation } from '@react-navigation/native';
import BackArrow from 'components/Back/BackArrow';
import Button from 'components/Button/Button';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import { Title } from 'components/Typography/Typography';
import { Screens } from 'containers/Screens';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationAPI } from 'types/Navigation';
import { colors } from 'utils/colors';

interface WizardProps {
  title?: string;
  icon?: 'arrow' | 'close'
  showBack?: boolean;
  showClose?: boolean;
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
  showClose = true,
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

  const handleClose = () => {
    navigation.dangerouslyGetParent().goBack();
  }

  return (
    <Container>
      <PaddingContainer>
        <Header>
          <NavigationOptions>
            {showBack ? <BackArrow /> : <Placeholder />}
            {showClose ? <PressableIcon name="x" size={40} color={colors.black} onPress={handleClose} /> : <Placeholder />}
          </NavigationOptions>
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const Placeholder = styled.View`
  padding: 40px;
`;

const NavigationOptions = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`