import PageWithBack from 'components/Page/PageWithBack';
import React from 'react'
import styled from 'styled-components/native';
import CodeConfirmation from '../common/CodeConfirmation';
import { UserRegistrationValues } from './RegisterForm';

interface RegisterCodeConfirmationProps {
  route: { params: { values: UserRegistrationValues } }
}

const RegisterCodeConfirmation: React.FC<RegisterCodeConfirmationProps> = ({ route }) => {

  console.log(route)

  return (
    <PageWithBack>
      <CodeConfirmation phone={route.params.values.phone} onConfirmed={() => console.log('confirmed')} />
    </PageWithBack>
  )

}

export default RegisterCodeConfirmation;

const Container = styled.View`

`