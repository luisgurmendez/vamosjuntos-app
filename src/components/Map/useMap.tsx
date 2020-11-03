import { useCallback, useContext } from 'react';

import MapContext from './MapContext';

export function useMap(mapId: string) {
  const { maps, removeMap } = useContext(MapContext);

  const removeMapCb = useCallback(() => {
    removeMap(mapId);
  }, [mapId, removeMap]);

  return { map: maps[mapId], removeMap: removeMapCb };
}
