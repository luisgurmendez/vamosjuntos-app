import React from 'react';
import Wizard from 'components/Wizard/Wizard';
import SelectAddressForm from './SelectAddressForm';
import { useField } from 'formik';
import { Address } from 'types/models';

interface WhereToProps {
  nextScreen: string;
  title?: string;
}

const WhereTo: React.FC<WhereToProps> = ({ nextScreen, title = '¿A donde vas?' }) => {
  const [whereTo, whereToMeta, whereToHelpers] = useField<Address>('whereTo');
  const isFieldValid = whereToMeta.error === undefined

  return (
    <Wizard action={{ disabled: !isFieldValid }} nextScreen={nextScreen} title={title}>
      <SelectAddressForm addressContext={"Voy a"} selectedAddress={whereTo.value} onSelectAddress={whereToHelpers.setValue} />
    </Wizard>
  );
};

export default WhereTo;
