import React from 'react';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { Body, Bold } from 'components/Typography/Typography';
import { Stylable } from 'components/types';
import { Notification, User } from 'types/models';
import Shadow from 'components/Shadow/Shadow';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { Box } from 'components/Box/Box';
import PressAnimation from 'components/Animations/PressAnimation';
import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';
import moment from 'moment';

export interface BaseNotificationProps extends Stylable {
  notification: Notification;
  label: string;
}

export type NotificationProps = Omit<BaseNotificationProps, 'label'>;

export const BaseNotification: React.FC<BaseNotificationProps> = ({ notification, label, style, children }) => {

  const { user } = notification.context;

  const navigation = useNavigation<any>();

  const handlePressOnProfile = () => {
    navigation.push(Screens.USER_PROFILE, { user: user! })
  }

  //TODO: not just weeks if diff is less thatn 7 days make it by days.
  const notificationSince = moment().diff(moment(notification.createdAt), 'week');

  return (
    <Container style={style}>
      <FullRow>
        <Box mr="lg">
          <PressAnimation onPress={handlePressOnProfile}>
            <ProfilePic img={user!.img} />
          </PressAnimation>
        </Box>
        <Body style={{ flex: 1 }}>
          <Bold>{user!.name}</Bold> {label} <Grayed>{notificationSince !== 0 && `${notificationSince} sem`}</Grayed>
        </Body>
      </FullRow>
      <FullRow>
        {children}
      </FullRow>
    </Container>
  )
}

const Container = styled(Shadow)`
  padding: 8px;
  background-color: ${colors.white};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FullRow = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Grayed = styled(Body)`
  color: ${colors.gray};
`