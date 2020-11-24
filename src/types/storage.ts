import { Address } from './models';

interface WithId {
  id: string;
}

export interface SavedAddress extends WithId {
  name: string;
  address: Address;
}

export type Addresses = SavedAddress[];

export interface Tokens {
  token: string;
  refreshToken: string;
}
