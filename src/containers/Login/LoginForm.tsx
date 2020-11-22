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

const LoginFormSchema = Yup.object().shape({
  username: Yup.string().required('Username required'),
  password: Yup.string().required('Password required')
})

const LoginForm: React.FC = () => {

  const initialValues = {
    username: '',
    password: ''
  }

  const handleLogin = async (values: any) => {
    try {
      const tokens = await login(values.username, values.password);
      await Storage.setItem(Storage.TOKENS, tokens);
      Toaster.info({ message: tokens?.token })
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container>
      <Formik
        validationSchema={LoginFormSchema}
        initialValues={initialValues}
        onSubmit={handleLogin}
      >
        {({ handleChange, isSubmitting, handleSubmit, values, errors, }) => (
          <FormContent>
            <MarginedChildren mV="md">
              <TextInput
                error={errors["username"]}
                textContentType="username"
                onChangeText={handleChange('username')}
                value={values.username}
              />

              <TextInput
                error={errors["password"]}
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
  )
}

export default LoginForm;

const Container = styled.View``

const FormContent = styled.View``