import { Address } from 'types/models';

export const renderAddressDetails = (address: Address | undefined) => {


  return address ? `${address.department} ${address.city ? `- ${address.city}` : ''}` : '-';
};
