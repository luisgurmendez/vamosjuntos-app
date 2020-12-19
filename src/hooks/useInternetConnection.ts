import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

function useInternetConnection() {

  const [hasInternetConnection, setHasInternetConnection] = useState(false);
  const [hasCheckedInternetconnection, setHasCheckedInternetConnection] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((event) => {
      if (typeof event.isInternetReachable === 'boolean') {
        setHasInternetConnection(event.isConnected && event.isInternetReachable);
        setHasCheckedInternetConnection(true);
      }
    });

    return () => {
      unsubscribe();
    };
  });

  return [hasInternetConnection, hasCheckedInternetconnection];
}

export default useInternetConnection;
