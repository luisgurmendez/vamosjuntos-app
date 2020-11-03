import MapContext, { IdsToMaps, MapState } from './MapContext';

import React from 'react';
import MapView from 'react-native-maps';

export class MapProvider extends React.Component<{}, MapState> {
  state: MapState = {
    maps: {},
  };

  addMap = (mapId: string, map: MapView) => {
    const maps: IdsToMaps = {
      ...this.state.maps,
    };
    maps[mapId] = map;
    this.setState({ maps });
  };

  removeMap = (mapId: string) => {
    const maps: IdsToMaps = {
      ...this.state.maps,
    };
    delete maps[mapId];
    this.setState({ maps });
  };

  render() {
    return (
      <MapContext.Provider
        value={{
          maps: this.state.maps,
          addMap: this.addMap,
          removeMap: this.removeMap,
        }}
      >
        {this.props.children}
      </MapContext.Provider>
    );
  }
}
