import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import PlainButton from 'components/Button/PlainButton';
import HideIfLoading from 'components/Loading/HideIfLoading';
import Toaster from 'components/Toaster/Toaster';
import { Body } from 'components/Typography/Typography';
import Screens from 'containers/app/modal/Screens';
import useCallable from 'hooks/useCallable';
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

  const acceptRideRequest = useCallable<boolean>('/ride-requests/accept');
  const declineRideRequest = useCallable<boolean>('/ride-requests/decline');

  let rideDate = '';
  if (rideRequest?.ride?.date) {
    rideDate = getDateTimeText(rideRequest?.ride?.date).toLowerCase();
  }

  const handleDeclineRideRequest = async () => {
    if (rideRequest) {
      setLoading(true);
      try {
        await declineRideRequest({ requestId: rideRequest.id })
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
        await acceptRideRequest({ requestId: rideRequest.id });
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

  const handleGoToRideRequestDetails = () => {
    navigation.push(Screens.WHERE_FROM_WHERE_TO_DETAILS, {
      title: notification.context.user!.name,
      whereFrom: notification.context.rideRequest.whereFrom,
      whereTo: notification.context.rideRequest.whereTo,
    })
  }

  const isPending = notification.context.rideRequest && notification.context.rideRequest.status === RideRequestStatus.PENDING;
  const isDeclined = notification.context.rideRequest && notification.context.rideRequest.status === RideRequestStatus.DECLINED;
  const isAccepted = notification.context.rideRequest && notification.context.rideRequest.status === RideRequestStatus.ACCEPTED;

  return (
    <BaseNotification notification={notification} style={style} label={`quiere irse contigo en el viaje de ${rideDate}`}>
      <Container>
        {isPending && <PlainButton onPress={handleGoToRideRequestDetails}>Ver trayecto</PlainButton>}
        <ActionContainer>
          {isPending &&
            <HideIfLoading size={32} loading={loading}>
              <BorderedStyledButton onPress={handleDeclineRideRequest} textStyle={{ color: colors.danger }}>Rechazar</BorderedStyledButton>
              <StyledButton onPress={handleAcceptRideRequest}>Aceptar</StyledButton>
            </HideIfLoading>
          }
          {isDeclined &&
            <DeclinedText>Rechazado</DeclinedText>
          }
          {isAccepted &&
            <AcceptedText>Acceptado</AcceptedText>
          }
        </ActionContainer>
      </Container>

    </BaseNotification>
  )
}

export default RideRequestNotification;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ActionContainer = styled.View`
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