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

  return (
    <TouchableOpacity onPress={onPress}>
      <Box pt="md" pb="md">
        <RemovableItem onRemove={onRemove}>
          <AddressName address={item.address} name={item.name} />
        </RemovableItem>
      </Box>
    </TouchableOpacity>
  );
};

export default SavedAddressItem;
