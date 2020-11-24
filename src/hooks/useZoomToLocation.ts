import { useMap } from 'components/Map/useMap';
import { useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

function useZoomToLocation(mapId: string) {
  const { map } = useMap(mapId);

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      if (map !== null && map !== undefined) {
        map.animateToRegion(
          {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          },
          1000
        );
      }
    });
  }, [Geolocation, map]);
}

export default useZoomToLocation;
