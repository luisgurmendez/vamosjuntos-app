import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import Storage from 'storage/Storage';
import SavedAddressItem from './SavedAddressItem';
import savedAddressFactory from 'factories/savedAddress';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { SavedAddress } from 'types/storage';

interface Address { }

interface SavedAddressListProps {
  onSelectAddress?: (address: Address) => void;
}

const SavedAddressList: React.FC<SavedAddressListProps> = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [fetchingAddresses, setFetchingAddresses] = useState(false);

  useEffect(() => {
    const getAddresses = async () => {
      setFetchingAddresses(true)
      const addresses = await Storage.getItem<Address[]>('addresses');
      if (addresses) {
        setAddresses(addresses)
      }
      setFetchingAddresses(true)
    }

    getAddresses();

  }, [])

  const handleSavedAddressPress = () => {
    console.log('clicked!')
  }

  const savedAddress = savedAddressFactory.buildList(100);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={savedAddress}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => <SavedAddressItem key={item.address.address} item={item} onPress={handleSavedAddressPress} />}
    />
  )
}

export default SavedAddressList;
