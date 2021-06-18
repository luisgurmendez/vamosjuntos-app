import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import Button from 'components/Button/Button';

const FacebookLogin: React.FC = () => {

  LoginManager.logOut();
  async function onFacebookButtonPress() {
    console.log('loggin w facebook')
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    console.log(result);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    console.log(data);
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    console.log(facebookCredential);
    const signin = await auth().signInWithCredential(facebookCredential);
    console.log(signin);
  }

  return (
    <Button onPress={onFacebookButtonPress}>Con fb</Button>
  );
};

export default FacebookLogin;