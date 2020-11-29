import React from 'react';
import styled from 'styled-components/native';
import { LatLng, Marker } from 'react-native-maps';
import { MarkerProps } from 'react-native-maps';

interface RideMarkerProps extends MarkerProps {
  color: string;
}

const RideMarker: React.FC<RideMarkerProps> = ({ color, ...rest }) => {

  return (
    <Marker
      {...rest}
    >
      <Pin color={color} />
    </Marker>
  )
}

export default RideMarker;

const Pin = styled.View<{ color: string }>`
  border-radius: 8px;
  width: 15px;
  height: 15px;
  background-color: ${props => props.color};
  border-width: 2px
  border-color: white;
`