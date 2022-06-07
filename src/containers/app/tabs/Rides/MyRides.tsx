import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedRides, getPendingRides, getCanceledRides, getPendingRideRequests } from 'state/ride/selectors';
import styled from 'styled-components/native';
import RidesList from './RidesList';
import { getRides } from 'api/callables';
import { setRides } from 'state/ride/actions';
import Toaster from 'components/Toaster/Toaster';
import useStorage from 'hooks/useStorage';
import moment from 'moment';
import RememberToCompleteRidesModal from './RememberToCompleteRidesModal';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';
import { Body } from 'components/Typography/Typography';
import { NO_RIDES_IMG } from 'assets/images';

const MyRides: React.FC = () => {

  const [refreshing, setRefreshing] = React.useState(false);
  const [showCanceledRides] = useStorage<boolean>('showCanceledRides');
  const [showCompletedRides] = useStorage<boolean>('showCompletedRides');

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
    try {
      const _rides = await getRides();
      dispatch(setRides(_rides))
    } catch (e) {
      Toaster.alert('Hubo un error')
    }

    setRefreshing(false);
  }, []);

  const renderNoContentHelp = () => {
    return (
      <Body>
        Aca vas a poder ver todos los viajes en los que participas (ya seas conductor o pasajero). {"\n"}
        {"\n"}
        Los viajes ya completados y cancelados estan escondidos por defecto. Para cambiar esto podes ir a <Body bold>Configuración</Body> y habilitar las opciones.
      </Body>
    )
  }

  return (
    <>
      <Container
        showContent={hasRides}
        onRefresh={onRefresh}
        refreshing={refreshing}
        noContentHelp={renderNoContentHelp()}
        noContentAsset={NO_RIDES_IMG}
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
