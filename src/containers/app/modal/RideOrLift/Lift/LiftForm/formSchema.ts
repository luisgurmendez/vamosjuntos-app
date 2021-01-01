import { Address } from 'types/models';
import * as Yup from 'yup';
import { address } from '../../common/schema';

export interface LiftCreationValues {
  rideId: string;
  whereFrom: Address | undefined;
  whereTo: Address | undefined;
  date: string;
}

const LiftFormSchema = Yup.object().shape({
  whereFrom: address,
  whereTo: address,
  date: Yup.string().required(),
}).strict(true);

export default LiftFormSchema;