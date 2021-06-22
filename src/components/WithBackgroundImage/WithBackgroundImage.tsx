import React from 'react'
import styled from 'styled-components/native';
import { Image } from 'react-native';

interface WithBackgroundImageProps {
  asset: any;
}

const WithBackgroundImage: React.FC<WithBackgroundImageProps> = ({ children, asset }) => {

  return (
    <>
      {asset !== undefined &&
        <Image
          style={{
            position: 'absolute',
            width: '100%',
          }}
          resizeMode="contain"
          source={asset}
        />
      }
      {children}
    </>

  )

}

export default WithBackgroundImage;

const Container = styled.View`
  max-width: 100%;
  height: 100%;
`