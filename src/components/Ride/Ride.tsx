import { Subtitle, Title } from 'components/Typography/Typography';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Map from 'components/Map/Map';
import Shadow from 'components/Shadow/Shadow';
import { useMap } from 'components/Map/useMap';
import RideMarker from './RideMarker';
import useMapZoomToCoords from 'hooks/useMapZoomToCoords';

const Travel: React.FC<any> = ({ style, onPress }) => {

  const origin = { latitude: -34.933927, longitude: -54.942109 };
  const destination = { latitude: -34.533927, longitude: -54.342109 };

  return (
    <Shadow>
      <Container onPress={onPress} style={style}>

        <DetailsContainer />
      </Container>
    </Shadow>
  );
}

export default Travel;

const Container = styled.TouchableOpacity`
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  height: 60px;
`

const DetailsContainer = styled.View`
  flex-grow: 2;
  background-color: white;
`