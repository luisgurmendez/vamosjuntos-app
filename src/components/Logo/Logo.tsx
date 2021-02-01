import React from 'react'
import styled from 'styled-components/native';
import { Image } from 'react-native';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 50 }) => {

  return (
    <Container size={size}>
      <Image
        style={{ flex: 1, width: '100%' }}
        resizeMode="cover"
        source={require('../../assets/Logo.png')}
      />
    </Container>
  )

}

export default Logo;

const Container = styled.View<{ size: number }>`
  width: ${props => props.size!}px;
  height: ${props => props.size!}px;
  border-radius: ${props => props.size! / 2}px;
  overflow: hidden;
  border-width: 2px;
  border-color: white;
`
