import { Stylable } from 'components/types';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { MapViewProps } from 'react-native-maps';
import styled from 'styled-components/native';
import MapContext from './MapContext';

export interface MapProps extends MapViewProps, Stylable {
  mapId?: string;
  renderMarkers?: () => React.ReactNode;
}

const Map: React.FC<MapProps> = ({ children, style, renderMarkers, mapId, ...mapProps }) => {
  const { addMap, removeMap } = React.useContext(MapContext);
  const [mapReady, setMapReady] = useState(false);
  const map = useRef<MapView>(null);

  const handleMapReady = () => {
    setMapReady(true);
  }

  useEffect(() => {
    // only add the map when ready.
    if (mapId !== undefined && map.current !== null && mapReady) {
      addMap(mapId, map.current);

      return () => {
        removeMap(mapId);
      };
    }

  }, [map.current, addMap, removeMap, mapReady]);

  return (
    <MapContainer>
      <MapView
        userLocationAnnotationTitle=""
        showsCompass={false}
        followsUserLocation={false}
        showsUserLocation={true}
        style={styles.map}
        onMapReady={handleMapReady}
        ref={map}
        {...mapProps}>
        {renderMarkers && renderMarkers()}
      </MapView>
      {children}
    </MapContainer>
  );
};

export default Map;

const MapContainer = styled.View`
  width: 100%;
  flex: 1;
  position: relative;
`;

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
