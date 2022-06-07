import { SavedAddress } from "types/storage";

interface StorageShape {
  addresses: SavedAddress[];
  shouldWelcome: boolean;
  showCanceledRides: boolean;
  showCompletedRides: boolean;
  showSeenNotifications: boolean;
}

export type StorageKeys = keyof StorageShape;

export interface StorageState extends StorageShape {
  inited: boolean;
  isInitializing: boolean;
}
