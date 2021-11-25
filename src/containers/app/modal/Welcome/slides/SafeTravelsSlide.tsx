import { LargeTitle } from 'components/Typography/Typography';
import React from 'react';
import styled from 'styled-components/native';

const SafeTravelsSlide: React.FC = () => {

  return (
    <Container>
      <LargeTitle style={{ color: 'white' }}>
        ¡Buen viaje!
      </LargeTitle>
    </Container>
  )
}

export default SafeTravelsSlide;

const Container = styled.View`
  flex:1;
  margin-horizontal: 8px;
`