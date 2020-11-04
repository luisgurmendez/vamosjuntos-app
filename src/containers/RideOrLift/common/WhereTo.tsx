import React from 'react';
import Wizard from 'components/Wizard/Wizard';
import SelectAddressForm from 'containers/RideOrLift/common/SelectAddressForm';

interface WhereToProps {
  nextScreen: string;
  title?: string;
}

const WhereTo: React.FC<WhereToProps> = ({ nextScreen, title = '¿A donde vas?' }) => {

  const handleSelectAddress = () => {

  }
  return (
    <Wizard nextScreen={nextScreen} title={title}>
      <SelectAddressForm onSelectAddress={handleSelectAddress} />
    </Wizard>
  )
}

export default WhereTo;
