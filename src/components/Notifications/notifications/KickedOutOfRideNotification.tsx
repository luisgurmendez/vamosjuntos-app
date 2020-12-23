import React from 'react'
import { BaseNotification, NotificationProps } from './commons';

interface KickOutOfRideNotificationProps extends NotificationProps { }

const KickOutOfRideNotification: React.FC<KickOutOfRideNotificationProps> = ({ style, notification }) => {

  return (
    <BaseNotification style={style} notification={notification} label={'te saco de un viaje'} />
  )

}

export default KickOutOfRideNotification;
