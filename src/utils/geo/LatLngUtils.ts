import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { Polygon, Feature, Coord } from '@turf/helpers'
import _departments from './geojsons/departments.json';
import _cities from './geojsons/cities.json';

const departments: GeoJSON.FeatureCollection<Polygon, { [name: string]: any; }> = _departments as any;
const cities: GeoJSON.FeatureCollection<Polygon, { [name: string]: any; }> = _cities as any;

export interface LatLng {
  latitude: number;
  longitude: number;
}

export class LatLngUtils {

  static getDepartment(point: Coord) {
    for (let i = 0; i < departments.features.length; i++) {
      const feature = departments.features[i]
      const _isInside = LatLngUtils.isPointInsidePolygon(point, feature as any)
      if (_isInside) {
        return feature.properties.name;
      }
    }
    return undefined;
  }

  static getCity(point: Coord, department?: string) {
    for (let i = 0; i < cities.features.length; i++) {
      const feature = cities.features[i];
      if (department) {
        const _dep = feature.properties['is_in'];
        if (_dep !== undefined && _dep !== department) {
          continue;
        }
      }
      const _isInside = LatLngUtils.isPointInsidePolygon(point, feature as any)
      if (_isInside) {
        return feature.properties.name;
      }
    }
    return undefined;
  }

  static isPointInsidePolygon(point: Coord, feature: Feature<Polygon>) {
    try {
      const poly = booleanPointInPolygon(point, feature);
      return poly
    } catch (e) {
      return false
    }
  }

}
