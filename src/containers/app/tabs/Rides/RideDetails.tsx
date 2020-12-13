import RideMarker from 'components/Ride/RideMarker';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native';
import Map from 'components/Map/Map';
import useMapZoomToCoords from 'hooks/useMapZoomToCoords';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import { colors } from 'utils/colors';
import { useNavigation } from '@react-navigation/native';
import { Subtitle } from 'components/Typography/Typography';
import { StatusBar } from 'react-native';
import RideDetailsSummary from 'components/Ride/RideDetailsSummary';
import { Ride, User } from 'types/models';
import UserInRide from './UserInRide';
import { getRideDetails } from 'api/adedo';
import HideIfLoading from 'components/Loading/HideIfLoading';
import PlainButton from 'components/Button/PlainButton';
import { AppState } from 'state/types';
import { useSelector } from 'react-redux';
import ConfirmCancelationModal from './ConfirmCancelationModal';

interface RideDetailsProps {
  ride: Ride;
}

const RideDetails: React.FC<RideDetailsProps> = ({ ride }) => {

  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] = useState(false);
  const user = useSelector((state: AppState) => state.user.user);

  const isDriver = user && user.id === ride.driver.id;

  const mapId = "ride Map id"

  const origin = { latitude: ride.whereFrom.latitude, longitude: ride.whereFrom.longitude }
  const destination = { latitude: ride.whereTo.latitude, longitude: ride.whereTo.longitude }

  const navigation = useNavigation();
  useMapZoomToCoords(mapId, [origin, destination], 30);

  const renderOriginDestinationMarkers = () => {
    return (
      <>
        <RideMarker color={'green'} coordinate={origin} />
        <RideMarker color={'red'} coordinate={destination} />
      </>
    )
  }

  const handleClose = () => {
    navigation.goBack();
  }

  const handleConfirmCancelRide = () => {
    console.log('cancel ride!');
  }

  const handleCancelRide = () => {
    setIsConfirmCancelModalOpen(true)
  }

  return (
    <Container>
      <StatusBar hidden />
      <AbsoluteSafeArea>
        <PositionedPressableIcon onPress={handleClose} name="x" size={30} color={colors.black} />
      </AbsoluteSafeArea>
      <MapContainer>
        <Map
          mapId={mapId}
          showsUserLocation={false}
          renderMarkers={renderOriginDestinationMarkers}
        />
      </MapContainer>
      <Content contentContainerStyle={{ padding: 8, paddingBottom: 32 }}>
        <RideDetailsSummary ride={ride} />
        <Subtitle>Conductor</Subtitle>
        <UserInRide user={ride.driver} />
        <Subtitle>Pasageros</Subtitle>
        {ride.passengers.map(p => <UserInRide key={`passenger-${p.user.id}`} user={p.user} />)}
      </Content>

      <CancelRideButton
        textStyle={{ color: colors.danger, fontSize: 20 }}
        onPress={handleCancelRide}
      >
        {isDriver ? 'Cancelar Viaje' : 'Bajarme del viaje'}
      </CancelRideButton>

      <ConfirmCancelationModal
        open={isConfirmCancelModalOpen}
        onClose={() => setIsConfirmCancelModalOpen(false)}
        onConfirm={handleConfirmCancelRide}
        title={isDriver ? 'Esta seguro que quiere cancel el viaje?' : 'Esta seguro que quiere darse de baja del viaje?'}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: white;
  position:relative;
  padding-bottom: 14px;
`

const MapContainer = styled.View`
  position: relative;
  width: 100%;
  height: 250px;
`

const AbsoluteSafeArea = styled.SafeAreaView`
  position: absolute;
  zIndex: 300;
`

const PositionedPressableIcon = styled(PressableIcon)`
  margin-left: 24px;
`

const Content = styled.ScrollView`
  padding: 24px;
  width: 100%;
  flex: 1;
`

const CancelRideButton = styled(PlainButton)``

interface RideDetailsWrapperProps {
  route: { params: { rideId: string } }
}

const RideDetailsWrapper: React.FC<RideDetailsWrapperProps> = ({ route: { params: { rideId } } }) => {
  const [rideWithDetails, setRideWithDetails] = useState<Ride | undefined>(undefined);
  const [isFetchingRide, setIsFetchingRide] = useState(false);

  useEffect(() => {
    const asyncEffect = async () => {
      setIsFetchingRide(true);
      const rideDetails = await getRideDetails(rideId);
      setRideWithDetails(rideDetails);
      setIsFetchingRide(false);
    }
    asyncEffect();
  }, [])

  return (
    <HideIfLoading loading={isFetchingRide}>
      {rideWithDetails && <RideDetails ride={rideWithDetails} />}
    </HideIfLoading>
  )
}

export default RideDetailsWrapper;