import { getNotifications } from 'api/adedo';
import { Box } from 'components/Box/Box';
import MarginedChildren from 'components/Box/MarginedChildren';
import NotificationSection from 'components/Notifications/NotificationSection';
import RideRequestNotification from 'components/Notifications/RideRequestNotification';
import Toaster from 'components/Toaster/Toaster';
import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from 'state/notification/actions';
import { AppState } from 'state/types';
import styled from 'styled-components/native';
import Page from 'components/Page/Page';
import NoNotifications from './NoNotifications';

const Notifications: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const notifications = useSelector((state: AppState) => state.notification.notifications)
  const hasNotifications = notifications.length > 0;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const _notificiations = await getNotifications();
    dispatch(setNotifications(_notificiations))
    setRefreshing(false);
  }, []);

  const handleScroll = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = ev.nativeEvent;
    if (hasNotifications) {

      const paddingToBottom = 40;
      if (layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
        &&
        contentOffset.y > -paddingToBottom
        && !refreshing
      ) {
        Toaster.info("Reached bottom :)")
        onRefresh();
      }
    }
  };

  return (
    <Page title="Notificaciones">
      <Container
        scrollEventThrottle={400}
        onScroll={handleScroll}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={false} />
        }
      >
        {hasNotifications ?
          <NotificationSection section="Ejemplo Notis 1">
            <Box pH="md">
              <MarginedChildren mb="md" applyToLast={false}>
                {notifications.map(n => <RideRequestNotification notification={n} />)}
              </MarginedChildren>
            </Box>
          </NotificationSection>
          :
          <NoNotifications />
        }
      </Container>
    </Page>
  );
}

export default Notifications;

const Container = styled.ScrollView`
  flex:1;
  padding-vertical: 8px;
`