import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedRides, getPendingRides, getCanceledRides } from 'state/ride/selectors';
import styled from 'styled-components/native';
import Page from 'components/Page/Page';
import RidesList from './RidesList';
import NoRides from './NoRides';
import { getRides } from 'api/adedo';
import { setRides } from 'state/ride/actions';
import { RefreshControl } from 'react-native';
import Toaster from 'components/Toaster/Toaster';
import useStorage from 'hooks/useStorage';
import Storage from 'storage/Storage';

const Rides: React.FC = () => {

  const [refreshing, setRefreshing] = React.useState(false);
  const [showCanceledRides] = useStorage(Storage.SHOW_CANCELED_RIDES, true);
  const [showCompletedRides] = useStorage(Storage.SHOW_COMPLETED_RIDES, true);

  const dispatch = useDispatch();

  const pendingRides = useSelector(getPendingRides);
  const completedRides = useSelector(getCompletedRides);
  const canceledRides = useSelector(getCanceledRides);

  const _completedRides = showCompletedRides ? completedRides : [];
  const _canceledRides = showCanceledRides ? canceledRides : [];

  const hasRides = pendingRides.length > 0 || _completedRides.length > 0 || _canceledRides.length > 0;

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
            <RidesList title="Cancelados" rides={_canceledRides} />
            <RidesList title="Completados" rides={_completedRides} />
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