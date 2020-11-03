import { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { useSelector } from "react-redux";
import { hasLoadedOrError, AppState } from "state/types";

function useHideSlpashScreen() {
  const hasLoadedOrErrorBrands = useSelector((state: AppState) => hasLoadedOrError(state.brands.loading));
  const hasLoadedOrErrorFeatureFlags = useSelector((state: AppState) => hasLoadedOrError(state.featureFlags.loading));
  const hasLoadedOrErrorAssets = hasLoadedOrErrorBrands && hasLoadedOrErrorFeatureFlags

  useEffect(() => {
    // Hide splashscreen if resources are loaded or the request had failed
    if (hasLoadedOrErrorAssets || true) {
      SplashScreen.hide();
    }
  }, [hasLoadedOrErrorAssets]);

  return hasLoadedOrErrorAssets;
}

export default useHideSlpashScreen;