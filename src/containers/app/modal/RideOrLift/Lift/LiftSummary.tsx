import { Title } from 'components/Typography/Typography';
import React from 'react';
import styled from 'styled-components/native';

const LiftSummary: React.FC = () => {
  return (
    <Container>
      <Title>Gracias por compartir un viaje :D !</Title>
    </Container>
  )
};

export default LiftSummary;

const Container = styled.View``;
