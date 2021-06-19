import MarginedChildren from 'components/Box/MarginedChildren';
import { Text } from 'components/Typography/Typography';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';
import AppleLogin from './AppleLogin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings as FBSettings } from 'react-native-fbsdk-next';
import { usePlatform } from 'hooks/usePlatform';

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
FBSettings.initializeSDK();
GoogleSignin.configure({
  webClientId: '257892290311-9m7cu8asuhsqigqm5bbvvredcu5ivapt.apps.googleusercontent.com',
});

const SocialSignup: React.FC = () => {
  const { isIOS } = usePlatform();

  return (
    <Container>
      <Or />
      <MarginedChildren mV='sm'>
        {isIOS && <AppleLogin />}
        <GoogleLogin />
        <FacebookLogin />
      </MarginedChildren>
    </Container>
  )
}

export default SocialSignup;

const Container = styled.View`
  align-items: center;
`

const Or: React.FC = () => {

  return (
    <OrContainer>
      <Line />
      <Text style={{ fontSize: 16, color: colors.black, marginBottom: 8 }}>o</Text>
      <Line />
    </OrContainer>
  )
}

const OrContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Line = styled.View`
  margin-horizontal: 16px;
  flex: 1;
  height: 4px;
  borderTopWidth: 0.5px;
  borderColor: #AAA;
`;