import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import MarginedChildren from 'components/Box/MarginedChildren';
import { login, UserRegistrationValues } from 'api/auth';
import Toaster from 'components/Toaster/Toaster';
import crashlytics from '@react-native-firebase/crashlytics';
import UnAuthedHTTPClient from 'components/HTTPClientContext/UnAuthedHttpClient';
import { randomFromList } from 'utils/factory';
import { Linking, Switch } from 'react-native';
import { colors } from 'utils/colors';
import { Body } from 'components/Typography/Typography';
import { Icon, IconProviders } from 'utils/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface PlaceHolderUser {
  name: string;
  email: string;
}

const fakeUserPlaceholders: PlaceHolderUser[] = [
  { name: 'Homero Simpston', email: 'chunkylover53@aol.com' },
  { name: 'Ted Mosby', email: 'tedevelynmosby@gmail.com' },
  { name: 'Michael Scott', email: 'worldsbestboss@gmail.com' },
  { name: 'Ruben Rada', email: 'elnegrorada@gmail.com' },
]

const RegisterFormSchema = Yup.object().shape({
  email: Yup.string().required('Email requerido'),
  phone: Yup.string().optional().matches(/^[0-9]+$/, "Solo números")
    .test('len', 'Número inválido', val => val == undefined || val == null || val === '' || val.length === 8),
  name: Yup.string().required('Nombre requerido'),
  password: Yup.string().min(8, 'La contraseña debe tener más de 8 caracteres').required('Contraseña requerida'),
  passwordConfirmation: Yup.string()
    .test('passwords-match', 'Las contraseñas deben coincidir', function (value) {
      return this.parent.password === value
    }).required('Contraseña requerida'),
});

const RegisterForm: React.FC = () => {

  const fakeUserPlaceholder = useRef(randomFromList(fakeUserPlaceholders));

  const initialValues: UserRegistrationValues = {
    email: '',
    name: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
  };

  const register = useCallback((values: UserRegistrationValues) => {
    const client = new UnAuthedHTTPClient();
    return client.post('/users/register', values);
  }, [])

  const handleRegister = async (values: UserRegistrationValues) => {
    try {
      await register({ ...values, phone: `+598${values.phone}` });
      await login(values.email, values.password);
    } catch (e) {
      crashlytics().recordError(e);
      console.log(e);
      Toaster.alert('Hubo un error creando tu usuario');
    }
  };

  return (
    <Container>
      <Formik validationSchema={RegisterFormSchema} initialValues={initialValues} onSubmit={handleRegister}>
        {({ handleChange, setFieldValue, isSubmitting, handleSubmit, values, errors, isValid }) => (
          <FormContent>
            <MarginedChildren mV="md">
              <TextInput
                label={'Email'}
                required
                placeholder={fakeUserPlaceholder.current.email}
                error={errors.email}
                textContentType="emailAddress"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                value={values.email}
              />

              <TextInput
                label={'Nombre y apellido'}
                required
                placeholder={fakeUserPlaceholder.current.name}
                textContentType="name"
                error={errors.name}
                onChangeText={handleChange('name')}
                value={values.name}
              />

              <TextInput
                label={'Contraseña'}
                required
                placeholder="********"
                textContentType="password"
                error={errors.password}
                secureTextEntry
                blurOnSubmit={false}
                onChangeText={handleChange('password')}
                value={values.password}
              />

              <TextInput
                label={'Confirmar contraseña'}
                required
                placeholder="********"
                error={errors.passwordConfirmation}
                secureTextEntry
                blurOnSubmit={false}
                onChangeText={handleChange('passwordConfirmation')}
                value={values.passwordConfirmation}
              />

              <TextInput
                label='Numero de telefono'
                prefix={'+598'}
                placeholder="12345678"
                textContentType="telephoneNumber"
                keyboardType={"phone-pad"}
                error={errors.phone}
                onChangeText={handleChange('phone')}
                value={values.phone}
              />

            </MarginedChildren>

            <Button analyticsKey={'register'} disabled={isSubmitting || !isValid} loading={isSubmitting} onPress={handleSubmit}>
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
