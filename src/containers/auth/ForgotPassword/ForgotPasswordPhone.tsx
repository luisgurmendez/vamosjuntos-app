import PageWithBack from 'components/Page/PageWithBack';
import TextInput from 'components/TextInput/TextInput';
import React from 'react'
import styled from 'styled-components/native';

interface ForgotPasswordPhoneProps {
}

const ForgotPasswordPhone: React.FC<ForgotPasswordPhoneProps> = ({ }) => {

  return (
    <PageWithBack>
      <TextInput placeholder="Celular" />
    </PageWithBack>
  )

}

export default ForgotPasswordPhone;

const Container = styled.View`

`