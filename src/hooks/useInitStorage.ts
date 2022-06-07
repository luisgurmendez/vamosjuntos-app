import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInited } from 'state/storage/selectors';
import { init } from 'state/storage/thunkActions';

function useInitStorage() {
  const dispatch = useDispatch();
  const isInited = useSelector(getInited);
  useEffect(() => {
    dispatch(init())
  }, []);

  return isInited;
}

export default useInitStorage;
