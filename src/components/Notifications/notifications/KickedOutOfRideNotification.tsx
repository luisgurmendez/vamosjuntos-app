import React from 'react'
import { BaseNotification, NotificationProps } from './commons';

interface KickOutOfRideNotificationProps extends NotificationProps { }

const KickOutOfRideNotification: React.FC<KickOutOfRideNotificationProps> = ({ notification }) => {

  return (
    <BaseNotification notification={notification} label={'te saco de un viaje'} />
  )

}

export default KickOutOfRideNotification;
