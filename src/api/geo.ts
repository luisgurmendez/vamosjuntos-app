import UnAuthedHTTPClient from "components/HTTPClientContext/UnAuthedHttpClient";
import useCallable from "hooks/useCallable";
import { useCallback, useMemo, useRef } from "react";
import { Address } from "types/models";


export function useGetAddressFromCoordsRemote2() {
  const callable = useCallable<Address>('/where-is-that');

  const handleWhereIsThat = useCallback(async (latitude: number, longitude: number) => {
    const body = { latitude, longitude };
    try {
      const res = await callable(body);
      return { ...body, ...res?.data }
    } catch (e) {
      console.error(e)
    }
  }, [callable])

  return handleWhereIsThat;
}

const geocodeApiBase = 'https://maps.googleapis.com/maps/api'
const reverseGeoCodingEndpoint = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452'

interface GeocodeApiResult { }

interface GeocodeApiResponse {
  results: GeocodeApiResult[];
}

export function useGetAddressFromCoordsRemote() {
  const client = useMemo(() => new UnAuthedHTTPClient(geocodeApiBase), []);


  const handleWhereIsThat = useCallback(async (latitude: number, longitude: number) => {
    try {
      const res = await client.get('/geocode/json', { latlng: `${latitude},${longitude}`, key: 'AIzaSyBZQ6MdWqH31NxbJa0FQe61ax7rKDbHaeQ' })
      console.log(res);
      return res
    } catch (e) {
      console.error(e)
    }
  }, [client]);


  return handleWhereIsThat;
}


export function useGetAddressFromSearchQuery() {
  const client = useMemo(() => new UnAuthedHTTPClient(geocodeApiBase), []);
  c

  const handleGetAddressesFromSearch = useCallback(async (search: string) => {
    try {
      const res = await client.get('/geocode/json', {
        address: search,
        components: 'country:UY',
        // bounds: `${upperLeftBounds}|${bottomRightBounds}`,
        // region: 'uy',
        key: 'AIzaSyBZQ6MdWqH31NxbJa0FQe61ax7rKDbHaeQ'
      })
      console.log(res);
      return res
    } catch (e) {
      console.error(e)
    }
  }, [client]);

  return handleGetAddressesFromSearch;
}

const a = {
  "address_components": [
    { "long_name": "34RW+M45", "short_name": "34RW+M45", "types": ["plus_code"] },
    { "long_name": "Las Martinetas", "short_name": "Las Martinetas", "types": ["route"] },
    { "long_name": "La Barra", "short_name": "La Barra", "types": ["locality", "political"] },
    { "long_name": "San Carlos", "short_name": "San Carlos", "types": ["administrative_area_level_2", "political"] },
    { "long_name": "Departamento de Maldonado", "short_name": "Departamento de Maldonado", "types": ["administrative_area_level_1", "political"] },
    { "long_name": "Uruguay", "short_name": "UY", "types": ["country", "political"] },
    { "long_name": "20001", "short_name": "20001", "types": ["postal_code"] }
  ],
  "formatted_address": "34RW+M45, Las Martinetas, 20001 La Barra, Departamento de Maldonado, Uruguay",
  "geometry": { "location": { "lat": -34.9083523, "lng": -54.854629 }, "location_type": "GEOMETRIC_CENTER", "viewport": { "northeast": { "lat": -34.90700331970849, "lng": -54.85328001970849 }, "southwest": { "lat": -34.90970128029149, "lng": -54.85597798029149 } } }, "place_id": "ChIJRexcZUkDdZURhIoJBfUOkxY", "types": ["establishment", "health", "point_of_interest"]
}