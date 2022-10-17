import { useMap } from "components/Map/useMap";
import { useEffect } from "react";
import { LatLng } from "react-native-maps";

function useMapZoomToCoords(mapId: string, coords: LatLng[], padding: number = 10) {
  const { map } = useMap(mapId);

  const edgePadding = { top: padding, left: padding, right: padding, bottom: padding }

  useEffect(() => {
    if (map) {
      map.fitToCoordinates(coords, { edgePadding });
    }
  }, [map, coords])

}

export default useMapZoomToCoords;

export function useMapZoomToCoord(mapId: string, coord: LatLng) {
  const { map } = useMap(mapId);

  useEffect(() => {
    if (map) {
      map.animateToRegion({
        latitude: coord.latitude,
        longitude: coord.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [map, coord])
}
