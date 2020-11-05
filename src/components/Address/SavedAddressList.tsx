import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import SavedAddressItem from './SavedAddressItem';
import { SavedAddress } from 'types/storage';
import savedAddressFactory from 'factories/savedAddress';

interface SavedAddressListProps {
  onSelectAddress?: (address: SavedAddress) => void;
  onRemoveAddress?: (address: SavedAddress) => void;
  savedAddresses?: SavedAddress[];
}

const SavedAddressList: React.FC<SavedAddressListProps> = ({ savedAddresses = savedAddressFactory.buildList(30), onRemoveAddress, onSelectAddress }) => {

  const handleSavedAddressPress = (address: SavedAddress) => {
    onSelectAddress && onSelectAddress(address)
  }

  const handleRemoveAddressItem = (address: SavedAddress) => {
    onRemoveAddress && onRemoveAddress(address)

  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={savedAddresses}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => <SavedAddressItem key={item.address.address} onRemove={() => handleRemoveAddressItem(item)} item={item} onPress={() => handleSavedAddressPress(item)} />}
    />
  )
}

export default SavedAddressList;
