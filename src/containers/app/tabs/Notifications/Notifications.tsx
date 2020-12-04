import { Box } from 'components/Box/Box';
import MarginedChildren from 'components/Box/MarginedChildren';
import NotificationSection from 'components/Notifications/NotificationSection';
import RideRequestNotification from 'components/Notifications/RideRequestNotification';
import SomeOtherNotification from 'components/Notifications/SomeOtherNotification';
import Toaster from 'components/Toaster/Toaster';
import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import Page from '../commons/Page';

const Notifications: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 6000);
  }, []);

  const handleScroll = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = ev.nativeEvent;
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
  };

  return (
    <Page title="Notificaciones">
      <Container scrollEventThrottle={400} onScroll={handleScroll} refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={false} />}>
        <NotificationSection section="Ejemplo Notis 1">
          <Box pH="md">
            <MarginedChildren mb="md" applyToLast={false}>
              <RideRequestNotification />
              <RideRequestNotification />
              <RideRequestNotification />
              <RideRequestNotification />
              <RideRequestNotification />
              <RideRequestNotification />
              <RideRequestNotification />
              <RideRequestNotification />
            </MarginedChildren>
          </Box>
        </NotificationSection>
        <NotificationSection section="Ejemplo Notis 2">
          <SomeOtherNotification />
          <SomeOtherNotification />
          <SomeOtherNotification />
          <SomeOtherNotification />
          <SomeOtherNotification />
          <SomeOtherNotification />
          <SomeOtherNotification />
          <SomeOtherNotification />
          <SomeOtherNotification />
        </NotificationSection>
      </Container>
    </Page>
  );
}

export default Notifications;

const Container = styled.ScrollView`
  flex:1;
  padding-vertical: 8px;
`