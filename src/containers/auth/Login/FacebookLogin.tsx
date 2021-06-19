import React from 'react';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import SocialLoginButton from './SocialLoginButton';

const FacebookLogin: React.FC<{ style?: any }> = ({ style }) => {

  async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    await auth().signInWithCredential(facebookCredential);
  }

  return (
    <SocialLoginButton style={style} onPress={onFacebookButtonPress} provider="Facebook" />
  );
};

export default FacebookLogin;