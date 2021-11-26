import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import MarginedChildren from 'components/Box/MarginedChildren';
import { register, UserRegistrationValues } from 'api/auth';
import Toaster from 'components/Toaster/Toaster';
import crashlytics from '@react-native-firebase/crashlytics';

const RegisterFormSchema = Yup.object().shape({
  email: Yup.string().required('Email requerido'),
  phone: Yup.string()
    .required('Celular requerido')
    .matches(/^[0-9]+$/, "Solo números")
    .test('len', 'Número inválido', val => val ? val.length === 8 : false),
  name: Yup.string().required('Nombre requerido'),
  password: Yup.string().min(8, 'La contraseña debe tener más de 8 caracteres').required('Contraseña requerida'),
  passwordConfirmation: Yup.string()
    .test('passwords-match', 'Las contraseñas deben coincidir', function (value) {
      return this.parent.password === value
    }).required('Contraseña requerida')
});

const RegisterForm: React.FC = () => {
  const initialValues: UserRegistrationValues = {
    email: '',
    name: '',
    phone: '',
    password: '',
    passwordConfirmation: ''
  };

  const handleRegister = async (values: UserRegistrationValues) => {
    try {
      await register({ ...values, phone: `+598${values.phone}` });
    } catch (e) {
      crashlytics().recordError(e);
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
                blurOnSubmit={false} 
                onChangeText={handleChange('password')}
                value={values.password}
              />

              <TextInput
                placeholder="Confirmar contraseña"
                error={errors.passwordConfirmation}
                secureTextEntry
                blurOnSubmit={false} 
                onChangeText={handleChange('passwordConfirmation')}
                value={values.passwordConfirmation}
              />
            </MarginedChildren>

            <Button disabled={isSubmitting || !isValid} loading={isSubmitting} onPress={handleSubmit}>
              Regístrate
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
