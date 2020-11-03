import { useEffect } from 'react';
import { initStorage } from 'storage/Storage';

function useInitStorage() {

  useEffect(() => {
    initStorage();
  }, [initStorage])
}

export default useInitStorage;