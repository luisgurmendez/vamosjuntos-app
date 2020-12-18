import React from 'react'
import { BaseNotification, NotificationProps } from './commons';

interface RideRequestDeclinedNotificationProps extends NotificationProps { }

const RideRequestDeclinedNotification: React.FC<RideRequestDeclinedNotificationProps> = ({ notification }) => {

  return (
    <BaseNotification notification={notification} label={'te rechazo la solicitud para ingresar a un viaje'} />
  )

}

export default RideRequestDeclinedNotification;
