import React from 'react';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { Body, Bold } from 'components/Typography/Typography';
import { Stylable, WithChildren } from 'components/types';
import { Notification, User } from 'types/models';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { Box } from 'components/Box/Box';
import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface BaseNotificationProps extends Stylable, WithChildren {
  notification: Notification;
  label: string;
  onNotificationPress?: () => void;
}

export type NotificationProps = Omit<BaseNotificationProps, 'label' | 'onNotificationPress'>;

export const BaseNotification: React.FC<BaseNotificationProps> = ({ notification, label, onNotificationPress, style, children }) => {

  const { user } = notification.context;

  const navigation = useNavigation<any>();

  const handlePressOnProfile = () => {
    navigation.push(Screens.USER_PROFILE, { user: user! })
  }

  const handleNotificationBodyPress = () => {
    if (!onNotificationPress) {
      const _ride = notification.context.ride ? notification.context.ride : notification.context.rideRequest ? notification.context.rideRequest.ride : undefined;
      if (_ride) {
        navigation.push(Screens.RIDE_DETAILS, { rideId: _ride.id })
      }
    } else {
      onNotificationPress();
    }
  }

  const notificationSince = moment().diff(moment(notification.createdAt), 'day');
  const notificationSinceLabel = notificationSince === 0 ? 'hoy' : notificationSince > 7 ? `${Math.floor(notificationSince / 7)} sem` : `${notificationSince} dias`

  return (
    <Container style={style}>
      <TouchableOpacity style={{ width: '100%' }} onPress={handleNotificationBodyPress}>
        <FullRow>
          <Box mr="lg">
            <TouchableOpacity onPress={handlePressOnProfile}>
              <ProfilePic img={user!.img} />
            </TouchableOpacity>
          </Box>
          <Body style={{ flex: 1 }}>
            <Bold>{user!.name}</Bold>
            {' '}{label}{' '}
            <Grayed>{notificationSinceLabel}</Grayed>
          </Body>
        </FullRow>
      </TouchableOpacity>
      <FullRow>
        {children}
      </FullRow>
    </Container>
  )
}

const Container = styled.View`
  padding: 8px;
  background-color: ${colors.white};
  border-radius: 8px;
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