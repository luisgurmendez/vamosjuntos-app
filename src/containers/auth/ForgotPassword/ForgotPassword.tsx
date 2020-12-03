import React from 'react'
import styled from 'styled-components/native';
import ForgotPasswordForm from './ForgotPasswordForm';

interface ForgotPasswordProps {
}

export interface ForgotPasswordValues {
  phone: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ }) => {

  const handleForgotPassword = (values: ForgotPasswordValues) => {
    console.log('que vejiga');
  }

  return (
    <Container>
      <ForgotPasswordForm onForgotPassword={handleForgotPassword} />
    </Container>
  )

}

export default ForgotPassword;

const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  flex: 1;
`;
