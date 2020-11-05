import React, { useState } from 'react';
import Wizard from 'components/Wizard/Wizard';
import SelectAddressForm from 'containers/RideOrLift/common/SelectAddressForm';
import { Address } from 'types/models';

interface WhereProps {
  nextScreen: string;
  title?: string;
}

const WhereFrom: React.FC<WhereProps> = ({ nextScreen, title = '¿De donde salis?' }) => {

  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(undefined);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  }

  return (
    <Wizard title={title} nextScreen={nextScreen}>
      <SelectAddressForm selectedAddress={selectedAddress} onSelectAddress={handleSelectAddress} />
    </Wizard>
  )
}

export default WhereFrom;
