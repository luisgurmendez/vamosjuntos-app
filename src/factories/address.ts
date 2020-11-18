import { Factory } from 'fishery';
import { Address } from 'types/models';

export default Factory.define<Address>(({ sequence }) => ({
  address: 'Alejandro Chucarro 1187',
  latitude: -34.933927,
  longitude: -54.942109,
  department: 'Montevideo',
  district: 'Pocitos',
  city: 'Montevideo'
}));

