import React, { useState } from 'react';
import Wizard from 'components/Wizard/Wizard';
import SelectAddressForm from './SelectAddressForm';
import { Address } from 'types/models';

interface WhereToProps {
  nextScreen: string;
  title?: string;
}

const WhereTo: React.FC<WhereToProps> = ({ nextScreen, title = '¿A donde vas?' }) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(undefined);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  return (
    <Wizard nextScreen={nextScreen} title={title}>
      <SelectAddressForm selectedAddress={selectedAddress} onSelectAddress={handleSelectAddress} />
    </Wizard>
  );
};

export default WhereTo;
