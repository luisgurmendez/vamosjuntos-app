import React from 'react';
import { FlatList } from 'react-native';
import SavedAddressItem from './SavedAddressItem';
import { SavedAddress } from 'types/storage';

interface SavedAddressListProps {
  onSelectAddress?: (address: SavedAddress) => void;
  onRemoveAddress?: (address: SavedAddress) => void;
  savedAddresses?: SavedAddress[];
}

const SavedAddressList: React.FC<SavedAddressListProps> = ({
  savedAddresses,
  onRemoveAddress,
  onSelectAddress
}) => {

  const handleSavedAddressPress = (address: SavedAddress) => {
    onSelectAddress && onSelectAddress(address);
  };

  const handleRemoveAddressItem = (address: SavedAddress) => {
    onRemoveAddress && onRemoveAddress(address);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={savedAddresses}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => (
        <SavedAddressItem
          key={item.address.address}
          onRemove={onRemoveAddress ? () => handleRemoveAddressItem(item) : undefined}
          item={item}
          onPress={onSelectAddress ? () => handleSavedAddressPress(item) : undefined}
        />
      )}
    />
  );
};

export default SavedAddressList;
