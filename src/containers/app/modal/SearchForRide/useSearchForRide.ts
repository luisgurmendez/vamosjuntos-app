import { useCallback, useContext } from 'react';

import SearchForRideContext from './SearchForRideContext';

export function useSearchForRide() {
  return useContext(SearchForRideContext);
}
