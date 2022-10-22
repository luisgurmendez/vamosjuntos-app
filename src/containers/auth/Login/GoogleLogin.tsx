import React from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import SocialLoginButton from './SocialLoginButton';
import crashlytics from '@react-native-firebase/crashlytics';

GoogleSignin.configure({
  webClientId: '257892290311-9m7cu8asuhsqigqm5bbvvredcu5ivapt.apps.googleusercontent.com',
});

const GoogleLogin: React.FC<{ style?: any }> = ({ style }) => {
  const handleLogin = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.error(e);
      crashlytics().recordError(e);
    }
  }

  return (
    <SocialLoginButton style={style} onPress={handleLogin} provider="Google" />
  );
}

export default GoogleLogin;
