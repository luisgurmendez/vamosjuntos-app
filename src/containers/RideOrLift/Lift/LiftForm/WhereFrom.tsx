import React from 'react';
import Wizard from 'components/Wizard/Wizard';
import SelectAddressForm from 'containers/RideOrLift/common/SelectAddressForm';
import { LiftScreens } from '../LiftScreens';

const WhereFrom: React.FC = () => {

  const handleSelectAddress = () => { }

  return (
    <Wizard title="¿De donde salis?" nextScreen={LiftScreens.HOW_MANY}>
      <SelectAddressForm onSelectAddress={handleSelectAddress} />
    </Wizard>
  )
}

export default WhereFrom;
