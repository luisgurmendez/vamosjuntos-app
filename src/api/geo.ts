import { Address } from "types/models";
import { southamericaFunctions } from "./functions";

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number,
): Promise<Address> => {
  const latlng = { latitude, longitude };
  try {
    const addr = await southamericaFunctions.httpsCallable('whereIsThat')({ latitude, longitude })
    return { ...latlng, ...addr.data }
  } catch (e) {
    return latlng;
  }
}

