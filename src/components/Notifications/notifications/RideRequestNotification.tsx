import { acceptRideRequest, declineRideRequest } from 'api/adedo';
import PlainButton from 'components/Button/PlainButton';
import HideIfLoading from 'components/Loading/HideIfLoading';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { getDateText } from 'utils/date';
import { BaseNotification, NotificationProps } from './commons';

interface RideRequestNotification extends NotificationProps { }

const RideRequestNotification: React.FC<RideRequestNotification> = ({ style, notification }) => {

  const { rideRequest } = notification.context;
  const [loading, setLoading] = useState(false);

  console.log(notification);
  let rideDate = '';
  if (rideRequest?.ride?.date) {
    rideDate = getDateText(rideRequest?.ride?.date);
  }

  const handleDeclineRideRequest = async () => {
    if (rideRequest) {
      setLoading(true);
      await declineRideRequest(rideRequest.id)
      setLoading(false);
    }
  }

  const handleAcceptRideRequest = async () => {
    if (rideRequest) {
      setLoading(true);
      await acceptRideRequest(rideRequest.id)
      setLoading(false);
    }
  }

  return (
    <BaseNotification notification={notification} style={style} label={`quiere irse contigo en el viaje de ${rideDate}`}>
      <Container>
        <HideIfLoading size={32} loading={loading}>
          <BorderedStyledButton onPress={handleDeclineRideRequest} textStyle={{ color: colors.danger }}>Rechazar</BorderedStyledButton>
          <StyledButton onPress={handleAcceptRideRequest}>Aceptar</StyledButton>
        </HideIfLoading>
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
  display: flex;
  flex-direction: row;
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
