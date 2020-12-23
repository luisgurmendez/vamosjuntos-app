import { useNavigation } from '@react-navigation/native';
import { Box } from 'components/Box/Box';
import Button from 'components/Button/Button';
import Header from 'components/Page/Header';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { StackNavigationAPI } from 'types/Navigation';
import { colors } from 'utils/colors';

export interface ActionProps {
  onPress?: () => void;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  hideAction?: boolean;
}

export interface WizardProps {
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
  const paddings = useSafeAreaInsets();

  const defaultActionProps = {
    onPress: undefined,
    label: 'Siguiente',
    disabled: false,
    loading: false,
    hideAction: false,
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
        <Header
          showBack={showBack}
          title={title}
          secondaryAction={
            showClose ?
              <PressableIcon name="x" size={40} color={colors.black} onPress={handleClose} />
              :
              undefined
          } />
        <Content>{children}</Content>
        {!_action.hideAction && <Footer mb={paddings.bottom === 0 ? 'lg' : undefined}>
          <Button loading={_action.loading} disabled={_action.disabled} onPress={handleNext}>
            {_action.label}
          </Button>
        </Footer>}
      </PaddingContainer>
    </Container>
  );
};

export default Wizard;

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
`;

const Footer = styled(Box)`
  width: 100%;
`;

const PaddingContainer = styled.View`
  padding: 0px 24px;
  flex: 1;
`;

