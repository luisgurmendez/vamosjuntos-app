import React from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import SocialLoginButton from './SocialLoginButton';

const GoogleLogin: React.FC<{ style?: any }> = ({ style }) => {
  const handleLogin = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
  }

  return (
    <SocialLoginButton style={style} onPress={handleLogin} provider="Google" />
  );
}

export default GoogleLogin;
