import React from 'react'
import styled from 'styled-components/native';
import { Image } from 'react-native';

interface NoRidesProps {
}

const NoRides: React.FC<NoRidesProps> = ({ }) => {

  return (
    <Image
      style={{ height: '100%', maxWidth: '100%' }}
      resizeMode="contain"
      source={require('../../../../assets/noRides.png')}
    />
  )

}

export default NoRides;

const Container = styled.View`

`