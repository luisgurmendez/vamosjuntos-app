import React from 'react'
import { BaseNotification, NotificationProps } from './commons';

interface RideCanceledNotificationProps extends NotificationProps { }

const RideCanceledNotification: React.FC<RideCanceledNotificationProps> = ({ style, notification }) => {

  return (
    <BaseNotification style={style} notification={notification} label={'cancelo el viaje'} />
  )

}

export default RideCanceledNotification;
