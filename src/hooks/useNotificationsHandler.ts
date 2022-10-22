import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { getFirebaseUser } from 'api/auth';
import { useDispatch } from 'react-redux';
import { setNotifications } from 'state/notification/actions';
import useCallable from './useCallable';
import { Notification } from 'types/models';

type RemoteMessage = any;

// TODO(lg): Make notification press open app in specific screen. Check the getInitialNotifications fn as well as the onNotificationOpenedApp fn both from the messaging model
//  NOTE: [issue](https://github.com/invertase/react-native-firebase/issues/3469#issuecomment-660121376)
function useNotificationsHandler() {
  useUpdateUsersNotificationToken();
  const dispatch = useDispatch();
  const getNotifications = useCallable<Notification[]>('/notifications/get');


  const handleGetNotifications = async (message: RemoteMessage) => {
    const _notifications = await getNotifications();
    dispatch(setNotifications(_notifications.data))
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(handleGetNotifications);
    return unsubscribe;
  }, []);
}

function useUpdateUsersNotificationToken() {
  const updateUserNotificationToken = useCallable('/users/update');
  useEffect(() => {
    const user = getFirebaseUser();
    if (user) {
      messaging().getToken().then(t => {
        updateUserNotificationToken({ id: user.uid, notificationToken: t });
      })

      return messaging().onTokenRefresh(t => {
        updateUserNotificationToken({ id: user.uid, notificationToken: t });
      })
    }
  }, [updateUserNotificationToken])
}

export default useNotificationsHandler;
