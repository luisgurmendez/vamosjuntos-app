import { getNotifications, setSeenNotifications } from 'api/adedo';
import { Box } from 'components/Box/Box';
import MarginedChildren from 'components/Box/MarginedChildren';
import NotificationSection from 'components/Notifications/NotificationSection';
import RideRequestNotification from 'components/Notifications/notifications/RideRequestNotification';
import Toaster from 'components/Toaster/Toaster';
import React, { useEffect } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from 'state/notification/actions';
import { AppState } from 'state/types';
import styled from 'styled-components/native';
import Page from 'components/Page/Page';
import NoNotifications from './NoNotifications';
import Notification from 'components/Notifications/Notification';
import { getSeenNotifications, getUnseenNotifications } from 'state/notification/selectors';

const Notifications: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const unSeenNotifications = useSelector(getUnseenNotifications)
  const seenNotifications = useSelector(getSeenNotifications)

  const hasNoNotifications = unSeenNotifications.length === 0 && seenNotifications.length === 0;

  useEffect(() => {
    if (unSeenNotifications.length > 0) {
      setSeenNotifications(unSeenNotifications.map(n => n.id));
    }
  }, [seenNotifications])

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const _notificiations = await getNotifications();
    dispatch(setNotifications(_notificiations))
    setRefreshing(false);
  }, []);


  return (
    <Page title="Alertas">
      <Container
        scrollEventThrottle={400}
        // onScroll={handleScroll}
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

        {hasNoNotifications && <NoNotifications />}

      </Container>
    </Page>
  );
}

export default Notifications;

const Container = styled.ScrollView`
  flex:1;
  padding-vertical: 8px;
`