import React from 'react';
import { Title } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import RegisterForm from './RegisterForm';

const Register: React.FC = () => {
  return (
    <Container>
      <Title>Login</Title>
      <RegisterForm />
    </Container>
  );
};

export default Register;

const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
`;
