import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { getNotifications, updateUserNotificationToken } from 'api/callables';
import { getFirebaseUser } from 'api/auth';
import { useDispatch } from 'react-redux';
import { setNotifications } from 'state/notification/actions';

type RemoteMessage = any;

function useNotificationsHandler() {
  useUpdateUsersNotificationToken();
  const dispatch = useDispatch();

  const handleGetNotifications = async (message: RemoteMessage) => {
    const _notifications = await getNotifications();
    dispatch(setNotifications(_notifications))
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(handleGetNotifications);
    return unsubscribe;
  }, []);
}

function useUpdateUsersNotificationToken() {

  useEffect(() => {
    const user = getFirebaseUser();
    if (user) {
      messaging().getToken().then(t => {
        updateUserNotificationToken(t, user.uid);
      })

      return messaging().onTokenRefresh(t => {
        updateUserNotificationToken(t, user.uid);
      })
    }
  }, [])
}

export default useNotificationsHandler;
