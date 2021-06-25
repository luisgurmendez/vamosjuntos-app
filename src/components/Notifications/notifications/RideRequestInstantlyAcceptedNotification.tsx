import React from 'react'
import styled from 'styled-components/native';
import { BaseNotification, NotificationProps } from './commons';

interface RideRequestInstantlyAcceptedNotificationProps extends NotificationProps { }

const RideRequestInstantlyAcceptedNotification: React.FC<RideRequestInstantlyAcceptedNotificationProps> = ({ style, notification }) => {

  return (
    <BaseNotification style={style} notification={notification} label={'se unio a tu viaje'} />
  )

}

export default RideRequestInstantlyAcceptedNotification;
