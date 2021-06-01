import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import { acceptRideRequest, declineRideRequest } from 'api/callables';
import PlainButton from 'components/Button/PlainButton';
import HideIfLoading from 'components/Loading/HideIfLoading';
import Toaster from 'components/Toaster/Toaster';
import { Body } from 'components/Typography/Typography';
import Screens from 'containers/app/modal/Screens';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNotification } from 'state/notification/actions';
import styled from 'styled-components/native';
import { RideRequestStatus } from 'types/models';
import { colors } from 'utils/colors';
import { getDateTimeText } from 'utils/date';
import { BaseNotification, NotificationProps } from './commons';

interface RideRequestNotification extends NotificationProps { }

const RideRequestNotification: React.FC<RideRequestNotification> = ({ style, notification }) => {

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const { rideRequest } = notification.context;
  const dispatch = useDispatch();

  let rideDate = '';
  if (rideRequest?.ride?.date) {
    rideDate = getDateTimeText(rideRequest?.ride?.date).toLowerCase();
  }

  const handleDeclineRideRequest = async () => {
    if (rideRequest) {
      setLoading(true);
      try {
        await declineRideRequest(rideRequest.id)
        const _noti = { ...notification };
        _noti.context.rideRequest.status = RideRequestStatus.DECLINED;
        dispatch(updateNotification(_noti));
      } catch (e) {
        crashlytics().recordError(e)
        Toaster.alert('Hubo un error');
      }
      setLoading(false);
    }
  }

  const handleAcceptRideRequest = async () => {
    if (rideRequest) {
      setLoading(true);
      try {
        await acceptRideRequest(rideRequest.id);
        const _noti = { ...notification, context: { ...notification.context, rideRequest: { ...notification.context.rideRequest } } };
        _noti.context.rideRequest.status = RideRequestStatus.ACCEPTED;
        dispatch(updateNotification(_noti));
      } catch (e) {
        console.error(e);
        crashlytics().recordError(e)
        Toaster.alert('Hubo un error');
      }
      setLoading(false);
    }
  }

  const handleNotificationPress = () => {
    navigation.push(Screens.RIDEREQUEST_DETAILS, { rideRequest: notification.context.rideRequest })
  }

  return (
    <BaseNotification notification={notification} style={style} onNotificationPress={handleNotificationPress} label={`quiere irse contigo en el viaje de ${rideDate}`}>
      <Container>
        {(notification.context.rideRequest && notification.context.rideRequest.status === RideRequestStatus.PENDING) &&
          <HideIfLoading size={32} loading={loading}>
            <BorderedStyledButton onPress={handleDeclineRideRequest} textStyle={{ color: colors.danger }}>Rechazar</BorderedStyledButton>
            <StyledButton onPress={handleAcceptRideRequest}>Aceptar</StyledButton>
          </HideIfLoading>
        }
        {(notification.context.rideRequest && notification.context.rideRequest.status === RideRequestStatus.DECLINED) &&
          <DeclinedText>Rechazado</DeclinedText>
        }
        {(notification.context.rideRequest && notification.context.rideRequest.status === RideRequestStatus.ACCEPTED) &&
          <AcceptedText>Acceptado</AcceptedText>
        }
      </Container>
    </BaseNotification>
  )
}

export default RideRequestNotification;

const Container = styled.View`
  border-top-width: 0.5px;
  border-color: ${colors.border};
  padding: 4px;
  flex: 1;
  margin-top: 8px;
  padding-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const StyledButton = styled(PlainButton)`
  flex: 1 1 auto;
  justify-content: center;
  flex-direction: row;
`

const BorderedStyledButton = styled(StyledButton)`
  border-right-width: 0.5px;
  border-color: ${colors.border};
`

const AcceptedText = styled(Body)`
  color: ${colors.success};
`

const DeclinedText = styled(Body)`
  color: ${colors.danger};
`