import { getNotifications, setSeenNotifications } from 'api/callables';
import { Box } from 'components/Box/Box';
import MarginedChildren from 'components/Box/MarginedChildren';
import NotificationSection from 'components/Notifications/NotificationSection';
import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from 'state/notification/actions';
import styled from 'styled-components/native';
import Page from 'components/Page/Page';
import NoNotifications from './NoNotifications';
import Notification from 'components/Notifications/Notification';
import { getSeenNotifications, getUnseenNotifications } from 'state/notification/selectors';
import { NotificationType, RideRequestStatus } from 'types/models';
import WithBackgroundImage from 'components/WithBackgroundImage/WithBackgroundImage';
import useStorage from 'hooks/useStorage';
import Storage from 'storage/Storage';

const noAlertsImage = require('../../../../assets/NoAlerts.png');

const Notifications: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();

  const {
    value: showSeenNotifications,
    refreshValue: refreshShowSeenNotifications
  } = useStorage(Storage.SHOW_SEEN_NOTIFICATIONS, true);

  const unSeenNotifications = useSelector(getUnseenNotifications);
  let seenNotifications = useSelector(getSeenNotifications);

  if (!showSeenNotifications) {
    seenNotifications = [];
  }

  const hasNoNotifications = unSeenNotifications.length === 0 && seenNotifications.length === 0;

  useEffect(() => {
    if (unSeenNotifications.length > 0) {
      setSeenNotifications(unSeenNotifications.filter(n => {
        // Filter the notifications that are waiting for user action in any
        return !(n.type === NotificationType.RIDE_REQUEST &&
          n.context && n.context.rideRequest &&
          n.context.rideRequest.status === RideRequestStatus.PENDING)
      }).map(n => n.id));
    }
  }, [seenNotifications])

  const onRefresh = React.useCallback(async () => {
    refreshShowSeenNotifications();
    setRefreshing(true);
    const _notificiations = await getNotifications();
    dispatch(setNotifications(_notificiations))
    setRefreshing(false);
  }, []);

  return (
    <Page title="Alertas">
      <WithBackgroundImage asset={hasNoNotifications ? noAlertsImage : undefined}>
        <Container
          scrollEventThrottle={400}
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
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
      </WithBackgroundImage>

    </Page>
  );
}

export default Notifications;

const Container = styled.ScrollView`
  flex:1;
  padding: 8px;
`