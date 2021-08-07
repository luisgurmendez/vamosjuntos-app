import { PERMISSIONS } from "react-native-permissions";
import usePermission from "./usePermission";
import { usePlatform } from "./usePlatform";

function useLocationPermission() {
  const { isIOS } = usePlatform();
  const permission = isIOS ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  const isGranted = usePermission(permission, false);
  const isGrantedAlwaysLocation = isIOS ? usePermission(PERMISSIONS.IOS.LOCATION_ALWAYS, false) : false;
  return isGranted || isGrantedAlwaysLocation;
}

export default useLocationPermission;
