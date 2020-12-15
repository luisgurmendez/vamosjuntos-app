import { CancelToken } from 'axios';
import { Address, Ride, User, Notification } from 'types/models';
import { api } from './api';
import { AddressFromCoordsResponse, CreateRideResponse, GetNotificationsResponse, GetRideDetailsResponse, GetRidesResponse, UpdateUserResponse } from './responses';

export const createRide = async (body: Partial<Ride>): Promise<Ride | undefined> => {
  const response = await api.post<CreateRideResponse>('/ride/create', body);
  if (response.data.success) {
    return response.data.ride;
  }
  return undefined;
};


export const getRides = async (): Promise<Ride[]> => {
  const response = await api.get<GetRidesResponse>('/ride/all');
  if (response.data.success) {
    return response.data.rides;
  }
  return [];
};

interface PossibleRidesData {
  whereFrom: Address;
  whereTo: Address;
  date: string;
}

export const getPossibleRides = async (data: PossibleRidesData): Promise<Ride[]> => {
  const response = await api.post<GetRidesResponse>('/ride/possible', data);
  if (response.data.success) {
    return response.data.rides;
  }
  return [];
};


export const getRideDetails = async (rideId: string): Promise<Ride | undefined> => {
  const response = await api.get<GetRideDetailsResponse>(`/ride/${rideId}`);
  if (response.data.success) {
    return response.data.ride;
  }
  return undefined;
};

export const ping = async () => {
  api.get('/status');
}

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number,
  opts?: { cancelToken: CancelToken }
): Promise<Address> => {
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

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await api.get<GetNotificationsResponse>('/notification/all');
  if (response.data.success) {
    return response.data.notifications;
  }
  return [];
};


export const updateUser = async (user: User): Promise<User> => {
  const response = await api.post<UpdateUserResponse>('/user/update', { user });
  if (response.data.success) {
    return response.data.user;
  }
  return user;
}; 