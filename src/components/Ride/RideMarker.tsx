import React from 'react';
import styled from 'styled-components/native';
import { Marker } from 'react-native-maps';
import { MarkerProps } from 'react-native-maps';
import { colors } from 'utils/colors';

interface RideMarkerProps extends MarkerProps {
  type: 'origin' | 'destination';
}

const RideMarker: React.FC<RideMarkerProps> = ({ type, ...rest }) => {
  const isDestination = type === 'destination';
  // const markerOffset = isDestination ? { y: -destinationIconSize / 2, x: 0 } : undefined;

  return (
    <Marker
      // centerOffset={markerOffset}
      {...rest}
    >
      {
        isDestination ?
          <DestinationPin />
          :
          <OriginPin />
      }
    </Marker>
  )
}

export default RideMarker;

const DestinationPin = styled.View`
  border-radius: 8px;
  width: 15px;
  height: 15px;
  background-color: ${colors.main};
  border-width: 2px
  border-color: ${colors.white};
`

const OriginPin = styled.View`
  border-radius: 8px;
  width: 12px;
  height: 12px;
  border-width: 3px
  background-color: ${colors.white}
  border-color: ${colors.black};
`