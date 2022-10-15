import { Stylable } from 'components/types';
import useMapZoomToCoords from 'hooks/useMapZoomToCoords';
import React from 'react'
import styled from 'styled-components/native';
import { Address } from 'types/models';
import Map from 'components/Map/Map';
import RideMarker from 'components/Ride/RideMarker';

interface LocationMessageBubbleContentProps extends Stylable {
    mapId: string;
    location: Address;
}

const LocationMessageBubbleContent: React.FC<LocationMessageBubbleContentProps> = ({ mapId, location, style }) => {
    useMapZoomToCoords(mapId, [location], 1000);

    const renderOriginDestinationMarkers = () => {
        return (
            <>
                <RideMarker type={'destination'} coordinate={location} />
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

export default LocationMessageBubbleContent;

const Container = styled.View`
  position: relative;
  height: 150px;
  max-height: 250px;
  min-width: 100%;
`

