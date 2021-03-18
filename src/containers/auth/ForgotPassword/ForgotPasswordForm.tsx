import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import { ForgotPasswordValues } from './types';
import { forgotPassword } from 'api/auth';
import Toaster from 'components/Toaster/Toaster';
import { Box } from 'components/Box/Box';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().required('Campo Obligatorio'),
});

interface ForgotPasswordFormProps { }

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ }) => {

  const navigation = useNavigation<any>();

  const initialValues: ForgotPasswordValues = {
    email: '',
  };

  const handleForgotPasswordPress = async (values: ForgotPasswordValues) => {
    try {
      await forgotPassword(values.email);
      navigation.goBack();
      Toaster.success({
        message: 'Te mandamos un mail para que puedas resetear tu contraseña, esta vez no te la olvides 🙂'
      })
    } catch (e) {
      Toaster.alert({ message: '¿Escribiste bien el mail?' })
    }
  };

  return (
    <Container>
      <Formik<ForgotPasswordValues> validationSchema={ForgotPasswordFormSchema} initialValues={initialValues} onSubmit={handleForgotPasswordPress}>
        {({ handleChange, isSubmitting, handleSubmit, values, errors }) => (
          <FormContent>
            <Box mt="xlg" mb="xlg">
              <TextInput
                placeholder="Email"
                error={errors.email}
                onChangeText={handleChange('email')}
                value={values.email}
                textContentType="emailAddress"
                autoCapitalize="none"
              />
            </Box>
            <Button loading={isSubmitting} onPress={handleSubmit}>
              Mandar mail
            </Button>
          </FormContent>
        )}
      </Formik>
    </Container>
  );
};

export default ForgotPasswordForm;

const Container = styled.View`
  flex: 1;
`;

const FormContent = styled.View``;
