import { useNavigation } from "@react-navigation/native";
import { DependencyList, useCallback, useEffect } from "react";

function useCleanScreenBeforeNavigationRemoval(cleanFn: () => void, deps: DependencyList = []) {
  const navigation = useNavigation();

  const handleClean = useCallback(cleanFn, deps);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', handleClean);
    return unsubscribe;
  }, [handleClean, navigation])
}

export default useCleanScreenBeforeNavigationRemoval;