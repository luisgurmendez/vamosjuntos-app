import Toaster from 'components/Toaster/Toaster';
import useCheckAndRequestPermission from 'hooks/useCheckAndRequestPermission';
import { useEffect } from 'react';
import { PERMISSIONS } from 'react-native-permissions';
import { usePlatform } from './usePlatform';

function useNeedLocationPermissions() {
  const { isIOS } = usePlatform();
  const permission = isIOS ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  const hasLocationPerms = useCheckAndRequestPermission(permission);
  useEffect(() => {
    if (hasLocationPerms !== undefined) {
      if (!hasLocationPerms) {
        Toaster.alert({ message: 'Tenes que habilitar los permisos de ubicacion' });
      }
    }
  }, [hasLocationPerms]);
}

export default useNeedLocationPermissions;
