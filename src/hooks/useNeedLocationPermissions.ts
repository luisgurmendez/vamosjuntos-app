import Toaster from 'components/Toaster/Toaster';
import useCheckAndRequestPermission from 'hooks/useCheckAndRequestPermission';
import { useEffect } from 'react';
import { PERMISSIONS } from 'react-native-permissions';

function useNeedLocationPermissions() {
  const hasLocationPerms = useCheckAndRequestPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  useEffect(() => {
    if (hasLocationPerms !== undefined) {
      if (!hasLocationPerms) {
        Toaster.alert({ message: 'Tenes que habilitar los permisos de ubicacion' });
      }
    }
  }, [hasLocationPerms]);
}

export default useNeedLocationPermissions;
