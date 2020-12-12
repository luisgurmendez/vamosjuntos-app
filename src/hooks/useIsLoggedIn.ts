import { useSelector } from "react-redux";
import { AppState } from "state/types";

function useIsLoggedIn() {

  const user = useSelector<AppState>(state => state.user.user);
  return user !== undefined;
}

export default useIsLoggedIn;