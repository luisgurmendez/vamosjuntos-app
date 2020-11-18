import React from 'react';
import { Title } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import LoginForm from './LoginForm';

const Login: React.FC = () => {

  return (
    <Container>
      <Title>Login</Title>
      <LoginForm />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
`

export default Login;
