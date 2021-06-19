import React from 'react';

import auth from '@react-native-firebase/auth';
import SocialLoginButton from './SocialLoginButton';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const AppleLogin: React.FC<{ style?: any }> = ({ style }) => {
  const handleLogin = async () => {
    console.log('signing in');
    console.log(appleAuth.isSupported);
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log(appleAuthRequestResponse)

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }
    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    console.log(identityToken, nonce)

    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    console.log(appleCredential);

    // Sign the user in with the credential
    await auth().signInWithCredential(appleCredential);
  }

  return (
    <SocialLoginButton style={style} onPress={handleLogin} provider="Apple" />
  );
}

export default AppleLogin;
