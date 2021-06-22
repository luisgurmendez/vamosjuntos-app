import { getRideRequests } from 'api/callables';
import PageWithBack from 'components/Page/PageWithBack';
import Toaster from 'components/Toaster/Toaster';
import React from 'react'
import { RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setRideRequests } from 'state/ride/actions';
import { getPendingRideRequests } from 'state/ride/selectors';
import styled from 'styled-components/native';
import RideRequestsList from './RideRequestsList';

interface RideRequestsProps {
}

const RideRequests: React.FC<RideRequestsProps> = ({ }) => {

  const [refreshing, setRefreshing] = React.useState(false);
  const rideRequests = useSelector(getPendingRideRequests);

  const dispatch = useDispatch();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const _rideRequests = await getRideRequests();
      dispatch(setRideRequests(_rideRequests))
    } catch (e) {
      Toaster.alert('Hubo un error')
    }
    setRefreshing(false);

  }, []);
  return (
    <PageWithBack title="Solicitudes de viajes">
      <Container
        scrollEventThrottle={400}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <RideRequestsList rideRequests={rideRequests} />
      </Container>
    </PageWithBack>
  )

}

export default RideRequests;


const Container = styled.ScrollView`
  flex: 1;
  padding: 8px;
`