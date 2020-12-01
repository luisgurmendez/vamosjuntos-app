import { useNavigation } from '@react-navigation/native';
import BackArrow from 'components/Back/BackArrow';
import Button from 'components/Button/Button';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import { Title } from 'components/Typography/Typography';
import { Screens } from 'containers/Screens';
import React from 'react';
import { ButtonProps, View } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationAPI } from 'types/Navigation';
import { colors } from 'utils/colors';

interface ActionProps {
  onPress?: () => void;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}

interface WizardProps {
  title?: string;
  icon?: 'arrow' | 'close'
  showBack?: boolean;
  showClose?: boolean;
  action?: ActionProps;
  nextScreen?: string;
}

const Wizard: React.FC<WizardProps> = ({
  title,
  nextScreen,
  showBack = true,
  showClose = true,
  action,
  children
}) => {
  const navigation: StackNavigationAPI = useNavigation<any>();

  const defaultActionProps = {
    onPress: undefined,
    label: 'Siguiente',
    disabled: false,
    loading: false,
  };
  const _action = { ...defaultActionProps, ...action }

  const handleNext = () => {
    if (_action.onPress === undefined) {
      if (nextScreen) {
        navigation.push(nextScreen);
      }
    } else {
      _action.onPress();
    }
  };

  const handleClose = () => {
    navigation.dangerouslyGetParent().goBack();
  }

  return (
    <Container>
      <PaddingContainer>
        <Header>
          {/* <NavigationOptions> */}
          {showBack ? <BackArrow /> : <Placeholder />}
          {/* </NavigationOptions> */}
          <ExpandedTitle>{title}</ExpandedTitle>
          {showClose ? <PressableIcon name="x" size={40} color={colors.black} onPress={handleClose} /> : <Placeholder />}
          <View />
        </Header>
        <Content>{children}</Content>
        <Footer>
          <Button loading={_action.loading} disabled={_action.disabled} onPress={handleNext}>
            {_action.label}
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

const Placeholder = styled.View`
  padding: 20px;
`;

const NavigationOptions = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const ExpandedTitle = styled(Title)`
  flex-grow: 1;
  text-align: center;
`