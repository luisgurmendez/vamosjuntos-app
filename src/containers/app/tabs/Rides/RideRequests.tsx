import { NO_RIDE_REQUESTS_IMG } from 'assets/images';
import Toaster from 'components/Toaster/Toaster';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setRideRequests } from 'state/ride/actions';
import { getPendingRideRequests } from 'state/ride/selectors';
import styled from 'styled-components/native';
import RideRequestsList from './RideRequestsList';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';
import { Body } from 'components/Typography/Typography';
import useCallable from 'hooks/useCallable';
import { RideRequest } from 'types/models';

interface RideRequestsProps {
}

const RideRequests: React.FC<RideRequestsProps> = ({ }) => {

  const [refreshing, setRefreshing] = React.useState(false);
  const rideRequests = useSelector(getPendingRideRequests);
  const getRideRequests = useCallable<RideRequest[]>('/ride-requests/get-all')

  const dispatch = useDispatch();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const _rideRequests = await getRideRequests();
      dispatch(setRideRequests(_rideRequests.data))
    } catch (e) {
      Toaster.alert('Hubo un error')
    }
    setRefreshing(false);

  }, []);


  const renderNoContentHelp = () => {
    return (
      <Body>
        Cuando te unis a un viaje, tenes que esperar a ser aceptado por el conductor.
        {"\n"}
        Tus solicitudes de viajes se mostraran aca, en donde podras cancelarlas si todavia no te aceptaron.
      </Body>
    )
  }

  return (
    <Container
      showContent={rideRequests.length !== 0}
      onRefresh={onRefresh}
      refreshing={refreshing}
      noContentHelp={renderNoContentHelp()}
      noContentAsset={NO_RIDE_REQUESTS_IMG}
    >
      <RideRequestsList rideRequests={rideRequests} />
    </Container>
  )

}

export default RideRequests;


const Container = styled(ScrollableContent)`
  padding: 8px;
`