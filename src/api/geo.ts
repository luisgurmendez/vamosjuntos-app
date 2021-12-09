import { Address } from "types/models";
import { southamericaFunctions } from "./functions";

export const getAddressFromCoordsRemote = async (
  latitude: number,
  longitude: number,
): Promise<Address | undefined> => {
  const latlng = { latitude, longitude };
  try {
    const addr = await southamericaFunctions.httpsCallable('whereIsThat')({ latitude, longitude })
    console.log(addr);
    return { ...latlng, ...addr.data }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
