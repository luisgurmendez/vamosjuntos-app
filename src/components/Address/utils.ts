import { Address } from 'types/models';

export const renderAddressDetails = (address: Address | undefined) => {
  return address ? `${address.department} ${address.city ? `- ${address.city}` : ''}` : '-';
};

export const getAddressWithoutId = (address: Address): Address => {
  const _addrr: any = { ...address };
  _addrr.id = undefined;
  delete _addrr.id;
  return _addrr as Address;
}