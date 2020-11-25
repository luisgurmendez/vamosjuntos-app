import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from 'utils/colors';
import SelectAddressMarker from './SelectAddressMarker';
import { Body } from 'components/Typography/Typography';
import Button from 'components/Button/Button';
import DisplayAddress from 'components/Address/Address';
import { Box } from 'components/Box/Box';
import Loading from 'components/Loading/Loading';
import { Address } from 'types/models';
import useZoomToLocation from 'hooks/useZoomToLocation';
import addressFactory from 'factories/address';
import Map from 'components/Map/Map';

interface SelectAddressModalProps {
  open: boolean;
  onClose?: () => void;
  onSelectAddress?: (address: Address) => void;
  mapId?: string;
}

const SelectAddressModal: React.FC<SelectAddressModalProps> = ({
  open,
  onClose,
  onSelectAddress,
  mapId = 'SelectAddressMapId'
}) => {
  const [isMovingMap, setIsMovingMap] = useState(false);
  const [isFetchingAddress, setIsFetchingAddress] = useState(true);
  const [possibleAddress, setPossibleAddress] = useState<Address | undefined>(undefined);

  useZoomToLocation(mapId);

  const timeoutRef = useRef<number | null>(null);

  const handleSelectAddress = () => {
    if (possibleAddress) {
      onSelectAddress && onSelectAddress(possibleAddress);
      onClose && onClose();
    }
  };

  const handleLocationChange = () => {
    setIsFetchingAddress(true);
    setIsMovingMap(false);

    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
    timeoutRef.current = (setTimeout(() => {
      const address = addressFactory.build();
      setPossibleAddress(address);
      setIsFetchingAddress(false);
    }, 500) as unknown) as number;
  };

  return (
    <Modal isVisible={open} useNativeDriver={false} coverScreen style={{ margin: 0 }} hasBackdrop={false}>
      <Content>
        <CloseContainer>
          <Icon onPress={onClose} size={30} name={'x'} color={colors.black} />
        </CloseContainer>
        <Map onRegionChange={() => setIsMovingMap(true)} onRegionChangeComplete={handleLocationChange} mapId={mapId}>
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
