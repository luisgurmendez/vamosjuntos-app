import React from 'react'
import { BaseNotification, NotificationProps } from './commons';

interface RideCanceledNotificationProps extends NotificationProps { }

const RideCanceledNotification: React.FC<RideCanceledNotificationProps> = ({ notification }) => {

  return (
    <BaseNotification notification={notification} label={'cancelo el viaje'} />
  )

}

export default RideCanceledNotification;
