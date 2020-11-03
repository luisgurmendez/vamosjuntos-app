import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageAPI {
  created: boolean;
}

type ErrorCallback = (error?: Error) => void

class Storage {

  public static CREATED = 'created';

  static async isInitialized() {
    const created = await AsyncStorage.getItem(this.CREATED);
    return created !== undefined && created !== null;
  }

  static async init() {
    const inited = await Storage.isInitialized();
    if (!inited) {
      await AsyncStorage.setItem(Storage.CREATED, 'true');
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
        await AsyncStorage.setItem(key, stringifiedValue)
      } catch (e) {
        await Storage.setStringItem(key, value as unknown as string)
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
}
export default Storage;

export const initStorage = async () => {
  await Storage.init();
}

