import { Address } from "types/models";

export const renderAddressDetails = (address: Address) => {
  return `${address.department} - ${address.city}`
}