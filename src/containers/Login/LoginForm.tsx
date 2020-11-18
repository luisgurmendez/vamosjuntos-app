import { login } from 'api/adedo';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import Toaster from 'components/Toaster/Toaster';
import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import * as Yup from 'yup';

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
    console.log('loginn')
    try {
      const tokens = await login(values.username, values.password);
      console.log(tokens);
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
          <Border>
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
            <Button loading={isSubmitting} onPress={handleSubmit} >
              Login
            </Button>
          </Border>
        )}
      </Formik>
    </Container>
  )
}

export default LoginForm;


const Container = styled.View`
`

const Border = styled.View`
  borderWidth: 1px;
  borderColor: red;
  display: flex;
  flexDirection:column;
`