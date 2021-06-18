import { useEffect, useRef, useState } from 'react';
import { setUser } from "state/user/actions";
import { getUser } from "api/callables";
import crashlytics from '@react-native-firebase/crashlytics';
import { useDispatch } from 'react-redux';
import Toaster from 'components/Toaster/Toaster';
import { logout } from 'api/auth';
import { logout as logoutAction } from "state/user/actions";

function useFetchUser() {
  const [fetchingUser, setFetchingUser] = useState(true);
  const dispatch = useDispatch();
  const fetchCounts = useRef(0);

  useEffect(() => {
    const fetchUserInterval = setInterval(() => {
      console.log('FETCHING USER INTERVAL!!');
      fetchCounts.current += 1;
      if (fetchCounts.current < 20) {
        getUser().then(user => {
          dispatch(setUser(user));
          clearInterval(fetchUserInterval);
          setFetchingUser(false);
        }).catch(() => {
          crashlytics().log(`Waiting for user creation atempt: ${fetchCounts.current}`)
        });
      } else {
        clearInterval(fetchUserInterval);
        setFetchingUser(false);
        Toaster.alert({
          message: 'Hubo un error con tu usuario 😬',
          hideAfter: 7000
        });
        logout();
        dispatch(logoutAction());
      }

    }, 2000);

    return () => {
      clearInterval(fetchUserInterval);
    }
  }, []);

  return fetchingUser;
}

export default useFetchUser;
