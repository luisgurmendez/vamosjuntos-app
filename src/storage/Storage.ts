import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from 'state/storage/types';

type ErrorCallback = (error?: Error) => void;

class Storage {
  public static INITED = false;
  public static CREATED = 'created';
  public static ADDRESSES = 'addresses';
  public static SHOULD_WELCOME = 'shouldWelcome';
  public static SHOW_CANCELED_RIDES = 'showCanceledRides';
  public static SHOW_COMPLETED_RIDES = 'showCompletedRides';
  public static SHOW_SEEN_NOTIFICATIONS = 'showSeenNotifications';
  public static HAS_MADE_A_SEARCH: StorageKeys = 'hasMadeASearch';

  static async isInitialized() {
    if (Storage.INITED) {
      return true;
    }
    const created = await AsyncStorage.getItem(this.CREATED);
    return created !== undefined && created !== null;
  }

  static async init() {
    const inited = await Storage.isInitialized();
    Storage.INITED = true;
    if (!inited) {
      await AsyncStorage.setItem(Storage.CREATED, 'true');
      await AsyncStorage.setItem(Storage.ADDRESSES, '[]');
      await AsyncStorage.setItem(Storage.SHOULD_WELCOME, 'true');
      await AsyncStorage.setItem(Storage.SHOW_CANCELED_RIDES, 'true');
      await AsyncStorage.setItem(Storage.SHOW_COMPLETED_RIDES, 'true');
      await AsyncStorage.setItem(Storage.SHOW_SEEN_NOTIFICATIONS, 'false');
      await AsyncStorage.setItem(Storage.HAS_MADE_A_SEARCH, 'false');
    }
  }

  static async clear() {
    await AsyncStorage.clear();
  }

  static async setItem<T>(key: string, value: T): Promise<void> {
    const inited = await Storage.isInitialized();
    if (inited) {
      try {
        const stringifiedValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, stringifiedValue);
      } catch (e) {
        await Storage.setStringItem(key, (value as unknown) as string);
      }
    }
  }

  static async setStringItem(key: string, value: string): Promise<void> {
    const inited = await Storage.isInitialized();
    if (inited) {
      await AsyncStorage.setItem(key, value);
    }
  }

  static async getItem<T = string>(key: string, errorCb?: ErrorCallback): Promise<T | undefined> {
    const inited = await Storage.isInitialized();
    if (inited) {
      const value = await AsyncStorage.getItem(key, errorCb);
      if (value !== null) {
        return JSON.parse(value) as T;
      }
    }

    return undefined;
  }

  static async getStringItem(key: string, errorCb?: ErrorCallback): Promise<string | undefined> {
    const inited = await Storage.isInitialized();
    if (inited) {
      const value = await AsyncStorage.getItem(key, errorCb);
      if (value !== null) {
        return value;
      }
    }
    return undefined;
  }

  static async removeItem(key: string, errorCb?: ErrorCallback): Promise<void> {
    const inited = await Storage.isInitialized();
    if (inited) {
      await AsyncStorage.removeItem(key, errorCb);
    }
  }
}
export default Storage;
