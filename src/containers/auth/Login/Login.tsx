import React from 'react';
import styled from 'styled-components/native';
import LoginForm from './LoginForm';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationAPI } from 'types/Navigation';
import { Screens } from 'containers/Screens';
import PlainButton from 'components/Button/PlainButton';
import { Box } from 'components/Box/Box';
import KeyboardShift from 'components/Keyboard/KeyboardShift';
import { login } from 'api/auth';
import Toaster from 'components/Toaster/Toaster';
import DismissKeyboard from 'components/Keyboard/DismissKeyboardView';
import { Text, Title } from 'components/Typography/Typography';
import { LoginValues } from './types';
import { colors } from 'utils/colors';

const Login: React.FC = () => {

  const navigation: StackNavigationAPI = useNavigation<any>();

  const handleSuccessfullLogin = async (values: LoginValues) => {
    try {
      const userCreds = await login(values.username, values.password);
    } catch (e) {
      Toaster.alert({ message: 'Contraseña o usuario incorrecta' });
    }
  };

  const handleRegister = () => {
    navigation.navigate(Screens.REGISTER);
  }

  const handleForgotPassword = () => {
    navigation.navigate(Screens.FORGOT_PASSWORD);
  }

  return (
    <Container>
      <KeyboardShift>
        <Header>
          <PlainButton onPress={handleRegister}>
            Registrate
            </PlainButton>
        </Header>
        <Content>
          <DismissKeyboard>
            <CenteredContentBox mb="xlg">
              <SubtitleText>Inicia sesion, asi</SubtitleText>
              <BlueTitle>Vamos juntos</BlueTitle>
            </CenteredContentBox>
            <LoginForm onSuccessfullLogin={handleSuccessfullLogin} />
            <PlainButton onPress={handleForgotPassword}>
              Me olvide la contraseña 🤦🏼‍♂️
            </PlainButton>
          </DismissKeyboard>
        </Content>
      </KeyboardShift>
    </Container>
  );
};

export default Login;

const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-horizontal: 16px;
`

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`
const CenteredContentBox = styled(Box)`
  align-items: center;
`
const BlueTitle = styled(Title)`
  color: ${colors.main};
`

const SubtitleText = styled(Text)`
  font-size: 16px;
  width:100%;
  text-align: left;
`