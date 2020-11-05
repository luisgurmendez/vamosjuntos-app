import { Factory } from 'fishery';
import { SavedAddress } from 'types/storage';
import { randomId } from 'utils/factory';
import addressFactory from './address';

export default Factory.define<SavedAddress>(({ sequence }) => ({
  address: addressFactory.build(),
  name: 'Casa',
  id: randomId()
}));

