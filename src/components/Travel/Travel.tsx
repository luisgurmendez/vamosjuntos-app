import { Subtitle, Title } from 'components/Typography/Typography';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Map from 'components/Map/Map';
import Shadow from 'components/Shadow/Shadow';
import { useMap } from 'components/Map/useMap';
import TravelMarker from './TravelMarker';

const Travel: React.FC<any> = ({ style, id }) => {

  const { map } = useMap(id);

  const origin = { latitude: -34.933927, longitude: -54.942109 };
  const destination = { latitude: -34.533927, longitude: -54.342109 };

  useEffect(() => {
    if (map) {
      console.log('run for id', id)
      const coords = [origin, destination];
      map.fitToCoordinates(coords, { edgePadding: { top: 10, left: 10, right: 10, bottom: 10 }, animated: true });
    }
  }, [map])


  const renderOriginDestinationMarkers = () => {
    return (
      <>
        <TravelMarker color={'green'} coordinate={origin} />
        <TravelMarker color={'red'} coordinate={destination} />
      </>
    )
  }

  return (
    <Shadow>
      <Container style={style}>
        <MapContainer>
          <Map
            mapId={id}
            pitchEnabled={false}
            scrollEnabled={false}
            zoomTapEnabled={false}
            zoomEnabled={false}
            showsUserLocation={false}
            renderMarkers={renderOriginDestinationMarkers}
          />
        </MapContainer>
        <DetailsContainer />
      </Container>
    </Shadow>
  );
}

export default Travel;

const Container = styled.View`
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`

const MapContainer = styled.View`
  flex-grow: 1;
  background-color: blue;
  height: 110px;
`

const DetailsContainer = styled.View`
  flex-grow: 2;
  background-color: white;
`