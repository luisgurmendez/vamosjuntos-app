import TextInput from 'components/TextInput/TextInput';
import { Body } from 'components/Typography/Typography';
import React from 'react';
import { useState } from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import { Addresses, SavedAddress } from 'types/storage';
import { colors } from 'utils/colors';
import Storage from 'storage/Storage';
import { Address } from 'types/models';
import { randomId } from 'utils/factory';

interface SaveAddressProps {
  address: Address;
}

const SaveAddress: React.FC<SaveAddressProps> = ({ address }) => {
  const [saveAddress, setSaveAddress] = useState(false);
  const [addressName, setAddressName] = useState<string | undefined>(undefined);

  const handleSaveAddress = async () => {
    if (addressName !== undefined && address !== undefined && addressName !== '') {
      const addresses = await Storage.getItem<Addresses>(Storage.ADDRESSES);
      if (addresses) {
        const toSavedAddress: SavedAddress = { id: randomId(), name: addressName, address: address };
        addresses.push(toSavedAddress);
        await Storage.setItem(Storage.ADDRESSES, addresses);
      }
    }
  };

  return (
    <SaveAddressContainer>
      <SwitchContainer>
        <MarginedBody>Guardar dirección</MarginedBody>
        <Switch value={saveAddress} onValueChange={setSaveAddress} trackColor={{ true: colors.main, false: '' }} />
      </SwitchContainer>
      {saveAddress && <TextInput onChangeText={setAddressName} onBlur={handleSaveAddress} placeholder="Nombre" />}
    </SaveAddressContainer>
  );
};

export default SaveAddress;

const SaveAddressContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const SwitchContainer = styled.View`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const MarginedBody = styled(Body)`
  margin-right: 12px;
`;
