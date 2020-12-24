import React from 'react'
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import PlainButton, { PlainButtonProps } from './PlainButton';
import crashlytics from '@react-native-firebase/crashlytics';

interface LinkButtonProps extends PlainButtonProps {
  url: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, url, ...rest }) => {

  const handlePress = () => {
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    }).catch(e => {
      crashlytics().recordError(new Error(e));
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