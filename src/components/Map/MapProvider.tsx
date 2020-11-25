import MapContext, { IdsToMaps, MapState } from './MapContext';

import React from 'react';
import MapView from 'react-native-maps';

export class MapProvider extends React.Component<{}, MapState> {
  state: MapState = {
    maps: {}
  };

  addMap = (mapId: string, map: MapView) => {

    this.setState((state) => {
      const maps: IdsToMaps = {
        ...state.maps
      };
      maps[mapId] = map;
      return { maps }
    });
  };

  removeMap = (mapId: string) => {

    this.setState((state) => {
      const maps: IdsToMaps = {
        ...state.maps
      };
      delete maps[mapId];
      return { maps }
    });
  };

  render() {
    return (
      <MapContext.Provider
        value={{
          maps: this.state.maps,
          addMap: this.addMap,
          removeMap: this.removeMap
        }}>
        {this.props.children}
      </MapContext.Provider>
    );
  }
}
