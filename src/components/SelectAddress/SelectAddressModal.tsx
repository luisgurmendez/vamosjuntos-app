import React, { useRef, useState } from 'react';
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
// import useZoomToLocation from 'hooks/useZoomToLocation';
import addressFactory from 'factories/address';
import Map from 'components/Map/Map';
import { Region } from 'react-native-maps';
import { getAddressFromCoords } from 'api/adedo';
import Axios, { CancelTokenSource } from 'axios';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import { getCancelTokenSource } from 'api/api';

interface SelectAddressModalProps {
  open: boolean;
  onClose?: () => void;
  onSelectAddress?: (address: Address) => void;
  mapId?: string;
}


//TODO cant close or select address FIX THIS, check past commits 47412b53a58fbb519fe7b545d3bbf50efb82e3ee
const SelectAddressModal: React.FC<SelectAddressModalProps> = ({
  open,
  onClose,
  onSelectAddress,
  mapId = 'SelectAddressMapId'
}) => {
  const [isMovingMap, setIsMovingMap] = useState(false);
  const [isFetchingAddress, setIsFetchingAddress] = useState(true);
  const [possibleAddress, setPossibleAddress] = useState<Address | undefined>(undefined);
  const cancelTokenSource = useRef<CancelTokenSource | undefined>(undefined);

  // useZoomToLocation(mapId);

  const handleSelectAddress = () => {
    if (possibleAddress) {
      onSelectAddress && onSelectAddress(possibleAddress);
      onClose && onClose();
    }
  };

  const handleLocationChange = async (region: Region) => {
    setIsFetchingAddress(true);
    setIsMovingMap(false);

    if (cancelTokenSource.current !== undefined) {
      console.log('calling cancel token')
      cancelTokenSource.current.cancel();
    }

    const _cancelTokenSource = getCancelTokenSource();
    cancelTokenSource.current = _cancelTokenSource;

    try {
      const address = await getAddressFromCoords(region.latitude, region.longitude, { cancelToken: _cancelTokenSource.token })
      cancelTokenSource.current = undefined;
      setPossibleAddress(address);
      setIsFetchingAddress(false);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setPossibleAddress(undefined);
        setIsFetchingAddress(false);
      }
      console.log(e)
    }

  };

  return (
    <Modal isVisible={open} useNativeDriver={false} coverScreen style={{ margin: 0, zIndex: 100 }} hasBackdrop={false}>
      <Content>
        <CloseContainer>
          <PressableIcon onPress={onClose} size={30} name={'x'} color={colors.black} />
        </CloseContainer>
        <Map style={{ borderWidth: 3 }} onRegionChange={() => setIsMovingMap(true)} onRegionChangeComplete={handleLocationChange} mapId={mapId}>
          <SelectAddressMarker lifted={isMovingMap} />
        </Map>
      </Content>
      <SelectedLocationDisplay>
        <GrayedBody>Arrastra el mapa para colocar el marcador</GrayedBody>
        <Box mt="lg" mb="lg">
          {isFetchingAddress ? (
            <Loading size={20} color={colors.black} />
          ) : (
              <DisplayAddress address={possibleAddress!} />
            )}
        </Box>
        <Button disabled={isFetchingAddress || possibleAddress === undefined} onPress={handleSelectAddress}>
          Elegir
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
  border-width:3px;
`;

const Content = styled.View`
  background-color: white;
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
