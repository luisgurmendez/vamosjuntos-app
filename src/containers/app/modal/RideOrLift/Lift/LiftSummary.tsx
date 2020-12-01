import Button from 'components/Button/Button';
import { Title } from 'components/Typography/Typography';
import Wizard from 'components/Wizard/Wizard';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { View } from 'react-native';

const LiftSummary: React.FC = () => {

  const { isValid, handleSubmit, validateForm, isSubmitting } = useFormikContext();

  useEffect(() => {
    validateForm()
  }, [])

  return (
    <Wizard action={{ disabled: !isValid, onPress: handleSubmit, label: 'Crear Viaje', loading: isSubmitting }} title="Ultimo paso!">
      <View />
    </Wizard>
  )
};

export default LiftSummary;

const Container = styled.SafeAreaView`


`;
