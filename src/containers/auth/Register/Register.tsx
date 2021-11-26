import React from 'react';
import styled from 'styled-components/native';
import RegisterForm from './RegisterForm';
import PageWithBack from 'components/Page/PageWithBack';

const Register: React.FC = () => {
  return (
    <PageWithBack title={'Regístrate'}>
      <ScrollContent>
        <RegisterForm />
      </ScrollContent>
    </PageWithBack>
  );
};

export default Register;

const ScrollContent = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding-horizontal: 32px;
`