import { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser, logout as logoutAction } from "state/user/actions";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { logout } from "api/auth";
import { getUser } from "api/callables";

/**
 * Solves initial app load auth and hides splashscree,
 */
function useHandleUserAuthentication() {

  const [hasCheckAuth, setHasCheckAuth] = useState(false);
  const dispatch = useDispatch();

  const handleHasCheckAuth = () => {
    setTimeout(() => {
      console.log('handleHasCheckAuth')
      SplashScreen.hide();
      setHasCheckAuth(true);
    }, 400)
  }

  async function onAuthStateChange(firebaseUser: FirebaseAuthTypes.User | null) {
    console.log('onAuthStateChange');
    console.log(firebaseUser);
    if (firebaseUser != null) {
      // User has logged in
      try {
        console.log('dispatching login true');
        dispatch(setIsLoggedIn(true));
        crashlytics().log('User sign in');
        console.log('getting user');
        const user = await getUser()
        console.log('dispatching user');
        dispatch(setUser(user));
        crashlytics().setUserId(firebaseUser.uid);
      } catch (e) {
        crashlytics().recordError(e);
        console.error(e);
        console.log('Error in onAuuthStateChange, loggin out');
        await logout();
      }
    } else {
      // has logged out or never signed in
      if (hasCheckAuth) {
        // has loggedout
        console.log('has logged out');
        dispatch(logoutAction())
        dispatch(setIsLoggedIn(false));
      } else {
        // never signed in
        console.log('Was never signed in');
      }
    }

    handleHasCheckAuth()
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;

  }, [setHasCheckAuth, hasCheckAuth, dispatch]);

  return hasCheckAuth;
}

export default useHandleUserAuthentication;
