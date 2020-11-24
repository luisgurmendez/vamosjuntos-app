import { useEffect, useState } from 'react';
import Storage from 'storage/Storage';

function useGetFromStorage<T>(
  key: string,
  defaultValue: T
): [T, boolean, (v: T) => void | undefined, (f: boolean) => void | undefined] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isGettingValue, setIsGettingValue] = useState(false);

  useEffect(() => {
    const getValue = async () => {
      setIsGettingValue(true);
      const _value = await Storage.getItem<T>(key);
      if (_value) {
        setValue(_value);
      }
      setIsGettingValue(true);
    };

    getValue();
  }, [key]);

  return [value, isGettingValue, setValue, setIsGettingValue];
}

export default useGetFromStorage;
