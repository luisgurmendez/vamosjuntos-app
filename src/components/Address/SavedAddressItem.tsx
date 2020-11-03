import { Box } from 'components/Box/Box';
import RemovableItem from 'components/RemovableItem/RemovableItem';
import { Body } from 'components/Typography/Typography';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { SavedAddress } from 'types/storage';
import { colors } from 'utils/colors';
import Address from './Address';
import AddressName from './AddressName';

interface SavedAddressItemProps {
  onPress?: () => void;
  item: SavedAddress;
}

const SavedAddressItem: React.FC<SavedAddressItemProps> = ({ item, onPress }) => {

  const handleRemoveItem = () => {
    console.log('removed!')
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <StyledBox pt="md" pb="md">
        <RemovableItem onRemove={handleRemoveItem}>
          <AddressName address={item.address} name={item.name} />
        </RemovableItem>
      </StyledBox>
    </TouchableWithoutFeedback>
  )
}

export default SavedAddressItem;

const StyledBox = styled(Box)`
  borderTopWidth: 1px;
  borderTopColor: ${colors.border};
`