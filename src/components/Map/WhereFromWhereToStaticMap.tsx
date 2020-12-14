import { Stylable } from 'components/types';
import useMapZoomToCoords from 'hooks/useMapZoomToCoords';
import React from 'react'
import styled from 'styled-components/native';
import { Address } from 'types/models';
import Map from 'components/Map/Map';
import RideMarker from 'components/Ride/RideMarker';

interface WhereFromWhereToStaticMapProps extends Stylable {
  mapId: string;
  whereFrom: Address;
  whereTo: Address;
}

const WhereFromWhereToStaticMap: React.FC<WhereFromWhereToStaticMapProps> = ({ mapId, whereFrom, whereTo, style }) => {

  const origin = { latitude: whereFrom.latitude, longitude: whereFrom.longitude }
  const destination = { latitude: whereTo.latitude, longitude: whereTo.longitude }

  useMapZoomToCoords(mapId, [origin, destination], 30);

  const renderOriginDestinationMarkers = () => {
    return (
      <>
        <RideMarker color={'green'} coordinate={origin} />
        <RideMarker color={'red'} coordinate={destination} />
      </>
    )
  }

  return (
    <Container style={style}>
      <Map
        mapId={mapId}
        showsUserLocation={false}
        // pitchEnabled={false}
        // zoomEnabled={false}
        // zoomTapEnabled={false}
        // rotateEnabled={false}
        // scrollEnabled={false}
        renderMarkers={renderOriginDestinationMarkers}
      />
    </Container>
  )

}

export default WhereFromWhereToStaticMap;

const Container = styled.View`
  position: relative;
  width: 100%;
  height: 250px;
`