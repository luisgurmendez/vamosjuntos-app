import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { updateUserNotificationToken } from 'api/adedo';
import auth from '@react-native-firebase/auth';

function useUpdateUsersNotificationToken() {

  const userEmail = auth().currentUser?.email;

  useEffect(() => {
    if (userEmail) {

      messaging().getToken().then(t => {
        updateUserNotificationToken(t, userEmail!);
      })

      return messaging().onTokenRefresh(t => {
        updateUserNotificationToken(t, userEmail!);
      })
    }

  }, [userEmail])
}

export default useUpdateUsersNotificationToken;
