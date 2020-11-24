import { login } from 'api/adedo';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import Toaster from 'components/Toaster/Toaster';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import Storage from 'storage/Storage';
import MarginedChildren from 'components/Box/MarginedChildren';

const RegisterFormSchema = Yup.object().shape({
  username: Yup.string().required('Username required'),
  password: Yup.string().required('Password required')
});

const RegisterForm: React.FC = () => {
  const initialValues = {
    username: '',
    password: ''
  };

  const handleRegister = async (values: any) => {};

  return (
    <Container>
      <Formik validationSchema={RegisterFormSchema} initialValues={initialValues} onSubmit={handleRegister}>
        {({ handleChange, isSubmitting, handleSubmit, values, errors }) => (
          <FormContent>
            <MarginedChildren mV="md">
              <TextInput
                error={errors.username}
                textContentType="username"
                onChangeText={handleChange('username')}
                value={values.username}
              />

              <TextInput
                error={errors.password}
                secureTextEntry
                onChangeText={handleChange('password')}
                value={values.password}
              />
            </MarginedChildren>

            <Button loading={isSubmitting} onPress={handleSubmit}>
              Login
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
