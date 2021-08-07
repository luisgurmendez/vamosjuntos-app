import { LargeTitle, Title } from 'components/Typography/Typography';
import React from 'react';
import styled from 'styled-components/native';

const WelcomeSlide: React.FC = () => {

  return (
    <Container>
      <LargeTitle style={{ color: 'white' }}>
        Hola 👋👋
      </LargeTitle>
      <Title style={{ marginTop: 24, color: 'white' }}>
        ¿Estas listo para empezar a compartir viajes?
      </Title>
    </Container>

  )
}

export default WelcomeSlide;

const Container = styled.View`
  flex:1;
  margin-horizontal:8px;
`