import { Ride, User, Notification, Passenger, RideRequest, FeatureFlag, Review } from 'types/models';
import { Tokens } from 'types/tokens';

export interface BaseResponse {
  success: boolean;
}

export interface CreateRideResponse extends BaseResponse {
  ride: Ride;
}

export interface CancelRideResponse extends BaseResponse {
  ride: Ride;
}

export interface GetRidesResponse extends BaseResponse {
  rides: Ride[];
}

export interface GetFeatureFlagsResponse extends BaseResponse {
  featureFlags: FeatureFlag[];
}

export interface GetRideDetailsResponse extends BaseResponse {
  ride: Ride;
}

export interface DropOutRideResponse extends BaseResponse {
  passenger: Passenger;
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

export interface CreateRideRequestResponse extends BaseResponse {
  rideRequest: RideRequest;
}

export interface GetReviewsResponse extends BaseResponse {
  reviews: Review[];
}
