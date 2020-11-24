import { useEffect, useState } from 'react';
import { Permission, RESULTS, check, request } from 'react-native-permissions';

function useCheckAndRequestPermission(permission: Permission) {
  const [isAvailable, setIsAvailable] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    check(permission).then((checkedPerms) => {
      if (checkedPerms !== RESULTS.GRANTED) {
        request(permission).then((requestedPerms) => {
          setIsAvailable(requestedPerms === RESULTS.GRANTED);
        });
      } else {
        setIsAvailable(true);
      }
    });
  }, [check, setIsAvailable]);

  return isAvailable;
}

export default useCheckAndRequestPermission;
