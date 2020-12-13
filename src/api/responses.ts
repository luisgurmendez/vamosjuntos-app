import { Ride, User, Notification } from 'types/models';
import { Tokens } from 'types/tokens';

interface BaseResponse {
  success: boolean;
}

export interface GetRidesResponse extends BaseResponse {
  rides: Ride[];
}

export interface GetRideDetailsResponse extends BaseResponse {
  ride: Ride;
}

export interface GetNotificationsResponse extends BaseResponse {
  notifications: Notification[];
}

export interface LoginResponse extends BaseResponse, Tokens {
  message: string;
}

export interface AddressFromCoordsResponse extends BaseResponse {
  city: string;
  department: string;
}

export interface RegisterResponse extends BaseResponse {
  user: User;
}

export interface ForgotPasswordResponse extends BaseResponse {

}

export interface RefreshTokenResponse extends BaseResponse, Tokens { }

export interface GetUserResponse extends BaseResponse {
  user: User;
}
export interface UpdateUserResponse extends BaseResponse {
  user: User;
}