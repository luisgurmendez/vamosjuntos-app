import React, { useState } from 'react';
import SelectAddressModal from 'components/SelectAddress/SelectAddressModal';
import Button from 'components/Button/Button';
import { Address } from 'types/models';
import DisplayAddress from 'components/Address/Address';
import SaveAddress from 'components/Address/SaveAddress';
import { Box } from 'components/Box/Box';
import SavedAddressList from 'components/Address/SavedAddressList';
import { Subtitle } from 'components/Typography/Typography';
import Storage from 'storage/Storage';
import styled from 'styled-components/native';
import { SavedAddress } from 'types/storage';
import useGetFromStorage from 'hooks/useGetFromStorage';

interface SelectAddressFormProps {
  onSelectAddress: (address: Address) => void;
  selectedAddress?: Address | undefined;
}

const SelectAddressForm: React.FC<SelectAddressFormProps> = ({ selectedAddress, onSelectAddress }) => {
  const [isNewAddress, setIsNewAddress] = useState(true);
  const [selectAddressOpen, setSelectAddressOpen] = useState(false);
  const [savedAddresses, isGettingSavedAddresses, setSavedAddress] = useGetFromStorage<SavedAddress[]>(
    Storage.ADDRESSES,
    []
  );


  const handleCloseAddressModal = () => {
    console.log('presseddd')
    setSelectAddressOpen(false)
  }

  const handleSelectAddressFromMap = (address: Address) => {
    setIsNewAddress(true);
    onSelectAddress && onSelectAddress(address);
  };

  const handleSelectSavedAddress = (sa: SavedAddress) => {
    setIsNewAddress(false);
    onSelectAddress && onSelectAddress(sa.address);
  };

  const handleRemoveSavedAddress = (address: SavedAddress) => {
    const newAddresses = savedAddresses.filter((sa) => sa.id !== address.id);

    setSavedAddress(newAddresses);
    Storage.setItem(Storage.ADDRESSES, newAddresses);
    // remove from state;
    // remove from storage;
  };

  return (
    <Container>
      <Button icon="map" onPress={() => setSelectAddressOpen(true)} type="secondary">
        Elegir en el mapa
      </Button>
      {selectedAddress && (
        <Box mb="lg" mt="lg">
          <Box mb="md">
            <DisplayAddress address={selectedAddress} />
          </Box>
          {isNewAddress && <SaveAddress address={selectedAddress} />}
        </Box>
      )}
      {savedAddresses.length > 0 && (
        <SavedAddressesContainer mt="lg">
          <Box mb="md">
            <Subtitle>Direcciónes guardadas</Subtitle>
          </Box>
          <SavedAddressList
            savedAddresses={savedAddresses}
            onRemoveAddress={handleRemoveSavedAddress}
            onSelectAddress={handleSelectSavedAddress}
          />
        </SavedAddressesContainer>
      )}
      <SelectAddressModal
        onSelectAddress={handleSelectAddressFromMap}
        onClose={handleCloseAddressModal}
        open={selectAddressOpen}
      />
    </Container>
  );
};

export default SelectAddressForm;

const Container = styled.View`
  flex: 1;
  display: flex;
  margin-bottom: 8px;
`;

const SavedAddressesContainer = styled(Box)`
  flex: 1;
`;
