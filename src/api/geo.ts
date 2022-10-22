import useCallable from "hooks/useCallable";
import { useCallback } from "react";
import { Address } from "types/models";


export function useGetAddressFromCoordsRemote() {
  const callable = useCallable<Address>('/where-is-that');

  const handleWhereIsThat = useCallback(async (latitude: number, longitude: number) => {
    const body = { latitude, longitude };
    try {
      const res = await callable(body);
      return { ...body, ...res?.data }
    } catch (e) {
      console.error(e)
    }
  }, [callable])

  return handleWhereIsThat;
}