import React from 'react';
import Wizard from 'components/Wizard/Wizard';
import SelectAddressForm from 'containers/RideOrLift/common/SelectAddressForm';

interface WhereProps {
  nextScreen: string;
  title?: string;
}

const WhereFrom: React.FC<WhereProps> = ({ nextScreen, title = '¿De donde salis?' }) => {

  const handleSelectAddress = () => { }

  return (
    <Wizard title={title} nextScreen={nextScreen}>
      <SelectAddressForm onSelectAddress={handleSelectAddress} />
    </Wizard>
  )
}

export default WhereFrom;
