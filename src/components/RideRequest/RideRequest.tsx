import React, { useState } from 'react'
import styled from 'styled-components/native';
import { RideRequest as RideRequestModel, RideRequestStatus } from 'types/models';
import { Text } from 'components/Typography/Typography';
import { colors } from 'utils/colors';
import RideDetailsSummary from 'components/Ride/RideDetailsSummary';
import { Stylable } from 'components/types';
import PlainButton from 'components/Button/PlainButton';
import { useDispatch } from 'react-redux';
import { cancelRideRequest } from 'api/callables';
import { removeRideRequest } from 'state/ride/actions';
import Toaster from 'components/Toaster/Toaster';
import crashlytics from '@react-native-firebase/crashlytics'

interface RideRequestProps extends Stylable {
  rideRequest: RideRequestModel;
}

const RideRequest: React.FC<RideRequestProps> = ({ style, rideRequest }) => {

  const [isCanceling, setIsCanceling] = useState(false);
  const dispatch = useDispatch();

  const statusLabel = rideRequest.status === RideRequestStatus.PENDING ? 'Esperando respuesta' : rideRequest.status === RideRequestStatus.ACCEPTED ? 'Aceptado' : 'Rechazado';

  const handleCancelRideRequest = () => {
    setIsCanceling(true)
    cancelRideRequest(rideRequest.id).then(() => {
      dispatch(removeRideRequest(rideRequest.id))
    }).catch((e) => {
      crashlytics().recordError(e)
      Toaster.alert('Hubo un error')
    }).finally(() => {
      setIsCanceling(false);
    });
  }

  return (
    <Container style={style}>
      <StatusText status={rideRequest.status}>
        <Text>{statusLabel}</Text>
      </StatusText>
      <RideDetailsSummary ride={rideRequest.ride} />
      {rideRequest.status === RideRequestStatus.PENDING &&
        <CancelContainer>
          <PlainButton
            loading={isCanceling}
            textStyle={{ color: colors.danger }}
            onPress={handleCancelRideRequest}
          >
            Cancelar
        </PlainButton>
        </CancelContainer>
      }
    </Container>
  )

}

export default RideRequest;

const Container = styled.View`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  background-color: ${colors.white};
  padding: 8px;
`

const StatusText = styled.Text<{ status: RideRequestStatus }>`
  margin-left: 16px;
  font-style: italic;
  color: ${({ status }) => status === RideRequestStatus.PENDING ? colors.gray : status === RideRequestStatus.ACCEPTED ? colors.success : colors.danger};

`

const CancelContainer = styled.View`
  border-top-width: 0.5px;
  border-color: ${colors.border};
`