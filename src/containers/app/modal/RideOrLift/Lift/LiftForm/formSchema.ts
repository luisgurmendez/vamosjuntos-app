import * as Yup from 'yup';
import { address } from '../../common/schema';

const LiftFormSchema = Yup.object().shape({
  whereFrom: address,
  whereTo: address,
  howMany: Yup.number().required(),
  when: Yup.string().required(),
}).strict(true);

export default LiftFormSchema;