
export interface Address {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  department: string;
  district: string;
}

export interface User {
  id: string;
  ci: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
}

export interface Passenger {
  user: User;
  ride: Ride;
  whereTo: Address;
  whereFrom: Address;
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