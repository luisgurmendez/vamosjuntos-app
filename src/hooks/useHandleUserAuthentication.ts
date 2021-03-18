import { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser, logout as logoutAction, login as loginAction } from "state/user/actions";
import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { getUser, logout } from "api/auth";

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
    if (firebaseUser != null) {
      // User has logged in
      try {
        dispatch(setIsLoggedIn(true));
        const user = await getUser();
        dispatch(setUser(user));
        crashlytics().log('User sign in');
        crashlytics().setUserId(firebaseUser.uid);
      } catch (e) {
        logout();
      }
    } else {
      // has logged out or never signed in
      if (hasCheckAuth) {
        // has loggedout
        dispatch(logoutAction())
        dispatch(setIsLoggedIn(false));
      } else {
        // never signed in
      }
    }

    handleHasCheckAuth()
  }

  useEffect(() => {
    // TODO: remove 
    auth().signOut();
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;

  }, [setHasCheckAuth]);

  return hasCheckAuth;
}

export default useHandleUserAuthentication;
