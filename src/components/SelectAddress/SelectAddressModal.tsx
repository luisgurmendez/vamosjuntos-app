import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

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
import { getAddressFromCoordsRemote } from 'api/geo';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import FloatingButton from 'components/FloatingButton/FloatingButton';
import { useMap } from 'components/Map/useMap';
import Geolocation from '@react-native-community/geolocation';
import { debounce } from 'ts-debounce';

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
  const { map } = useMap(mapId);

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


  return (
    <Modal isVisible={open} useNativeDriver={false} coverScreen style={{ margin: 0, zIndex: 100 }} hasBackdrop={false}>
      <Content>
        <CloseContainer>
          <PressableIcon onPress={onClose} size={30} name={'x'} color={colors.black} />
        </CloseContainer>
        <Map onRegionChange={() => setIsMovingMap(true)} onRegionChangeComplete={handleLocationChangeWrapper} mapId={mapId}>
          <SelectAddressMarker lifted={isMovingMap} />
          <GoToLocationBtnPositioner>
            <FloatingButton icon={"crosshairs-gps"} onPress={handleGoToUserLocation} />
          </GoToLocationBtnPositioner>
        </Map>
      </Content>
      <SelectedLocationDisplay>
        <GrayedBody>Arrastra el mapa para colocar el marcador</GrayedBody>
        <Box mt="lg" mb="lg">
          {isFetchingAddress ? (
            <Loading size={20} color={colors.black} />
          ) : (
            <DisplayAddress address={possibleAddress} />
          )}
        </Box>
        <Button disabled={isFetchingAddress || possibleAddress === undefined} onPress={handleSelectAddress}>
          {actionButtonText}
        </Button>
      </SelectedLocationDisplay>
    </Modal>
  );
};

export default SelectAddressModal;

const CloseContainer = styled.SafeAreaView`
  position: absolute;
  margin-left: 24px;
  z-index: 10;
`;

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