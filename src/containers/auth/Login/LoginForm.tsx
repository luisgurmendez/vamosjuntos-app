import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import MarginedChildren from 'components/Box/MarginedChildren';
import { LoginValues } from './types';

const LoginFormSchema = Yup.object().shape({
  username: Yup.string().required('Usuario requerido'),
  password: Yup.string().required('Contraseña requerida')
});

interface LoginFormProps {
  onSuccessfullLogin: (values: LoginValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccessfullLogin }) => {

  const initialValues: LoginValues = {
    username: '',
    password: ''
  };

  return (
    <Container>
      <Formik<LoginValues> validationSchema={LoginFormSchema} initialValues={initialValues} onSubmit={onSuccessfullLogin}>
        {({ handleChange, isSubmitting, handleSubmit, values, errors }) => (
          <FormContent>
            <MarginedChildren mV="md">
              <TextInput
                placeholder="Usuario"
                error={errors.username}
                textContentType="username"
                autoCapitalize="none"
                onChangeText={handleChange('username')}
                value={values.username}
              />
              <TextInput
                placeholder="Contraseña"
                error={errors.password}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={handleChange('password')}
                value={values.password}
              />
            </MarginedChildren>

            <Button loading={isSubmitting} onPress={handleSubmit}>
              Ingresar
            </Button>
          </FormContent>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;

const Container = styled.View``;

const FormContent = styled.View``;
