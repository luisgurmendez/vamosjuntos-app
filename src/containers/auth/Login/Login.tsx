import React from 'react';
import { Title } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import LoginForm from './LoginForm';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationAPI } from 'types/StackNavigationAPI';
import { Screens } from 'containers/Screens';
import Button from 'components/Button/Button';
import Toaster from 'components/Toaster/Toaster';

const Login: React.FC = () => {
  const navigation: StackNavigationAPI = useNavigation<any>();

  const handleGoTOHome = () => {
    navigation.navigate(Screens.APP);
  };

  return (
    <Container>
      <Title>Login</Title>
      <LoginForm />
      <Button onPress={handleGoTOHome}>Go to Home</Button>
    </Container>
  );
};

export default Login;

const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
`;
