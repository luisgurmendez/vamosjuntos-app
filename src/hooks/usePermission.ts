import { useEffect, useState } from 'react';
import { Permission, RESULTS, check, request } from 'react-native-permissions';

function usePermission(permission: Permission, shouldRequestPermission: boolean = true) {
  const [isAvailable, setIsAvailable] = useState<boolean | undefined>(undefined);

  const requestPermission = async () => {
    const requestedPerms = await request(permission);
    setIsAvailable(requestedPerms === RESULTS.GRANTED);
    return requestedPerms;
  }

  useEffect(() => {
    check(permission).then((checkedPerms) => {
      if (checkedPerms !== RESULTS.GRANTED) {
        shouldRequestPermission && requestPermission();
      } else {
        setIsAvailable(true);
      }
    });
  }, [check, setIsAvailable]);

  return isAvailable;
}

export default usePermission;
