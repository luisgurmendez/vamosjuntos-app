import { Address } from 'types/models';
import * as Yup from 'yup';
import { address } from '../../common/schema';

export interface LiftCreationValues {
  whereFrom: Address | undefined;
  whereTo: Address | undefined;
  capacity: number;
  date: string;
  price: number;
}

const LiftFormSchema = Yup.object().shape({
  whereFrom: address,
  whereTo: address,
  capacity: Yup.number().required(),
  date: Yup.string().required(),
  price: Yup.number().required()
}).strict(true);

export default LiftFormSchema;