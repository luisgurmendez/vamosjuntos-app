import React from 'react';
import MapView from 'react-native-maps';

export interface IdsToMaps {
  [mapId: string]: MapView;
}

export interface MapState {
  maps: IdsToMaps;
}

export interface MapApi {
  addMap: (mapId: string, map: MapView) => void;
  removeMap: (mapId: string) => void;
}

export interface MapContextState extends MapState, MapApi {}

const MapContext = React.createContext<MapContextState>({
  maps: {},
  addMap: () => {},
  removeMap: () => {}
});

export default MapContext;
