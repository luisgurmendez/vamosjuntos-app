import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Page/Header';
import Button from 'components/Button/Button';
import useLocationPermission from 'hooks/useLocationPermission';
import { SavedAddress } from 'types/storage';
import useStorage from 'hooks/useStorage';
import Storage from 'storage/Storage';
import SelectAddressModal from 'components/SelectAddress/SelectAddressModal';
import { Address } from 'types/models';
import { Box } from 'components/Box/Box';
import { LargeBody } from 'components/Typography/Typography';
import Geolocation from '@react-native-community/geolocation';
import { getAddressFromCoordsRemote } from 'api/geo';
import SavedAddressList from 'components/Address/SavedAddressList';

interface WhereFromWhereToProps {
  route: { params: { onSelectAddress?: (add: Address) => void } }
}

const WhereFromWhereTo: React.FC<WhereFromWhereToProps> = ({ route: { params: { onSelectAddress } } }) => {
  const [selectAddressOpen, setSelectAddressOpen] = useState(false);
  const isLocationPermissionGranted = useLocationPermission()
  const { value: savedAddresses } = useStorage<SavedAddress[]>(Storage.ADDRESSES, []);
  const navigation = useNavigation<any>();

  const handleOpenSelectAddressModal = () => {
    setSelectAddressOpen(true);
  }

  const handleCloseAddressModal = () => {
    setSelectAddressOpen(false);
  }

  const handleSelectAddress = (address: Address) => {
    onSelectAddress && onSelectAddress(address);
    navigation.goBack();
  }

  const handleSelectLocationAsAddress = () => {
    Geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
        const address = await getAddressFromCoordsRemote(latitude, longitude);
        address !== undefined && handleSelectAddress(address);
        
    });
  }

  return (
      <Container>
        <Header showBack>title</Header>
        <Content>
          <Button icon="map" onPress={handleOpenSelectAddressModal} type="secondary">
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
              <LargeBody>Elegir de mis direcciones</LargeBody>
              <SavedAddressList
                savedAddresses={savedAddresses}
                onSelectAddress={(sa:SavedAddress)=>handleSelectAddress(sa.address)}
              />
            </Box>
          )}
        </Content>
      <SelectAddressModal
        onSelectAddress={handleSelectAddress}
        onClose={handleCloseAddressModal}
        open={selectAddressOpen}
      />
      </Container>
  );
};

export default WhereFromWhereTo;

const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0px 16px;
`

const Content = styled.View`
  padding: 16px;
  flex: 1;
`