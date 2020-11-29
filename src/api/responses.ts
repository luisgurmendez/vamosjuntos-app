import { Ride } from 'types/models';
import { Tokens } from 'types/tokens';

interface BaseResponse {
  success: boolean;
}

export interface GetRidesResponse extends BaseResponse {
  rides: Ride[];
}

export interface LoginResponse extends BaseResponse, Tokens {
  message: string;
}

export interface AddressFromCoordsResponse extends BaseResponse {
  city: string;
  department: string;
}