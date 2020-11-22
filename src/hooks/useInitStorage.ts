import { useEffect } from 'react';
import Storage from 'storage/Storage';

function useInitStorage() {

  useEffect(() => {
    Storage.init();
    // Storage.clear();
  }, [Storage.init])
}

export default useInitStorage;