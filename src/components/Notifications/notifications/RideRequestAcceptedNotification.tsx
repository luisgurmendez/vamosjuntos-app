import React from 'react'
import styled from 'styled-components/native';
import { BaseNotification, NotificationProps } from './commons';

interface RideRequestAcceptedNotificationProps extends NotificationProps { }

const RideRequestAcceptedNotification: React.FC<RideRequestAcceptedNotificationProps> = ({ notification }) => {

  return (
    <BaseNotification notification={notification} label={'te accepto la solicitud para ingresar a un viaje'} />
  )

}

export default RideRequestAcceptedNotification;
