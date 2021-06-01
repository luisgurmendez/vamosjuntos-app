import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedRides, getPendingRides, getCanceledRides, getPendingRideRequests } from 'state/ride/selectors';
import styled from 'styled-components/native';
import Page from 'components/Page/Page';
import RidesList from './RidesList';
import NoRides from './NoRides';
import { getRideRequests, getRides } from 'api/callables';
import { setRideRequests, setRides } from 'state/ride/actions';
import { Alert, RefreshControl } from 'react-native';
import Toaster from 'components/Toaster/Toaster';
import useStorage from 'hooks/useStorage';
import Storage from 'storage/Storage';
import Badge from 'components/Badge/Badge';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from 'utils/colors';
import { useNavigation } from '@react-navigation/native';
import Screens from './Screens';
import moment from 'moment';
import RememberToCompleteRidesModal from './RememberToCompleteRidesModal';

const Rides: React.FC = () => {

  const [refreshing, setRefreshing] = React.useState(false);
  const [showCanceledRides] = useStorage(Storage.SHOW_CANCELED_RIDES, true);
  const [showCompletedRides] = useStorage(Storage.SHOW_COMPLETED_RIDES, true);

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const pendingRides = useSelector(getPendingRides);
  const completedRides = useSelector(getCompletedRides);
  const canceledRides = useSelector(getCanceledRides);
  const isThereAnypendingRidesWithDueDate = pendingRides.some(r => moment().isAfter(moment(r.date)))
  const [showRememberMarkRidesAsCompleteModal, setShowRememberModal] = React.useState(isThereAnypendingRidesWithDueDate)

  const rideRequests = useSelector(getPendingRideRequests);

  const _completedRides = showCompletedRides ? completedRides : [];
  const _canceledRides = showCanceledRides ? canceledRides : [];


  const hasRides = pendingRides.length > 0 || _completedRides.length > 0 || _canceledRides.length > 0;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const _rides = await getRides();
      const _rideRequests = await getRideRequests();
      dispatch(setRides(_rides))
      dispatch(setRideRequests(_rideRequests))
    } catch (e) {
      Toaster.alert('Hubo un error')
    }

    setRefreshing(false);
  }, []);

  const handleGoToRideRequests = () => {
    navigation.push(Screens.RIDE_REQUESTS)
  }


  const renderAction = () => {
    return (
      <Badge badge={rideRequests.length} max={10}>
        <Icon onPress={handleGoToRideRequests} name="car" size={30} style={{ color: colors.black, transform: [{ rotate: '0deg' }] }} />
      </Badge>
    )
  }

  return (
    <Page title="Mis Viajes" renderAction={renderAction}>
      <Container
        scrollEventThrottle={400}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {!hasRides && <NoRides />}
        {hasRides &&
          <>
            <RidesList title="Por salir" rides={pendingRides} />
            <RidesList title="Cancelados" rides={_canceledRides} />
            <RidesList title="Completados" rides={_completedRides} />
          </>
        }
      </Container>
      <RememberToCompleteRidesModal open={showRememberMarkRidesAsCompleteModal} onClose={() => setShowRememberModal(false)} />
    </Page>
  );
}


export default Rides;

const Container = styled.ScrollView`
  flex: 1;
  padding: 8px;
`