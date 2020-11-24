import axios from 'axios';
import { Ride } from 'types/models';
import { Tokens } from 'types/tokens';
import { GetRidesResponse, LoginResponse } from './responses';

const api = axios.create({
  baseURL: 'http://192.168.1.12:80'
});

api.interceptors.response.use((response) => {
  return response;
});

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
