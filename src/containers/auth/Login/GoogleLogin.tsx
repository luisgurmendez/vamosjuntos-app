import React from 'react';

import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const GoogleLogin: React.FC = () => {

  const handleLogin = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    console.log('Signed in with Google!')
  }

  return (
    <GoogleSigninButton size={GoogleSigninButton.Size.Wide} onPress={handleLogin} />
  );
}

export default GoogleLogin;
