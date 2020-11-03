import React from 'react';
import Wizard from 'components/Wizard/Wizard';
import SelectAddressForm from 'containers/RideOrLift/common/SelectAddressForm';
import { LiftScreens } from '../LiftScreens';

const WhereTo: React.FC = () => {

  const handleSelectAddress = () => {

  }
  return (
    <Wizard nextScreen={LiftScreens.LIFT_WHERE_FROM} title="¿A donde vas?">
      <SelectAddressForm onSelectAddress={handleSelectAddress} />
    </Wizard>
  )
}

export default WhereTo;
