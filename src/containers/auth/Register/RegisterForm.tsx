import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import MarginedChildren from 'components/Box/MarginedChildren';

const RegisterFormSchema = Yup.object().shape({
  username: Yup.string().required('Campo obligatorio'),
  ci: Yup.string().required('Campo obligatorio'), //TODO validate Cedula
  phone: Yup.string().required('Campo obligatorio'),
  name: Yup.string().required('Campo obligatorio'),
  password: Yup.string().min(8, 'La contraseña debe tener mas de 8 caracteres').required('Contraseña obligatoria'),
  passwordConfirmation: Yup.string()
    .test('passwords-match', 'Las contraseñas deben coincidir', function (value) {
      return this.parent.password === value
    }).required('Campo obligatorio')
});

const RegisterForm: React.FC = () => {
  const initialValues = {
    username: '',
    ci: '',
    phone: '',
    name: '',
    password: '',
    passwordConfirmation: ''
  };

  const handleRegister = async (values: any) => { };

  return (
    <Container>
      <Formik validationSchema={RegisterFormSchema} initialValues={initialValues} onSubmit={handleRegister}>
        {({ handleChange, isSubmitting, handleSubmit, values, errors }) => (
          <FormContent>
            <MarginedChildren mV="md">

              <TextInput
                placeholder="Usuario"
                error={errors.username}
                textContentType="username"
                onChangeText={handleChange('username')}
                value={values.username}
              />

              <TextInput
                placeholder="Nombre"
                error={errors.name}
                onChangeText={handleChange('name')}
                value={values.name}
              />

              <TextInput
                placeholder="Cedula. ej. 1.111.111-1"
                error={errors.ci}
                onChangeText={handleChange('ci')}
                value={values.ci}
              />

              <TextInput
                placeholder="Celular"
                keyboardType={"phone-pad"}
                error={errors.phone}
                onChangeText={handleChange('phone')}
                value={values.phone}
              />

              <TextInput
                placeholder="Contraseña"
                error={errors.password}
                secureTextEntry
                onChangeText={handleChange('password')}
                value={values.password}
              />

              <TextInput
                placeholder="Confirmar contraseña"
                error={errors.passwordConfirmation}
                onChangeText={handleChange('passwordConfirmation')}
                value={values.passwordConfirmation}
              />
            </MarginedChildren>

            <Button loading={isSubmitting} onPress={handleSubmit}>
              Registrate
            </Button>
          </FormContent>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterForm;

const Container = styled.View``;

const FormContent = styled.View``;
