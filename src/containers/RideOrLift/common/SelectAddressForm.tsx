import React, { useState } from 'react';
import SelectAddressModal from 'components/SelectAddress/SelectAddressModal';
import Button from 'components/Button/Button';
import { Address } from 'types/models';
import DisplayAddress from 'components/Address/Address';
import SaveAddress from 'components/Address/SaveAddress';
import { Box } from 'components/Box/Box';
import SavedAddressList from 'components/Address/SavedAddressList';
import { Subtitle } from 'components/Typography/Typography';
import { View } from 'react-native';
import styled from 'styled-components/native';

interface SelectAddressFormProps {
  onSelectAddress: (address?: Address) => void;
}

const SelectAddressForm: React.FC<SelectAddressFormProps> = () => {

  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(undefined);
  const [selectAddressOpen, setSelectAddressOpen] = useState(false);

  return (
    <Container>
      <Button icon="map" onPress={() => setSelectAddressOpen(true)} type="secondary">Elegir en el mapa</Button>
      {selectedAddress &&
        <Box mb="lg" mt="lg">
          <Box mb="md">
            <DisplayAddress address={selectedAddress} />
          </Box>
          <SaveAddress />
        </Box>
      }
      <SavedAddressesContainer mt="lg">
        <Box mb="md">
          <Subtitle>
            Direcciónes guardadas
        </Subtitle>
        </Box>
        <SavedAddressList />
      </SavedAddressesContainer>
      <SelectAddressModal onSelectAddress={setSelectedAddress} onClose={() => setSelectAddressOpen(false)} open={selectAddressOpen} />
    </Container>
  )
}

export default SelectAddressForm;

const Container = styled.View`
  flex: 1;
  display: flex;
  margin-bottom: 8px;
`

const SavedAddressesContainer = styled(Box)`
  flex: 1;
`