import { useNavigation } from '@react-navigation/native';
import Button from 'components/Button/Button';
import PageWithBack from 'components/Page/PageWithBack';
import Toaster from 'components/Toaster/Toaster';
import ToJoinRideDetails from 'components/ToJoinRideDetails/ToJoinRideDetails';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addRideRequest } from 'state/ride/actions';
import styled from 'styled-components/native';
import { Address, Ride, RideRequest } from 'types/models';
import crashlytics from '@react-native-firebase/crashlytics';
import useInterstatialAd from 'hooks/useInterstitialAd';
import { getAddressWithoutId } from 'components/Address/utils';
import useCallable from 'hooks/useCallable';

interface JoinRideProps {
  route: {
    params: {
      ride: Ride;
      onJoinedToRide?: () => void;
      whereFromWhereTo?: [Address, Address];
    }
  }
}

const JoinRide: React.FC<JoinRideProps> = ({ route: { params: { ride, whereFromWhereTo, onJoinedToRide } } }) => {

  const [isCreatingRideRequest, setIsCreatingRideRequest] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const handleShowAd = useInterstatialAd();
  const createRideRequest = useCallable<RideRequest>('/ride-requests/create')

  const whereFrom = getAddressWithoutId(whereFromWhereTo ? whereFromWhereTo[0] : ride.whereFrom);
  const whereTo = getAddressWithoutId(whereFromWhereTo ? whereFromWhereTo[1] : ride.whereTo);

  const handleCreateRideRequest = async () => {
    try {
      setIsCreatingRideRequest(true);
      const rideRequest = await createRideRequest({ rideId: ride.id, whereFrom, whereTo: whereTo! });
      rideRequest && dispatch(addRideRequest(rideRequest.data));
      navigation.goBack();
      onJoinedToRide && onJoinedToRide();
    } catch (e) {
      Toaster.alert('Hubo un error al intentar unirte al viaje')
      crashlytics().recordError(e);
    }
    setIsCreatingRideRequest(false);
    handleShowAd();
  }

  return (
    <PageWithBack>
      <Container>
        <ScrollingContent contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
          <ToJoinRideDetails ride={ride} />
        </ScrollingContent>
        <Button analyticsKey={'join_ride'} loading={isCreatingRideRequest} onPress={handleCreateRideRequest}>
          Unirme
          {/* <Icon name="check" color={colors.success} size={24} /> */}
        </Button>
      </Container>
    </PageWithBack>
  )
}

export default JoinRide;

const Container = styled.View`
  padding: 8px;
  flex: 1;
`

const ScrollingContent = styled.ScrollView``;