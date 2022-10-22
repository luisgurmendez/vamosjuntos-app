import { useEffect, useRef, useState } from 'react';
import { setUser } from "state/user/actions";
import crashlytics from '@react-native-firebase/crashlytics';
import { useDispatch } from 'react-redux';
import Toaster from 'components/Toaster/Toaster';
import { logout } from 'api/auth';
import { logout as logoutAction } from "state/user/actions";
import useCallable from './useCallable';
import { User } from 'types/models';

function useFetchUser() {
  const [fetchingUser, setFetchingUser] = useState(true);
  const dispatch = useDispatch();
  const fetchCounts = useRef(0);
  const getUser = useCallable<User>('/users/me');

  useEffect(() => {
    /**
     * There is a race condition when users first signup where the auth.onCreate google cloud functions didn trigger yet
     * so there is no user in the vamosjuntos-db. The request will fail an thus we try to re fetch the user after some
     * delay.
     */
    const tryFetchUser = () => {
      fetchCounts.current += 1;

      if (fetchCounts.current < 20) {
        getUser().then(data => {
          dispatch(setUser(data.data));
          setFetchingUser(false);
        }).catch((e) => {
          console.error(e);
          crashlytics().log(`Waiting for user creation atempt: ${fetchCounts.current}`)
          //delay refetch of user
          setTimeout(tryFetchUser, 500);
        });
      } else {
        setFetchingUser(false);
        crashlytics().log(`Waiting for user creation atempt: ${fetchCounts.current}`)
        crashlytics().recordError(new Error('User fetch attempts exceded'));
        Toaster.alert({
          message: 'Hubo un error con tu usuario 😬',
          hideAfter: 7000
        });
        logout();
        dispatch(logoutAction());
      }
    };
    tryFetchUser();
  }, [getUser]);

  return fetchingUser;
}

export default useFetchUser;
