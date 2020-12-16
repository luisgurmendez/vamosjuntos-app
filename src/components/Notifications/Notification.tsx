import React from 'react'
import styled from 'styled-components/native';
import { NotificationType } from 'types/models';
import { BaseNotificationProps } from './notifications/commons';
import RideRequestNotification from './notifications/RideRequestNotification';

interface NotificationProps extends BaseNotificationProps { }

const Notification: React.FC<NotificationProps> = ({ notification }) => {

  let NotificationComp: React.ComponentType<BaseNotificationProps>;

  switch (notification.type) {
    case NotificationType.RIDE_REQUEST:
      NotificationComp = RideRequestNotification;
      break;

    default:
      NotificationComp = RideRequestNotification;
  }


  return (
    <NotificationComp notification={notification} />
  )

}

export default Notification;

const Container = styled.View`

`