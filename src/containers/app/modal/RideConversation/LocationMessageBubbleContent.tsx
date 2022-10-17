import { Stylable } from 'components/types';
import useMapZoomToCoords, { useMapZoomToCoord } from 'hooks/useMapZoomToCoords';
import React from 'react'
import styled from 'styled-components/native';
import { Address } from 'types/models';
import Map from 'components/Map/Map';
import RideMarker from 'components/Ride/RideMarker';
import { Linking, Platform } from 'react-native';

interface LocationMessageBubbleContentProps extends Stylable {
    mapId: string;
    location: Address;
    senderName: string;
}

const LocationMessageBubbleContent: React.FC<LocationMessageBubbleContentProps> = ({ mapId, location, senderName, style }) => {
    useMapZoomToCoord(mapId, location);

    const renderOriginDestinationMarkers = () => {
        return (
            <>
                <RideMarker type={'destination'} coordinate={location} />
            </>
        )
    }

    const handleOpenMaps = async () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${location.latitude},${location.longitude}`;
        const label = senderName;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        }) ?? '';
        Linking.openURL(url);

    }

    return (
        <Container style={style}>
            <Map
                onPress={handleOpenMaps}
                mapId={mapId}
                showsUserLocation={false}
                pitchEnabled={false}
                zoomEnabled={false}
                zoomTapEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
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

