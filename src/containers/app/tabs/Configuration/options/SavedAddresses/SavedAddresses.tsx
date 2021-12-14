import PageWithBack from 'components/Page/PageWithBack';
import SelectAddressModal from 'components/SelectAddress/SelectAddressModal';
import { Body, Subtitle } from 'components/Typography/Typography';
import React, { useState } from 'react'
import styled from 'styled-components/native';
import Storage from 'storage/Storage';
import useStorage from 'hooks/useStorage';
import { SavedAddress } from 'types/storage';
import HideIfLoading from 'components/Loading/HideIfLoading';
import { colors } from 'utils/colors';
import { Box } from 'components/Box/Box';
import SavedAddressList from 'components/Address/SavedAddressList';
import PlainButton from 'components/Button/PlainButton';
import { Address } from 'types/models';
import DisplayAddress from 'components/Address/Address';
import TextInput from 'components/TextInput/TextInput';
import Button from 'components/Button/Button';
import { randomId } from 'utils/factory';
import KeyboardShift from 'components/Keyboard/KeyboardShift';

interface SavedAddressesProps {
}

const SavedAddresses: React.FC<SavedAddressesProps> = ({ }) => {

  const [selectAddressModalOpen, setSelectAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(undefined)
  const [addressName, setAddressName] = useState<string | undefined>(undefined);
  const { value: savedAddresses, setValue: setSavedAddress, isFetching: isGettingSavedAddresses } = useStorage<SavedAddress[]>(
    Storage.ADDRESSES,
    []
  );

  const handleSaveNewAddress = () => {
    const toSavedAddress: SavedAddress = { id: randomId(), name: addressName!, address: selectedAddress! };
    const newVals = [...savedAddresses];
    newVals.push(toSavedAddress);
    // Set in Storage
    setSavedAddress(newVals)

    setAddressName(undefined);
    setSelectedAddress(undefined);
  }


  const handleRemoveSavedAddress = (address: SavedAddress) => {
    const clonedAddrs = [...savedAddresses];
    const newAddresses = clonedAddrs.filter((sa) => sa.id !== address.id);
    // Sets in Storage
    setSavedAddress(newAddresses);
  };

  return (
    <PageWithBack secondaryAction={<PlainButton onPress={() => setSelectAddressModalOpen(true)}>Agregar una dirección</PlainButton>}>
      <HideIfLoading loading={isGettingSavedAddresses} label="Obteniendo tus direcciones">
        <Container>
          <KeyboardShift>
            {
              selectedAddress &&
              <>
                <Body>Nueva dirección</Body>
                <Box mt="lg" mb="lg">
                  <DisplayAddress address={selectedAddress} />
                </Box>
                <Box mb="lg">
                  <TextInput onChangeText={setAddressName} placeholder="Nombre" />
                </Box>
                <Button
                  disabled={addressName === undefined || addressName === ''}
                  onPress={handleSaveNewAddress}
                >
                  Guardar
              </Button>
              </>
            }
            <SavedAddressesContainer mt="lg">
              <Box mb="md">
                <Subtitle>Direcciones guardadas</Subtitle>
              </Box>
              <SavedAddressList
                savedAddresses={savedAddresses}
                onRemoveAddress={handleRemoveSavedAddress}
              />
            </SavedAddressesContainer>
          </KeyboardShift>
        </Container>

      </HideIfLoading>

      <SelectAddressModal
        onSelectAddress={setSelectedAddress}
        onClose={() => setSelectAddressModalOpen(false)}
        open={selectAddressModalOpen}
      />
    </PageWithBack>
  )

}

export default SavedAddresses;

const Container = styled.View`
  padding: 16px;
  flex: 1;
`
const SavedAddressesContainer = styled(Box)`
  flex: 1 1 auto;
`;
