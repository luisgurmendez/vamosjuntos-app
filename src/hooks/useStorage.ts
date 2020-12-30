import { useDebugValue, useEffect, useState } from 'react';
import Storage from 'storage/Storage';

function useStorage<T>(
  key: string,
  defaultValue: T
): [T, (v: T) => Promise<void>, boolean, (f: boolean) => void | undefined] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isGettingValue, setIsGettingValue] = useState(false);

  const setValueInStorageAsWell = async (newValues: T) => {
    setValue(newValues);
    await Storage.setItem(key, newValues)
  }

  useEffect(() => {
    const getValue = async () => {
      setIsGettingValue(true);
      const _value = await Storage.getItem<T>(key);
      if (_value !== undefined) {
        setValue(_value);
      }
      setIsGettingValue(false);
    };

    getValue();
  }, [key]);

  useDebugValue(value);

  return [value, setValueInStorageAsWell, isGettingValue, setIsGettingValue];
}

export default useStorage;
