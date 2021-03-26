import { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser, logout as logoutAction, login as loginAction } from "state/user/actions";
import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { logout } from "api/auth";
import { getUser } from "api/adedo";

/**
 * Solves initial app load auth and hides splashscree,
 */
function useHandleUserAuthentication() {

  const [hasCheckAuth, setHasCheckAuth] = useState(false);
  const dispatch = useDispatch();

  const handleHasCheckAuth = () => {
    setTimeout(() => {
      SplashScreen.hide();
      setHasCheckAuth(true);
    }, 400)
  }

  async function onAuthStateChange(firebaseUser: FirebaseAuthTypes.User | null) {
    console.log('on auth state change', firebaseUser);
    if (firebaseUser != null) {
      // User has logged in
      console.log('login in');
      try {
        dispatch(setIsLoggedIn(true));
        crashlytics().log('User sign in');
        console.log('getting user');
        const user = await getUser()
        console.log(user);
        dispatch(setUser(user));
        crashlytics().setUserId(firebaseUser.uid);
      } catch (e) {
        crashlytics().recordError(e);
        console.error(e);
        await logout();
      }
    } else {
      // has logged out or never signed in
      if (hasCheckAuth) {
        console.log('loggedout');
        // has loggedout
        dispatch(logoutAction())
        dispatch(setIsLoggedIn(false));
      } else {
        // never signed in
        console.log('never signed in');
      }
    }

    handleHasCheckAuth()
  }

  useEffect(() => {
    // TODO: remove 
    // logout()
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;

  }, [setHasCheckAuth]);

  return hasCheckAuth;
}

export default useHandleUserAuthentication;
