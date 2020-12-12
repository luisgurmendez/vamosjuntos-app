import RideMarker from 'components/Ride/RideMarker';
import React from 'react'
import styled from 'styled-components/native';
import Map from 'components/Map/Map';
import useMapZoomToCoords from 'hooks/useMapZoomToCoords';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import { colors } from 'utils/colors';
import { useNavigation } from '@react-navigation/native';
import { Subtitle } from 'components/Typography/Typography';
import { StatusBar, View } from 'react-native';
import RideDetailsSummary from 'components/Ride/RideDetailsSummary';
import { Ride } from 'types/models';
import UserInRide from './UserInRide';

interface RideDetailsProps {
  route: { params: { ride: Ride } };
}

const RideDetails: React.FC<RideDetailsProps> = ({ route: { params: { ride } } }) => {

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

  return (
    <View style={{ flex: 1 }} pointerEvents="box-none">
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
          <UserInRide />
          <Subtitle>Pasageros</Subtitle>
          <UserInRide />
          <UserInRide />
          <UserInRide />
        </Content>
      </Container>
    </View>
  )
}

export default RideDetails;

const Container = styled.View`
  flex: 1;
  background-color: white;
  position:relative;
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
