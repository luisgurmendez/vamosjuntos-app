import { Address } from "types/models";
import { LatLngUtils } from "utils/geo/LatLngUtils";
import { southamericaFunctions } from "./functions";

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number,
): Promise<Address | undefined> => {
  const addr = { latitude, longitude };
  const coords = [longitude, latitude];
  const department = LatLngUtils.getDepartment(coords);
  const city = LatLngUtils.getCity(coords, department);
  if (department) {
    return {
      ...addr,
      department,
      city
    }
  } else {
    return undefined
  }
}

export const getAddressFromCoordsRemote = async (
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
