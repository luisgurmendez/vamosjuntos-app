import React, { useState } from 'react';
import SelectAddressModal from 'components/SelectAddress/SelectAddressModal';
import Button from 'components/Button/Button';
import { Address } from 'types/models';
import DisplayAddress from 'components/Address/Address';
import { Box } from 'components/Box/Box';
import { Subtitle } from 'components/Typography/Typography';
import Storage from 'storage/Storage';
import styled from 'styled-components/native';
import { SavedAddress } from 'types/storage';
import useStorage from 'hooks/useStorage';
import Geolocation from '@react-native-community/geolocation';
import { getAddressFromCoordsRemote } from 'api/geo';
import SelectSavedAddressModal from './SelectSavedAddressModal';
import useLocationPermission from 'hooks/useLocationPermission';

interface SelectAddressFormProps {
  onSelectAddress: (address: Address) => void;
  selectedAddress?: Address | undefined;
  addressContext: string;
}

const SelectAddressForm: React.FC<SelectAddressFormProps> = ({ selectedAddress, onSelectAddress, addressContext }) => {
  const [selectAddressOpen, setSelectAddressOpen] = useState(false);
  const [selectSavedAddressOpen, setSelectedSavedAddressOpen] = useState(false);
  const isLocationPermissionGranted = useLocationPermission()
  const { value: savedAddresses } = useStorage<SavedAddress[]>(Storage.ADDRESSES, []);

  const handleSelectLocationAsAddress = () => {
    Geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
        const address = await getAddressFromCoordsRemote(latitude, longitude);
        address !== undefined && onSelectAddress(address);
    });
  }

  const handleCloseAddressModal = () => {
    setSelectAddressOpen(false)
  }

  const handleCloseSelectedSavedAddressModal = () => {
    setSelectedSavedAddressOpen(false)
  }

  const handleSelectAddress = (address: Address) => {
    onSelectAddress && onSelectAddress(address);
  };

  return (
    <Container>
      <Button icon="map" onPress={() => setSelectAddressOpen(true)} type="secondary">
        Elegir en el mapa
      </Button>
      {isLocationPermissionGranted && (
        <Box mt="lg">
          <Button icon="map-pin" onPress={handleSelectLocationAsAddress} type="secondary">
            Elegir mi ubicación
      </Button>
        </Box>
      )}
      {savedAddresses.length > 0 && (
        <Box mt="lg" mb="lg">
          <Button icon="crosshair" onPress={() => setSelectedSavedAddressOpen(true)} type="secondary">
            Elegir de mis direcciónes
      </Button>
        </Box>
      )}
      <Box mb="lg" mt="lg">
        <Box mb="md">
          <Subtitle>{addressContext}</Subtitle>
        </Box>
        <DisplayAddress address={selectedAddress} />
      </Box>
      <SelectAddressModal
        onSelectAddress={handleSelectAddress}
        onClose={handleCloseAddressModal}
        open={selectAddressOpen}
      />
      <SelectSavedAddressModal
        onSelectAddress={handleSelectAddress}
        onClose={handleCloseSelectedSavedAddressModal}
        savedAddresses={savedAddresses}
        open={selectSavedAddressOpen}
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
