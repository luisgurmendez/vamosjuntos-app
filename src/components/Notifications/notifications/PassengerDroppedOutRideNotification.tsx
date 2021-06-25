import React from 'react'
import { BaseNotification, NotificationProps } from './commons';

interface PassengerDroppedOutRideNotificationProps extends NotificationProps { }

const PassengerDroppedOutRideNotification: React.FC<PassengerDroppedOutRideNotificationProps> = ({ style, notification }) => {

  return (
    <BaseNotification style={style} notification={notification} label={'se bajo de tu viaje'} />
  )

}

export default PassengerDroppedOutRideNotification;
