import React from 'react'
import { BaseNotification, NotificationProps } from './commons';

interface PassengerDroppedOutRideNotificationProps extends NotificationProps { }

const PassengerDroppedOutRideNotification: React.FC<PassengerDroppedOutRideNotificationProps> = ({ notification }) => {

  return (
    <BaseNotification notification={notification} label={'se fue de un viaje'} />
  )

}

export default PassengerDroppedOutRideNotification;
