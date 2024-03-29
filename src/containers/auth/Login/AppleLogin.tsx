import React from 'react';

import auth from '@react-native-firebase/auth';
import SocialLoginButton from './SocialLoginButton';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import analytics from 'utils/analytics';

const AppleLogin: React.FC<{ style?: any }> = ({ style }) => {
  const handleLogin = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }
    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    // Sign the user in with the credential
    await auth().signInWithCredential(appleCredential);

    analytics.logEvent('register_apple');
  }

  return (
    <SocialLoginButton style={style} onPress={handleLogin} provider="Apple" />
  );
}

export default AppleLogin;
