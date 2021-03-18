import PageWithBack from 'components/Page/PageWithBack';
import React from 'react'
import styled from 'styled-components/native';
import ForgotPasswordForm from './ForgotPasswordForm';

interface ForgotPasswordProps { }

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ }) => {

  return (
    <PageWithBack title={'Recuperar contraseña'}>
      <Container>
        <ForgotPasswordForm />
      </Container>
    </PageWithBack>
  )

}

export default ForgotPassword;

const Container = styled.View`
  flex: 1;
  padding-horizontal: 32px;
`

