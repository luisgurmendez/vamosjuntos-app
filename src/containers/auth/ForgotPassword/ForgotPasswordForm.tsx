import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import { ForgotPasswordValues } from './ForgotPassword';

const ForgotPasswordFormSchema = Yup.object().shape({
  phone: Yup.string().required('Campo Obligatorio'),
});

interface ForgotPasswordFormProps {
  onForgotPassword: (values: ForgotPasswordValues) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ }) => {

  const initialValues: ForgotPasswordValues = {
    phone: '',
  };

  const handleForgotPasswordPress = async (values: any) => {

  };

  return (
    <Container>
      <Formik<ForgotPasswordValues> validationSchema={ForgotPasswordFormSchema} initialValues={initialValues} onSubmit={handleForgotPasswordPress}>
        {({ handleChange, isSubmitting, handleSubmit, values, errors }) => (
          <FormContent>
            <TextInput
              placeholder="Celular"
              error={errors.phone}
              onChangeText={handleChange('phone')}
              value={values.phone}
            />
            <Button loading={isSubmitting} onPress={handleSubmit}>
              Mandar Codigo
            </Button>
          </FormContent>
        )}
      </Formik>
    </Container>
  );
};

export default ForgotPasswordForm;

const Container = styled.View``;

const FormContent = styled.View``;
