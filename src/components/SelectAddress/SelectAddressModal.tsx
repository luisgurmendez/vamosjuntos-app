import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { TouchableOpacity, TextInput as NativeTextInput, ScrollView } from 'react-native';

import { colors } from 'utils/colors';
import SelectAddressMarker from './SelectAddressMarker';
import { Body } from 'components/Typography/Typography';
import Button from 'components/Button/Button';
import DisplayAddress from 'components/Address/Address';
import { Box } from 'components/Box/Box';
import Loading from 'components/Loading/Loading';
import { Address } from 'types/models';
import useZoomToLocation from 'hooks/useZoomToLocation';
import Map from 'components/Map/Map';
import { Region } from 'react-native-maps';
import { useGetAddressFromCoordsRemote } from 'api/geo';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import FloatingButton from 'components/FloatingButton/FloatingButton';
import { useMap } from 'components/Map/useMap';
import Geolocation from '@react-native-community/geolocation';
import { debounce } from 'ts-debounce';
import TextInput from 'components/TextInput/TextInput';
import Icon from 'react-native-vector-icons/Feather';
import DismissKeyboard from 'components/Keyboard/DismissKeyboardView';
import MarginedChildren from 'components/Box/MarginedChildren';
import useCallable from 'hooks/useCallable';
import HideIfLoading from 'components/Loading/HideIfLoading';


const searchAddressPlaceholder = 'Av. Brasil 2818, Montevideo';

interface SelectAddressModalProps {
  open: boolean;
  onClose?: () => void;
  onSelectAddress?: (address: Address) => void;
  mapId?: string;
  actionButtonText?: string;
}

const SelectAddressModal: React.FC<SelectAddressModalProps> = ({
  open,
  onClose,
  onSelectAddress,
  mapId = 'SelectAddressMapId',
  actionButtonText = 'Elegir'
}) => {
  const [isMovingMap, setIsMovingMap] = useState(false);
  const [isFetchingAddress, setIsFetchingAddress] = useState(true);
  const [possibleAddress, setPossibleAddress] = useState<Address | undefined>(undefined);
  const [showSearchAddressScreenContent, setShowSearchAddressScreenContent] = useState(false);
  const { map } = useMap(mapId);
  const getAddressFromCoordsRemote = useGetAddressFromCoordsRemote();

  const handleLocationChange = useCallback(async (region: Region) => {
    const address = await getAddressFromCoordsRemote(region.latitude, region.longitude);
    setPossibleAddress(address);
    setIsFetchingAddress(false);
  }, []);

  const debouncedHandleLocationChange = useCallback(debounce(handleLocationChange, 1000), [])

  useZoomToLocation(mapId);

  const handleSelectAddress = () => {
    if (possibleAddress) {
      onSelectAddress && onSelectAddress(possibleAddress);
      onClose && onClose();
    }
  };

  const handleLocationChangeWrapper = async (region: Region) => {

    if (!isFetchingAddress) {
      setIsFetchingAddress(true);
    }

    if (isMovingMap) {
      setIsMovingMap(false);
    }

    debouncedHandleLocationChange(region);
  };

  const handleGoToUserLocation = () => {
    Geolocation.getCurrentPosition(async (info) => {
      if (map !== null && map !== undefined) {
        map.animateToRegion(
          {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          },
          1000
        );
      }
    });
  }

  const handleSelectSearchedAddress = (address: AddressWithFormatted) => {
    setPossibleAddress(address);
    setShowSearchAddressScreenContent(false);
    setTimeout(() => {
      map.animateToRegion(
        {
          latitude: address.latitude,
          longitude: address.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        },
        1000
      );
    }, 100)
  }

  return (
    <Modal isVisible={open} useNativeDriver={false} coverScreen style={{ margin: 0, zIndex: 100 }} hasBackdrop={false}>
      {showSearchAddressScreenContent &&
        <SelectAddressSearchScreenContent
          onClose={() => setShowSearchAddressScreenContent(false)}
          onAddressSelected={handleSelectSearchedAddress}
        />}
      <>
        <DismissKeyboard>
          <Content>
            <HeaderContainer>
              <PressableClose onPress={onClose} size={30} name={'x'} color={colors.black} />
              <SearchBarButton onPress={() => setShowSearchAddressScreenContent(true)} />
            </HeaderContainer>
            <Map onRegionChange={() => setIsMovingMap(true)} onRegionChangeComplete={handleLocationChangeWrapper} mapId={mapId}>
              <SelectAddressMarker lifted={isMovingMap} />
              <SearchAddressTextInputPositioner>

              </SearchAddressTextInputPositioner>
              <GoToLocationBtnPositioner>
                <FloatingButton icon={"crosshairs-gps"} onPress={handleGoToUserLocation} />
              </GoToLocationBtnPositioner>
            </Map>
          </Content>
        </DismissKeyboard>
        <SelectedLocationDisplay>
          <GrayedBody>Arrastra el mapa para colocar el marcador</GrayedBody>
          <Box mt="lg" mb="lg">
            {isFetchingAddress ? (
              <Loading size={20} color={colors.black} />
            ) : (
              <DisplayAddress address={possibleAddress} />
            )}
          </Box>
          <Button analyticsKey={'address_selected'} disabled={isFetchingAddress || possibleAddress === undefined} onPress={handleSelectAddress}>
            {actionButtonText}
          </Button>
        </SelectedLocationDisplay>
      </>
    </Modal>
  );
};

