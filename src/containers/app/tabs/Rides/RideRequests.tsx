import { getRideRequests } from 'api/callables';
import Toaster from 'components/Toaster/Toaster';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setRideRequests } from 'state/ride/actions';
import { getPendingRideRequests } from 'state/ride/selectors';
import styled from 'styled-components/native';
import RideRequestsList from './RideRequestsList';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';

const noRideRequestsImage = require('../../../../assets/NoRideRequests.png');

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
    <Container
      showContent={rideRequests.length !== 0}
      onRefresh={onRefresh}
      refreshing={refreshing}
      // noContentHelp={renderHelp()}
      noContentAsset={noRideRequestsImage}
    >
      <RideRequestsList rideRequests={rideRequests} />
    </Container>
  )

}

export default RideRequests;


const Container = styled(ScrollableContent)`
  padding: 8px;
`