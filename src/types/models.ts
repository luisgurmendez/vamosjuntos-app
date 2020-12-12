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
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  createdAt: string;
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
  RIDE_REQUEST_REFUSED = 'RIDE_REFUSED',
  RIDE_DROPED_OUT = 'RIDE_DROPED_OUT'
}

export interface NotificationContext {
  userId?: string;
  rideId?: string;
}

export interface Notification {
  id: number;
  type: NotificationType;
  user: User;
  context: NotificationContext;
}

export enum RideStatus {
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  PENDING = 'PENDING'
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