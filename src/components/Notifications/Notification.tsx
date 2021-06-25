import React from 'react'
import { NotificationType } from 'types/models';
import { NotificationProps } from './notifications/commons';
import KickOutOfRideNotification from './notifications/KickedOutOfRideNotification';
import PassengerDroppedOutRideNotification from './notifications/PassengerDroppedOutRideNotification';
import RideCanceledNotification from './notifications/RideCanceledNotification';
import RideRequestAcceptedNotification from './notifications/RideRequestAcceptedNotification';
import RideRequestDeclinedNotification from './notifications/RideRequestDeclinedNotification';
import RideRequestInstantlyAcceptedNotification from './notifications/RideRequestInstantlyAcceptedNotification';
import RideRequestNotification from './notifications/RideRequestNotification';


const Notification: React.FC<NotificationProps> = ({ style, notification }) => {

  let NotificationComp: React.ComponentType<NotificationProps>;

  switch (notification.type) {
    case NotificationType.RIDE_REQUEST:
      NotificationComp = RideRequestNotification;
      break;

    case NotificationType.RIDE_REQUEST_ACCEPTED:
      NotificationComp = RideRequestAcceptedNotification;
      break;

    case NotificationType.RIDE_REQUEST_INSTANTLY_ACCEPTED:
      NotificationComp = RideRequestInstantlyAcceptedNotification;
      break;

    case NotificationType.RIDE_REQUEST_DECLINED:
      NotificationComp = RideRequestDeclinedNotification;
      break;

    case NotificationType.RIDE_CANCELED:
      NotificationComp = RideCanceledNotification;
      break;

    case NotificationType.RIDE_KICKED_OUT:
      NotificationComp = KickOutOfRideNotification;
      break;

    case NotificationType.RIDE_DROPED_OUT:
      NotificationComp = PassengerDroppedOutRideNotification;
      break;

    default:
      NotificationComp = DefaultDummyNotification;
  }

  return (
    <NotificationComp style={style} notification={notification} />
  )

}

export default Notification;


const DefaultDummyNotification: React.FC<NotificationProps> = () => {
  return null;
}