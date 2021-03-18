import { Address } from "types/models";
import { southamericaFunctions } from "./functions";

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number,
): Promise<Address | undefined> => {
  try {
    const latlng = await southamericaFunctions.httpsCallable('whereIsThat')({ latitude, longitude })
    return latlng.data
  } catch (e) {
    return undefined;
  }
}

