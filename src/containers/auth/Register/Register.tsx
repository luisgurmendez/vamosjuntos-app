import React from 'react';
import { Title } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import RegisterForm from './RegisterForm';

const Register: React.FC = () => {
  return (
    <Container>
      <Title>Registrate</Title>
      <ScrollContent>
        <RegisterForm />
      </ScrollContent>
    </Container>
  );
};

export default Register;

const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  flex: 1;
`;

const ScrollContent = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding-horizontal: 32px;
`