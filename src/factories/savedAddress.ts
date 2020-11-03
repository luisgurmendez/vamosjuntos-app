import { Factory } from 'fishery';
import { SavedAddress } from 'types/storage';
import addressFactory from './address';

export default Factory.define<SavedAddress>(({ sequence }) => ({
  address: addressFactory.build(),
  name: 'Casa'
}));

