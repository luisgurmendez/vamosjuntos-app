import React from 'react';
import styled from 'styled-components/native';
import { Marker } from 'react-native-maps';
import { MarkerProps } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from 'utils/colors';

interface RideMarkerProps extends MarkerProps {
  type: 'origin' | 'destination';
}

const RideMarker: React.FC<RideMarkerProps> = ({ type, ...rest }) => {
  const destinationIconSize = 30
  const isDestination = type === 'destination';
  const markerOffset = isDestination ? { y: -destinationIconSize / 2, x: 0 } : undefined;

  return (
    <Marker
      centerOffset={markerOffset}
      {...rest}
    >
      {
        isDestination ?
          <Icon name="map-marker" color={colors.main} size={destinationIconSize} />
          :
          <OriginPin />
      }
    </Marker>
  )
}

export default RideMarker;

const OriginPin = styled.View`
  border-radius: 8px;
  width: 15px;
  height: 15px;
  background-color: ${colors.success};
  border-width: 2px
  border-color: white;
`