import { Box } from 'components/Box/Box';
import RemovableItem from 'components/RemovableItem/RemovableItem';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { SavedAddress } from 'types/storage';
import { colors } from 'utils/colors';
import AddressName from './AddressName';

interface SavedAddressItemProps {
  onPress?: () => void;
  onRemove?: () => void;
  item: SavedAddress;
}

const SavedAddressItem: React.FC<SavedAddressItemProps> = ({ item, onRemove, onPress }) => {

  const handleRemoveItem = () => {
    onRemove && onRemove();
  }

  const handlePress = () => {
    onPress && onPress();
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <StyledBox pt="md" pb="md">
        <RemovableItem onRemove={handleRemoveItem}>
          <AddressName address={item.address} name={item.name} />
        </RemovableItem>
      </StyledBox>
    </TouchableOpacity>
  )
}

export default SavedAddressItem;

const StyledBox = styled(Box)`
  borderTopWidth: 1px;
  borderTopColor: ${colors.border};
`