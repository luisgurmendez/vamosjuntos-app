import React from 'react';
import ProfilePicPlaceholder from 'components/ProfilePic/ProfilePicPlaceholder';
import { Body, Bold } from 'components/Typography/Typography';
import { Stylable } from 'components/types';
import { Notification } from 'types/models';
import Shadow from 'components/Shadow/Shadow';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

export interface BaseNotificationProps extends Stylable {
  notification: Notification
}


export const BaseNotification: React.FC<BaseNotificationProps> = ({ notification, style, children }) => {

  return (
    <Container style={style}>
      <ProfilePicPlaceholder />
      <Body style={{ flex: 1 }}><Bold>{notification.user.name}</Bold> quiere irse contigo en el viaje de mañana</Body>
    </Container>
  )
}

const Container = styled(Shadow)`
  padding: 8px;
  background-color: ${colors.white};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
`