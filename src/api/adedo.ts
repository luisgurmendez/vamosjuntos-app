import axios, { CancelToken } from 'axios';
import { Address, Ride } from 'types/models';
import { Tokens } from 'types/tokens';
import { AddressFromCoordsResponse, GetRidesResponse, LoginResponse } from './responses';

const api = axios.create({
  baseURL: 'http://192.168.1.4:80'
});

api.interceptors.response.use((response) => {
  return response;
});

api.interceptors.request.use(async req => {
  return req;
})

export const getCancelTokenSource = () => {
  return axios.CancelToken.source();
}

export const login = async (username: string, password: string): Promise<Tokens | undefined> => {
  const response = await api.post<LoginResponse>('/auth/login', { username, password });
  console.log(response.data.success);
  if (response.data.success) {
    return { token: response.data.token, refreshToken: response.data.refreshToken };
  }
};

export const getRides = async (): Promise<Ride[]> => {
  const response = await api.get<GetRidesResponse>('/ride/all');
  if (response.data.success) {
    return response.data.rides;
  }
  return [];
};

export const getAddressFromCoords = async (latitude: number, longitude: number, opts?: { cancelToken: CancelToken }): Promise<Address> => {
  const latlng = { latitude: latitude, longitude: longitude }
  const response = await api.get<AddressFromCoordsResponse>(`/address/geo?latitude=${latitude}&longitude=${longitude}`, { cancelToken: opts?.cancelToken });
  console.log(response);
  if (response.data) {
    return { ...latlng, city: response.data.city, department: response.data.department };
  }

  return latlng;

}
