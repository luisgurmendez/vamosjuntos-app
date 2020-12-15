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
import useStorage from 'hooks/useStorage';
import Geolocation from '@react-native-community/geolocation';
import { getAddressFromCoords } from 'api/adedo';

interface SelectAddressFormProps {
  onSelectAddress: (address: Address) => void;
  selectedAddress?: Address | undefined;
}

const SelectAddressForm: React.FC<SelectAddressFormProps> = ({ selectedAddress, onSelectAddress }) => {
  const [selectAddressOpen, setSelectAddressOpen] = useState(false);
  const [savedAddresses, setSavedAddress] = useStorage<SavedAddress[]>(
    Storage.ADDRESSES,
    []
  );

  const handleSelectLocationAsAddress = () => {
    Geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
      const address = await getAddressFromCoords(latitude, longitude);
      onSelectAddress(address);
    });
  }

  const handleCloseAddressModal = () => {
    setSelectAddressOpen(false)
  }

  const handleSelectAddressFromMap = (address: Address) => {
    onSelectAddress && onSelectAddress(address);
  };

  const handleSelectSavedAddress = (sa: SavedAddress) => {
    onSelectAddress && onSelectAddress(sa.address);
  };


  return (
    <Container>
      <Button icon="map" onPress={() => setSelectAddressOpen(true)} type="secondary">
        Elegir en el mapa
      </Button>
      <Box mt="lg" mb="lg">
        <Button icon="map-pin" onPress={handleSelectLocationAsAddress} type="secondary">
          Elegir mi ubicacion
      </Button>
      </Box>
      {selectedAddress && (
        <Box mb="lg" mt="lg">
          <DisplayAddress address={selectedAddress} />
        </Box>
      )}
      {savedAddresses.length > 0 && (
        <SavedAddressesContainer mt="lg">
          <Box mb="md">
            <Subtitle>Direcciónes guardadas</Subtitle>
          </Box>
          <SavedAddressList
            savedAddresses={savedAddresses}
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