export default SelectAddressModal;

const HeaderContainer = styled.SafeAreaView`
  position: absolute;
  margin-left: 24px;
  margin-right: 24px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  alignItems: center;
`;

const PressableClose = styled(PressableIcon)`
  marginRight: 12px;
`

const Content = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;

const SelectedLocationDisplay = styled.View`
  width: 100%;
  padding: 16px 24px 24px 24px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  height: 180px;
  justify-content: space-between;
`;

const GrayedBody = styled(Body)`
  color: ${colors.gray};
  width: 100%;
  text-align: center;
`;


const GoToLocationBtnPositioner = styled.View`
  position: absolute;
  bottom: 16px;
  right: 16px;
`

const SearchAddressTextInputPositioner = styled.View`
  position: absolute;
  top: 86px;
  right: 16px;
  left: 16px;
  borderRadius: 16px;
  backgroundColor: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`

interface SearchBarButtonProps {
  onPress: () => void;
}

const SearchBarButton: React.FC<SearchBarButtonProps> = ({ onPress }) => {

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
      <SearchBarButtonContainer>
        <SearchBarRow>
          <Icon name={'search'} size={16} color={colors.black} />
          <PlaceholderText>{searchAddressPlaceholder}</PlaceholderText>
        </SearchBarRow>
      </SearchBarButtonContainer>
    </TouchableOpacity>
  )

}

const PlaceholderText = styled.Text`
  font-size: 16px;
  font-family: Roboto;
  color: #888;
  marginLeft: 8px;
`

const SearchBarRow = styled.View`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const SearchBarButtonContainer = styled.View`
  backgroundColor: white;
  borderRadius: 4px
  flex: 1;
  width: 100%;
  padding: 10px 8px;
  border-radius: 4px;
  color: ${colors.black};
`

interface LatLng {
  lat: number;
  lng: number;
}

interface SelectAddressSearchScreenContentProps {
  onAddressSelected: (address: AddressWithFormatted) => void;
  onClose: () => void;
}

type AddressWithFormatted = Address & { formattedAddress: string };

interface SearchAddressResponse {
  addresses: AddressWithFormatted[]
}

const SelectAddressSearchScreenContent: React.FC<SelectAddressSearchScreenContentProps> = ({ onClose, onAddressSelected }) => {

  const inputRef = useRef<NativeTextInput | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const _handleGetAddresses = useCallable<SearchAddressResponse>('/geo/search');

  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [data, setData] = useState<AddressWithFormatted[]>([]);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (inputRef.current !== null) {
        inputRef.current.focus();
      }
    }, 100)
  }, [inputRef.current])


  const handleGetAddresses = useCallback(async (search: string) => {
    setIsLoading(true);
    try {
      const res = await _handleGetAddresses({ search });
      if (res?.success) {
        res.data.addresses.map(a => ({ a: a['formattedAddress'] }))
        setData(res.data.addresses);
      }
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  }, [setIsLoading, _handleGetAddresses, setData])

  const handleSearchValueChange = useCallback((search: string) => {
    setSearchValue(search);
    debouncedhandleGetAddresses(search);
  }, []);

  const debouncedhandleGetAddresses = useCallback(debounce(handleGetAddresses, 1000), []);

  const handleAddressSelected = (address?: AddressWithFormatted) => async () => {
    if (address) {
      return onAddressSelected(address);
    }
  }

  return (
    <Content style={{ backgroundColor: '#eee', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 100 }}>
      <HeaderContainer style={{ position: 'relative', marginBottom: 8 }}>
        <PressableClose onPress={onClose} size={30} name={'x'} color={colors.black} />
        <TextInput
          ref={inputRef}
          placeholder={searchAddressPlaceholder}
          value={searchValue}
          prefix={<Icon name={'search'} size={16} color={colors.black} />}
          onChangeText={handleSearchValueChange}
          style={{ flex: 1 }}
          textInputContainerStyle={{ backgroundColor: 'white' }}
          textInputStyle={{ backgroundColor: 'white' }}
        />
      </HeaderContainer>
      <ScrollView>
        <HideIfLoading loading={isLoading}>
          <DismissKeyboard>
            <MarginedChildren mt="lg" mH='lg'>
              {data.map(result => (
                <TouchableOpacity onPress={handleAddressSelected(result)}>
                  <FormattedAddressContainer>
                    <Body>{result.formattedAddress}</Body>
                  </FormattedAddressContainer>
                </TouchableOpacity>
              )
              )}
            </MarginedChildren>
          </DismissKeyboard>
        </HideIfLoading>

      </ScrollView>

    </Content>
  )
}

const FormattedAddressContainer = styled.View`
  flex:1;
  padding: 8px 16px;
  backgroundColor: white;
  border-radius: 8px;
`

