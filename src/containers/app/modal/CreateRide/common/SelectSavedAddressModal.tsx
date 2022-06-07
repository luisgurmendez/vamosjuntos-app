import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { Subtitle } from 'components/Typography/Typography';
import { Box } from 'components/Box/Box';
import { Address } from 'types/models';
import { SavedAddress } from 'types/storage';
import SavedAddressList from 'components/Address/SavedAddressList';

interface SelectSavedAddressModalProps {
  open: boolean;
  onClose?: () => void;
  onSelectAddress?: (address: Address) => void;
  savedAddresses: SavedAddress[];
}

const SelectSavedAddressModal: React.FC<SelectSavedAddressModalProps> = ({
  open,
  onClose,
  savedAddresses,
  onSelectAddress,
}) => {

  const handleSelectSavedAddress = (sa: SavedAddress) => {
    onSelectAddress && onSelectAddress(sa.address);
    onClose && onClose();
  };


  return (
    <Modal
      isVisible={open}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      useNativeDriver={false}
      style={{ margin: 0, justifyContent: 'flex-end' }}
      hasBackdrop={true}
    >
      {savedAddresses.length > 0 && (
        <Container>
          <Box mb="md">
            <Subtitle>Direcciones guardadas</Subtitle>
          </Box>
          <SavedAddressList
            savedAddresses={savedAddresses}
            onSelectAddress={handleSelectSavedAddress}
          />
        </Container>
      )}
    </Modal>
  );
};

export default SelectSavedAddressModal;

const Container = styled.View`
  height: 75%;
  background-color: white;
  border-top-left-radius: 16px; 
  border-top-right-radius: 16px;
  padding: 16px; 
`;
