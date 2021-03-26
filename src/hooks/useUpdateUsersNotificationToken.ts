import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { updateUserNotificationToken } from 'api/adedo';
import { getFirebaseUser } from 'api/auth';

function useUpdateUsersNotificationToken() {

  useEffect(() => {
    const user = getFirebaseUser();
    if (user) {
      messaging().getToken().then(t => {
        console.log(t);
        updateUserNotificationToken(t, user.uid);
      })

      return messaging().onTokenRefresh(t => {
        updateUserNotificationToken(t, user.uid);
      })
    }

  }, [])
}

export default useUpdateUsersNotificationToken;
