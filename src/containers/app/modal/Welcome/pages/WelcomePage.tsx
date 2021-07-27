import { LargeTitle } from 'components/Typography/Typography';
import React from 'react';
import styled from 'styled-components/native';



const WelcomePage: React.FC = () => {

  return (
    <LargeTitle style={{ color: 'white' }}>
      Hola!
    </LargeTitle>
  )
}

export default WelcomePage;

const Container = styled.View`
`