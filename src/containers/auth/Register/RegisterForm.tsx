import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import MarginedChildren from 'components/Box/MarginedChildren';
import { useNavigation } from '@react-navigation/native';
import Screens from './Screens';
import { register, UserRegistrationValues } from 'api/auth';
import { useDispatch } from 'react-redux';
import Storage from 'storage/Storage';
import { setUser } from 'state/user/actions';
import Toaster from 'components/Toaster/Toaster';

const RegisterFormSchema = Yup.object().shape({
  email: Yup.string().required('Campo obligatorio'),
  phone: Yup.string()
    .required('Campo obligatorio')
    .matches(/^[0-9]+$/, "Solo numeros")
    .test('len', 'Numero invalido', val => val ? val.length === 8 : false),
  name: Yup.string().required('Campo obligatorio'),
  password: Yup.string().min(8, 'La contraseña debe tener mas de 8 caracteres').required('Contraseña obligatoria'),
  passwordConfirmation: Yup.string()
    .test('passwords-match', 'Las contraseñas deben coincidir', function (value) {
      return this.parent.password === value
    }).required('Campo obligatorio')
});

const RegisterForm: React.FC = () => {
  const initialValues: UserRegistrationValues = {
    email: '',
    name: '',
    phone: '',
    password: '',
    passwordConfirmation: ''
  };

  const dispatch = useDispatch();

  const handleRegister = async (values: UserRegistrationValues) => {
    try {
      const _u = await register({ ...values, phone: `+598${values.phone}` });
      console.log(_u);
    } catch (e) {
      console.log(e);
      Toaster.alert('Hubo un error creando tu usuario');
    }
  };

  return (
    <Container>
      <Formik validationSchema={RegisterFormSchema} initialValues={initialValues} onSubmit={handleRegister}>
        {({ handleChange, isSubmitting, handleSubmit, values, errors, isValid }) => (
          <FormContent>
            <MarginedChildren mV="md">
              <TextInput
                placeholder="Email"
                error={errors.email}
                textContentType="emailAddress"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                value={values.email}
              />

              <TextInput
                placeholder="Nombre y Apellido"
                textContentType="name"
                error={errors.name}
                onChangeText={handleChange('name')}
                value={values.name}
              />

              <TextInput
                prefix={'+598'}
                placeholder="Celular"
                textContentType="telephoneNumber"
                keyboardType={"phone-pad"}
                error={errors.phone}
                onChangeText={handleChange('phone')}
                value={values.phone}
              />

              <TextInput
                placeholder="Contraseña"
                textContentType="password"
                error={errors.password}
                secureTextEntry
                onChangeText={handleChange('password')}
                value={values.password}
              />

              <TextInput
                placeholder="Confirmar contraseña"
                error={errors.passwordConfirmation}
                secureTextEntry
                onChangeText={handleChange('passwordConfirmation')}
                value={values.passwordConfirmation}
              />
            </MarginedChildren>

            <Button disabled={isSubmitting || !isValid} loading={isSubmitting} onPress={handleSubmit}>
              Registrate
            </Button>
          </FormContent>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterForm;

const Container = styled.View`
  flex: 1;
`;

const FormContent = styled.View``;
