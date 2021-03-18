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
  name: string;
  phone: string;
  notificationToken: string;
  /**
   * Commulative avg Rating score
   */
  score: number;
  /**
   * Counter of the number of reviews this user has, usefull to calculate a new score
   */
  numberOfReviews: number;
  /**
   * profile pic image url
   */
  img: string;
  preferences: UserPreference[];
  /**
   * Check if the user need to fill it's data after authenticating
   */
  createdAt: string;
  rideRequests: RideRequest[];

  ridesAsPassenger: string[] //DocRef<Ride>[];
  ridesAsDriver: string[] //DocRef<Ride>[];

  // notifications: Collection<Notification>;
  // reviews: Collection<Review>;
}

export interface Review {
  fromUser: User;
  toUser: User;
  ride: Ride;
  comment: string;
  score: number;
}

export interface Passenger {
  id: string;
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
  price: number;
}

export enum FeatureFlags {
  BANNER_ADS = 'BANNER_ADS',
  FULL_SCREEN_ADS = 'FULL_SCREEN_ADS'
}

export interface FeatureFlag {
  name: string;
  enabled: boolean;
}