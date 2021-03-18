import React from 'react'
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import PlainButton, { PlainButtonProps } from './PlainButton';

interface LinkButtonProps extends PlainButtonProps {
  url: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, url, ...rest }) => {

  const handlePress = () => {
    Linking.canOpenURL(url).then((canOpen) => {
      if (canOpen) {
        Linking.openURL(url);
      }
    })
  }

  return (
    <PlainButton {...rest} onPress={handlePress}>
      {children}
    </PlainButton>
  )

}

export default LinkButton;

const Container = styled.View`

`