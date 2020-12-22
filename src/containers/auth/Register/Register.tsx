import React from 'react';
import styled from 'styled-components/native';
import RegisterForm from './RegisterForm';
import PageWithBack from 'components/Page/PageWithBack';

const Register: React.FC = () => {
  return (
    <PageWithBack title={'Registrate'}>
      <ScrollContent>
        <RegisterForm />
      </ScrollContent>
    </PageWithBack>
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