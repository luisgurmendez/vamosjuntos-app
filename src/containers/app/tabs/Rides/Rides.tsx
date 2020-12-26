import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedRides, getPendingRides } from 'state/ride/selectors';
import styled from 'styled-components/native';
import Page from 'components/Page/Page';
import RidesList from './RidesList';
import NoRides from './NoRides';
import { getRides } from 'api/adedo';
import { setRides } from 'state/ride/actions';
import { RefreshControl } from 'react-native';
import Toaster from 'components/Toaster/Toaster';

const Rides: React.FC = () => {

  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();

  const pendingRides = useSelector(getPendingRides);
  const completedRides = useSelector(getCompletedRides);

  const hasRides = pendingRides.length > 0 || completedRides.length > 0;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const _rides = await getRides();
      dispatch(setRides(_rides))
    } catch (e) {
      Toaster.alert('Hubo un error')
    }

    setRefreshing(false);
  }, []);


  return (
    <Page title="Viajes">
      <Container
        scrollEventThrottle={400}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {!hasRides && <NoRides />}
        {hasRides &&
          <>
            <RidesList title="Pendientes" rides={pendingRides} />
            <RidesList title="Completados" rides={completedRides} />
          </>
        }
      </Container>
    </Page>
  );
}


export default Rides;

const Container = styled.ScrollView`
  flex: 1;
  padding: 8px;
`