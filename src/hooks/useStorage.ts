import { useCallback, useDebugValue, useEffect, useState } from 'react';
import Storage from 'storage/Storage';

interface UseStorage<T> {
  value: T;
  setValue: (v: T) => Promise<void>;
  isFetching: boolean;
  refreshValue: () => void;
}

function useStorage<T>(
  key: string,
  defaultValue: T
): UseStorage<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const [isGettingValue, setIsGettingValue] = useState(false);

  const setValueInStorageAsWell = async (newValues: T) => {
    setValue(newValues);
    await Storage.setItem(key, newValues)
  }

  const getValue = useCallback(async () => {
    setIsGettingValue(true);
    const _value = await Storage.getItem<T>(key);
    if (_value !== undefined) {
      setValue(_value);
    }
    setIsGettingValue(false);
  }, [key]);

  useEffect(() => {
    getValue();
  }, [getValue]);

  useDebugValue(value);

  return { value, setValue: setValueInStorageAsWell, isFetching: isGettingValue, refreshValue: getValue };
}

export default useStorage;
