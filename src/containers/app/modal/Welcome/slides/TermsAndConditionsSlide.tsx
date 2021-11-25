import { LargeTitle, Title, Body } from 'components/Typography/Typography';
import React from 'react';
import styled from 'styled-components/native';

const TermsAndConditionsSlide: React.FC = () => {

  return (
    <Container>
      <LargeTitle style={{ color: 'white' }}>
        Términos y condiciones
      </LargeTitle>

      <Title style={{ marginTop: 24, color: 'white' }}>
        Condiciones generales de uso:
      </Title>
    </Container>
  )
}

export default TermsAndConditionsSlide;

const Container = styled.View`
  flex:1;
  margin-horizontal:8px;
`