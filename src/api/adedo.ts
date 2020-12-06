import { CancelToken } from 'axios';
import { Address, Ride, User } from 'types/models';
import { api } from './api';
import { AddressFromCoordsResponse, GetRidesResponse } from './responses';

export const getRides = async (): Promise<Ride[]> => {
  const response = await api.get<GetRidesResponse>('/ride/all');
  if (response.data.success) {
    return response.data.rides;
  }
  return [];
};

export const ping = async () => {
  api.get('/status');
}

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number,
  opts?: { cancelToken: CancelToken }
): Promise<Address> => {
  console.log('getAddrss')
  const latlng = { latitude: latitude, longitude: longitude }
  const response = await api.get<AddressFromCoordsResponse>(
    `/address/geo?latitude=${latitude}&longitude=${longitude}`,
    { cancelToken: opts?.cancelToken }
  );
  console.log(response);
  if (response.data) {
    return { ...latlng, city: response.data.city, department: response.data.department };
  }

  return latlng;

}
