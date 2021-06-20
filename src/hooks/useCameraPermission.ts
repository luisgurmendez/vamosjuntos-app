import { PERMISSIONS } from "react-native-permissions";
import usePermission from "./usePermission";
import { usePlatform } from "./usePlatform";

function useCameraPermission() {
  const { isIOS } = usePlatform();
  const permission = isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  const isGranted = usePermission(permission);
  return isGranted;
}

export default useCameraPermission;