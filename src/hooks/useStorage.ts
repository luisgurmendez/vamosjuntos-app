import { useDispatch, useSelector } from 'react-redux';
import { getStorage } from 'state/storage/selectors';
import {
  setHasMadeASearchInStorage,
  setSavedAddressesInStorage,
  setShouldWelcomeInStorage,
  setShowCanceledRidesInStorage,
  setShowCompletedRidesInStorage,
  setShowSeenNotificationsInStorage
} from 'state/storage/thunkActions';
import { StorageKeys } from 'state/storage/types';
import { SavedAddress } from 'types/storage';

type StorageReturn<T> = [T, (i: T) => Promise<void>];

function useStorage2<T>(key: StorageKeys): StorageReturn<T> {

  const dispatch = useDispatch();
  const storageState = useSelector(getStorage);

  const handleSetItem = (item: T) => {
    switch (key) {
      case 'addresses':
        dispatch(setSavedAddressesInStorage((item as unknown as SavedAddress[])));
        break;
      case 'shouldWelcome':
        dispatch(setShouldWelcomeInStorage((item as unknown as boolean)));
        break;
      case 'showCanceledRides':
        dispatch(setShowCanceledRidesInStorage((item as unknown as boolean)));
        break;
      case 'showCompletedRides':
        dispatch(setShowCompletedRidesInStorage((item as unknown as boolean)));
        break;
      case 'showSeenNotifications':
        dispatch(setShowSeenNotificationsInStorage((item as unknown as boolean)));
        break;
      case 'hasMadeASearch':
        dispatch(setHasMadeASearchInStorage((item as unknown as boolean)));
        break;
    }
  }

  return [storageState[key], handleSetItem] as unknown as StorageReturn<T>
}

export default useStorage2;