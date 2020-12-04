import React from 'react';
import styled from 'styled-components/native';
import LoginForm from './LoginForm';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationAPI } from 'types/Navigation';
import { Screens } from 'containers/Screens';
import PlainButton from 'components/Button/PlainButton';
import { Box } from 'components/Box/Box';
import Logo from 'components/Logo/Logo';
import KeyboardShift from 'components/Keyboard/KeyboardShift';
import { login } from 'api/adedo';
import Storage from 'storage/Storage';
import Toaster from 'components/Toaster/Toaster';
import DismissKeyboard from 'components/Keyboard/DismissKeyboardView';

export interface LoginValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {

  const navigation: StackNavigationAPI = useNavigation<any>();

  const handleSuccessfullLogin = async (values: LoginValues) => {
    try {
      const tokens = await login(values.username, values.password);
      await Storage.setItem(Storage.TOKENS, tokens);
      navigation.navigate(Screens.APP);
    } catch (e) {
      Toaster.alert({ message: 'Contraseña o usuario incorrecta' });
    }
  };

  const handleRegister = () => {
    navigation.navigate(Screens.REGISTER);
  }

  const handleForgotPassword = () => {
    navigation.navigate(Screens.APP);
  }

  return (
    <DismissKeyboard>
      <Container>
        <Header>
          <PlainButton onPress={handleRegister}>
            Registrate
        </PlainButton>
        </Header>
        <Content>
          <KeyboardShift>
            <CenteredContentBox mb="lg">
              <Logo size={200} />
            </CenteredContentBox>
            <LoginForm onSuccessfullLogin={handleSuccessfullLogin} />
            <PlainButton onPress={handleForgotPassword}>
              Me olvide la contraseña 🤦🏼‍♂️
        </PlainButton>
          </KeyboardShift>
        </Content>
      </Container>
    </DismissKeyboard>
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