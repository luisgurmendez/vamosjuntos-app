import { Box } from 'components/Box/Box';
import MarginedChildren from 'components/Box/MarginedChildren';
import NotificationSection from 'components/Notifications/NotificationSection';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from 'state/notification/actions';
import styled from 'styled-components/native';
import Page from 'components/Page/Page';
import Notification from 'components/Notifications/Notification';
import { getSeenNotifications, getUnseenNotifications } from 'state/notification/selectors';
import { Notification as NotificationModel, NotificationType, RideRequestStatus } from 'types/models';
import useStorage from 'hooks/useStorage';
import { NO_ALERTS_IMG } from 'assets/images';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';
import useCallable from 'hooks/useCallable';

const Notifications: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const getNotifications = useCallable<NotificationModel[]>('/notifications/get');
  const setSeenNotifications = useCallable<boolean>('/notifications/seen');

  const [showSeenNotifications] = useStorage<boolean>('showSeenNotifications');
  const unSeenNotifications = useSelector(getUnseenNotifications);
  let seenNotifications = useSelector(getSeenNotifications);

  if (!showSeenNotifications) {
    seenNotifications = [];
  }

  const hasNoNotifications = unSeenNotifications.length === 0 && seenNotifications.length === 0;

  useEffect(() => {
    if (unSeenNotifications.length > 0) {
      const notifications = unSeenNotifications.filter(n => {
        // Filter the notifications that are waiting for user action in any
        return !(n.type === NotificationType.RIDE_REQUEST &&
          n.context && n.context.rideRequest &&
          n.context.rideRequest.status === RideRequestStatus.PENDING)
      }).map(n => n.id);

      setSeenNotifications({ notifications });
    }
  }, [seenNotifications])

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const _notificiations = await getNotifications();
    dispatch(setNotifications(_notificiations.data))
    setRefreshing(false);
  }, []);

  return (
    <Page title="Notificaciones">
      <Container
        onRefresh={onRefresh}
        refreshing={refreshing}
        showContent={!hasNoNotifications}
        noContentAsset={NO_ALERTS_IMG}
      >
        {unSeenNotifications.length > 0 &&
          <NotificationSection section="Nuevas">
            <Box pH="md">
              <MarginedChildren mb="md" applyToLast={false}>
                {unSeenNotifications.map(n => <Notification key={n.id} notification={n} />)}
              </MarginedChildren>
            </Box>
          </NotificationSection>
        }
        {seenNotifications.length > 0 &&
          <NotificationSection section="Viejas">
            <Box pH="md">
              <MarginedChildren mb="md" applyToLast={false}>
                {seenNotifications.map(n => <Notification key={n.id} notification={n} />)}
              </MarginedChildren>
            </Box>
          </NotificationSection>
        }
      </Container>

    </Page>
  );
}

export default Notifications;

const Container = styled(ScrollableContent)`
  padding: 8px;
`