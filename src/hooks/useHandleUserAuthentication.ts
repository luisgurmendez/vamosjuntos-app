import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, logout as logoutAction } from "state/user/actions";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { logout } from "api/auth";
import useHTTPClientSetup from "components/HTTPClientContext/useHTTPClientSetup";

/**
 * Solves initial app load auth and hides splashscree,
 */
function useHandleUserAuthentication() {

  const [hasCheckAuth, setHasCheckAuth] = useState(false);
  const dispatch = useDispatch();
  const { setJwt } = useHTTPClientSetup();

  async function onAuthStateChange(firebaseUser: FirebaseAuthTypes.User | null) {
    if (firebaseUser != null) {
      try {
        crashlytics().log('User sign in');
        crashlytics().setUserId(firebaseUser.uid);
        dispatch(setIsLoggedIn(true));
      } catch (e) {
        crashlytics().recordError(e);
        console.error(e);
        await logout();
      }
    } else {
      dispatch(logoutAction())
    }

    setTimeout(() => setHasCheckAuth(true), 400);
  }

  async function onIdTokenChanged(firebaseUser: FirebaseAuthTypes.User | null) {
    if (firebaseUser !== null) {
      const jwt = await firebaseUser.getIdToken();
      setJwt(jwt);
    } else {
      setJwt(null);
    }
  }

  useEffect(() => {
    const unsubscribeFromAuthStateChange = auth().onAuthStateChanged(onAuthStateChange);
    const unsubscribeFromIdTokenChange = auth().onIdTokenChanged(onIdTokenChanged);
    return () => {
      unsubscribeFromAuthStateChange();
      unsubscribeFromIdTokenChange();
    }

  }, [setHasCheckAuth, hasCheckAuth, dispatch, setJwt]);

  return hasCheckAuth;
}

export default useHandleUserAuthentication;
