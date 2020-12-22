import { CancelToken } from 'axios';
import { Address, Ride, User, Notification, Passenger, RideRequest, FeatureFlag, Review } from 'types/models';
import { api } from './api';
import {
  AddressFromCoordsResponse,
  CancelRideResponse,
  CreateRideResponse,
  DropOutRideResponse,
  GetNotificationsResponse,
  GetRideDetailsResponse,
  GetRidesResponse,
  UpdateUserResponse,
  CreateRideRequestResponse,
  BaseResponse,
  GetFeatureFlagsResponse,
  GetReviewsResponse
} from './responses';

export const createRide = async (body: Partial<Ride>): Promise<Ride | undefined> => {
  const response = await api.post<CreateRideResponse>('/ride/create', body);
  if (response.data.success) {
    return response.data.ride;
  }
  return undefined;
};

export const cancelRide = async (rideId: string): Promise<Ride | undefined> => {
  const response = await api.post<CancelRideResponse>('/ride/cancel', { rideId });
  if (response.data.success) {
    return response.data.ride;
  }
  return undefined;
};

export const createRideRequest = async (rideId: string, whereFrom: Address, whereTo: Address): Promise<RideRequest | undefined> => {
  const response = await api.post<CreateRideRequestResponse>('/request/request', { rideId, whereFrom, whereTo });
  if (response.data.success) {
    return response.data.rideRequest;
  }
  return undefined;
};


export const acceptRideRequest = async (requestId: string): Promise<boolean> => {
  const response = await api.post<BaseResponse>('/request/accept', { requestId });
  return response.data.success;
};

export const declineRideRequest = async (requestId: string): Promise<boolean> => {
  const response = await api.post<BaseResponse>('/request/decline', { requestId });
  return response.data.success;
};


export const dropOutRide = async (rideId: string): Promise<Passenger | undefined> => {
  const response = await api.post<DropOutRideResponse>('/passenger/drop-out', { rideId });
  if (response.data.success) {
    return response.data.passenger;
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

export const getFeatureFlags = async (): Promise<FeatureFlag[]> => {
  const response = await api.get<GetFeatureFlagsResponse>('/feature_flags/all');
  if (response.data.success) {
    return response.data.featureFlags;
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


export const setSeenNotifications = async (notificationIds: number[] | string[]): Promise<boolean> => {
  const response = await api.post<BaseResponse>('/notification/seen', { notifications: notificationIds });
  return response.data.success;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await api.post<UpdateUserResponse>('/user/update', { user });
  if (response.data.success) {
    return response.data.user;
  }
  return user;
};

export const getReviews = async (userId: string): Promise<Review[]> => {
  const response = await api.get<GetReviewsResponse>(`/review/${userId}`);
  if (response.data.success) {
    return response.data.reviews;
  }
  return [];
};

export const sendComplaint = async (complaint: string): Promise<boolean> => {
  const response = await api.post<BaseResponse>('/complaint/create', { complaint });
  return response.data.success;
};
