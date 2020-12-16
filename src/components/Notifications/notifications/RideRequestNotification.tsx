import React from 'react';
import { BaseNotification, BaseNotificationProps } from './commons';

interface RideRequestNotification extends BaseNotificationProps { }

const RideRequestNotification: React.FC<RideRequestNotification> = ({ style, notification }) => {

  return (
    <BaseNotification notification={notification} style={style} />
  )
}

export default RideRequestNotification;
