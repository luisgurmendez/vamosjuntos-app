import React from 'react'
import styled from 'styled-components/native';
import { Subtitle } from 'components/Typography/Typography';

interface NoRidesProps {
}

const NoRides: React.FC<NoRidesProps> = ({ }) => {

  return (
    <Container>
      <Subtitle>No tenes viajes</Subtitle>
    </Container>
  )

}

export default NoRides;

const Container = styled.View`

`