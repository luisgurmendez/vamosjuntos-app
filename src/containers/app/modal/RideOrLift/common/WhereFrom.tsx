import React from 'react';
import Wizard from 'components/Wizard/Wizard';
import SelectAddressForm from './SelectAddressForm';
import { useField } from 'formik';
import { Address } from 'types/models';

interface WhereProps {
  nextScreen: string;
  title?: string;
}

const WhereFrom: React.FC<WhereProps> = ({ nextScreen, title = '¿De donde salis?' }) => {
  const [whereFrom, whereFromMeta, whereFromHelpers] = useField<Address>('whereFrom');
  const isFieldValid = whereFromMeta.error === undefined

  return (
    <Wizard action={{ disabled: !isFieldValid }} showBack={false} title={title} nextScreen={nextScreen}>
      <SelectAddressForm addressContext={"Salgo de"} selectedAddress={whereFrom.value} onSelectAddress={whereFromHelpers.setValue} />
    </Wizard>
  );
};

export default WhereFrom;
