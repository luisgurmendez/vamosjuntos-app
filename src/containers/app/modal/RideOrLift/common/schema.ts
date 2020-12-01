import * as Yup from 'yup';

export const address = Yup.object().shape({
  department: Yup.string().required(),
  city: Yup.string(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required()
}).required()