import { useMap } from "components/Map/useMap";
import { useEffect } from "react";
import { LatLng } from "react-native-maps";

function useMapZoomToCoords(mapId: string, coords: [LatLng, LatLng], padding: number = 10) {
  const { map } = useMap(mapId);

  const edgePadding = { top: padding, left: padding, right: padding, bottom: padding }

  useEffect(() => {
    if (map) {
      map.fitToCoordinates(coords, { edgePadding });
    }
  }, [map, coords])

}

export default useMapZoomToCoords;