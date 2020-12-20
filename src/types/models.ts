export interface Address {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  department?: string;
  district?: string;
}

export enum UserPreference {
  PET = 'pet',
  NO_PETS = 'noPets',
  MUSIC = 'music',
  NO_MUSIC = 'noMusic',
  SMOKE = 'smoke',
  NO_SMOKE = 'noSmoke',
  TALK = 'talk',
  NO_TALK = 'noTalk',
  ALWAYS_MASK = 'alwaysMask'
}

export interface User {
  id: string;
  ci: string;
  name: string;
  username: string;
  phone: string;
  createdAt: string;
  score: number;
  preferences: UserPreference[]
}

export interface Passenger {
  user: User;
  ride: Ride;
  whereTo: Address;
  whereFrom: Address;
}

export enum NotificationType {
  RIDE_CANCELED = 'RIDE_CANCELED',
  RIDE_KICKED_OUT = 'RIDE_KICKED_OUT',
  RIDE_REQUEST = 'RIDE_REQUEST',
  RIDE_REQUEST_ACCEPTED = 'RIDE_REQUEST_ACCEPTED',
  RIDE_REQUEST_DECLINED = 'RIDE_REQUEST_DECLINED',
  RIDE_DROPED_OUT = 'RIDE_DROPED_OUT'
}

export interface NotificationContext {
  user?: User; // The user that has triggered this notification. 
  ride?: Ride;
  rideRequest: RideRequest
}

export enum NotificationStatus {
  SEEN = 'SEEN',
  UN_SEEN = 'UN_SEEN'
}

export interface Notification {
  id: number;
  type: NotificationType;
  user: User;
  status: NotificationStatus;
  context: NotificationContext;
  createdAt: string;
}

export enum RideStatus {
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  PENDING = 'PENDING'
}

export enum RideRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED'
}

export interface RideRequest {
  id: string;
  user: User;
  ride: Ride;
  whereTo: Address;
  whereFrom: Address;
  status: RideRequestStatus;
}

export interface Ride {
  id: string;
  driver: User;
  capacity: number;
  date: string;
  passengers: Passenger[];
  whereTo: Address;
  whereFrom: Address;
  status: RideStatus;
}


export interface Comment {
  user: string; //TODO for now
  comment: string;
  score: number;
}

export enum FeatureFlags {
  BANNER_ADS = 'BANNER_ADS',
  FULL_SCREEN_ADS = 'FULL_SCREEN_ADS'
}

export interface FeatureFlag {
  name: string;
  enabled: boolean;
}