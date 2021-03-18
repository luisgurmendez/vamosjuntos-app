import { AppState } from "state/types";
import { useSelector } from 'react-redux';
import { getIsUserLoggedIn } from 'state/user/selectors';

function useIsLoggedIn() {
  const isLoggedIn = useSelector(getIsUserLoggedIn);
  return isLoggedIn;
}

export default useIsLoggedIn;