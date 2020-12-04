import RideMarker from 'components/Ride/RideMarker';
import React from 'react'
import styled from 'styled-components/native';
import Map from 'components/Map/Map';
import useMapZoomToCoords from 'hooks/useMapZoomToCoords';
import useCleanScreenBeforeNavigationRemoval from 'hooks/useCleanScreenBeforeNavigationRemoval';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import { alpha, colors } from 'utils/colors';
import { useNavigation } from '@react-navigation/native';
import ProfilePicPlaceholder from 'components/ProfilePic/ProfilePicPlaceholder';
import { LargeBody, Subtitle } from 'components/Typography/Typography';
import Shadow from 'components/Shadow/Shadow';
import Icon from 'react-native-vector-icons/Feather';
import { getDateText } from 'utils/date';
import moment from 'moment';
import { StatusBar } from 'react-native';
import RideSummary from 'components/Ride/RideSummary';

interface RideDetailsProps {
}

const RideDetails: React.FC<RideDetailsProps> = ({ }) => {

  const mapId = "ride Map id"

  const origin = { latitude: -34.933927, longitude: -54.942109 };
  const destination = { latitude: -34.533927, longitude: -54.342109 };

  const navigation = useNavigation();
  useMapZoomToCoords(mapId, [origin, destination], 30);

  useCleanScreenBeforeNavigationRemoval(navigation => {
    console.log('clean whatever..')
  })

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
        <RideSummary />
        <Subtitle>Conductor</Subtitle>
        <DriverContainer style={{ marginVertical: 8 }}>
          <ProfilePicPlaceholder size={50} />
        </DriverContainer>
        <Subtitle>Pasageros</Subtitle>
        <DriverContainer>
          <ProfilePicPlaceholder size={50} />
        </DriverContainer>
        <DriverContainer>
          <ProfilePicPlaceholder size={50} />
        </DriverContainer>
        <DriverContainer>
          <ProfilePicPlaceholder size={50} />
        </DriverContainer>
        <DriverContainer>
          <ProfilePicPlaceholder size={50} />
        </DriverContainer>
      </Content>
    </Container>
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

const DriverContainer = styled(Shadow)`
  width: 100%;
  padding: 8px;
  background-color: ${colors.white};
  border-radius: 8px;
  margin-top: 10px;
`

const OriginDestinationContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 8px;
`

const AddressDisplay = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
`