import { useSelector } from 'react-redux';
import { getIsUserLoggedIn } from 'state/user/selectors';
import useHTTPClient from "components/HTTPClientContext/useHTTPClient";

function useIsLoggedIn() {
  const isLoggedIn = useSelector(getIsUserLoggedIn);
  const client = useHTTPClient();
  return isLoggedIn && client !== null;
}

export default useIsLoggedIn;