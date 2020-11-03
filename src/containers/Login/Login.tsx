import React from 'react';
import { Title } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import BackArrow from 'components/Back/BackArrow';

const Login: React.FC = () => {

  return (
    <Container>
      <Title>Login</Title>
      <BackArrow />
      <BackArrow />
      <BackArrow />
      <BackArrow />
      <BackArrow />
      <BackArrow />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
`

export default Login;
