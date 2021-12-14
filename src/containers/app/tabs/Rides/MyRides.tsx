import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedRides, getPendingRides, getCanceledRides, getPendingRideRequests } from 'state/ride/selectors';
import styled from 'styled-components/native';
import RidesList from './RidesList';
import { getRides } from 'api/callables';
import { setRides } from 'state/ride/actions';
import Toaster from 'components/Toaster/Toaster';
import useStorage from 'hooks/useStorage';
import Storage from 'storage/Storage';
import moment from 'moment';
import RememberToCompleteRidesModal from './RememberToCompleteRidesModal';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';

const noRidesImage = require('../../../../assets/CantSeeAnyRides.png');

const MyRides: React.FC = () => {

  const [refreshing, setRefreshing] = React.useState(false);
  const { value: showCanceledRides, refreshValue: refreshShowCanceledRides } = useStorage(Storage.SHOW_CANCELED_RIDES, false);
  const { value: showCompletedRides, refreshValue: refreshShowCompletedRides } = useStorage(Storage.SHOW_COMPLETED_RIDES, false);

  const dispatch = useDispatch();

  const pendingRides = useSelector(getPendingRides);
  const completedRides = useSelector(getCompletedRides);
  const canceledRides = useSelector(getCanceledRides);
  const isThereAnyPendingRidesWithDueDate = pendingRides.some(r => moment().isAfter(moment(r.date)))
  const [showRememberMarkRidesAsCompleteModal, setShowRememberModal] = React.useState(isThereAnyPendingRidesWithDueDate);


  const _completedRides = showCompletedRides ? completedRides : [];
  const _canceledRides = showCanceledRides ? canceledRides : [];

  const hasRides = pendingRides.length > 0 || _completedRides.length > 0 || _canceledRides.length > 0;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    refreshShowCompletedRides();
    refreshShowCanceledRides();
    try {
      const _rides = await getRides();
      dispatch(setRides(_rides))
    } catch (e) {
      Toaster.alert('Hubo un error')
    }

    setRefreshing(false);
  }, []);


  return (
    <>
      <Container
        showContent={hasRides}
        onRefresh={onRefresh}
        refreshing={refreshing}
        // noContentHelp={renderHelp()}
        noContentAsset={noRidesImage}
      >
        <RidesList title="Programados" rides={pendingRides} />
        <RidesList title="Cancelados" rides={_canceledRides} />
        <RidesList title="Completados" rides={_completedRides} />
      </Container>
      <RememberToCompleteRidesModal open={showRememberMarkRidesAsCompleteModal} onClose={() => setShowRememberModal(false)} />
    </>
  );
}

export default MyRides;

const Container = styled(ScrollableContent)`
  padding: 8px;
`
