import { useEffect } from 'react';
import Storage, { initStorage } from 'storage/Storage';

function useInitStorage() {

  useEffect(() => {
    initStorage();
    // Storage.clear();
  }, [initStorage])
}

export default useInitStorage;