import { getUser, refreshTokens } from "api/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "state/user/actions";
import Storage from 'storage/Storage';
import { Tokens } from "types/storage";

/**
 * Solves initial app load auth and fetchs user, use in combination with useHideSplashScreen
 */
function useIsAppReady() {

  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  // 1. Get tokens from local storage.
  // 2. Refresh tokens.
  // 3. Fetch user
  // 4. Stores user in state.
  // 5. Sets FCM user token
  useEffect(() => {

    const setUp = async (res: () => void, rej: () => void) => {
      let tokens = await Storage.getItem<Tokens>(Storage.TOKENS);
      if (tokens !== undefined) {
        tokens = await refreshTokens(tokens.refreshToken);
        await Storage.setItem(Storage.TOKENS, tokens);
        const user = await getUser();
        dispatch(setUser(user))
      }
      res();
    }

    const setupPromise = new Promise(setUp);

    setupPromise.then(() => {
      setReady(true)
    }).catch(e => {
      // TODO What should we do here?!
      // re try? How?
      console.log(e);
    })

  }, [setReady]);

  return ready;
}

export default useIsAppReady;