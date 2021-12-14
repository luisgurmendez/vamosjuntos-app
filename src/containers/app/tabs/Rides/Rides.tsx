import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import MarginedChildren from 'components/Box/MarginedChildren';
import RideBubble from 'components/Ride/RideBubble';
import { getSoonToLeaveRides } from 'api/callables';
import useStorage from 'hooks/useStorage';
import Storage from 'storage/Storage';
import { Address, Ride } from 'types/models';
import FloatingButton from 'components/FloatingButton/FloatingButton';
import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';
import { Body } from 'components/Typography/Typography';
import { SavedAddress } from 'types/storage';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';

const noRidesFoundImage = require('../../../../assets/NoRidesFound.png');


// TODO: fix double fetch on screen load. (this is because of asyn storage, and isFetchingAddress not true immediately)
const Rides: React.FC = () => {
  const [isFetchingRides, setIsFetchingRides] = useState(false);
  const [rides, setRides] = useState<Ride[]>([]);
  const hasRides = rides.length > 0;
  const navigation = useNavigation<any>();
  const { isFetching: isFetchingAddresses, value: savedAddresses } = useStorage<SavedAddress[]>(Storage.ADDRESSES, []);

  const handleFetchSoonToLeaveRides = useCallback(async () => {
    setIsFetchingRides(true);
    let _rides: any = [];
    const addresses = savedAddresses.map(sa => sa.address);
    if (addresses.length > 0) {
      _rides = await getSoonToLeaveRides({ addresses });
    } else {
      const defaultAddresses = [
        { department: 'Montevideo', city: 'Montevideo' },
        { department: 'Maldonado', city: 'Punta del Este' }
      ] as Address[];

      _rides = await getSoonToLeaveRides({ addresses: defaultAddresses });
    }
    setRides(_rides);
    setIsFetchingRides(false);
  }, [savedAddresses])

  useEffect(() => {
    if (!isFetchingAddresses) {
      handleFetchSoonToLeaveRides();
    }
  }, [isFetchingAddresses, handleFetchSoonToLeaveRides]);

  const handleSearchForRide = () => {
    navigation.push(Screens.SEARCH_FOR_RIDE);
  }

  const handleJoinRide = (ride: Ride) => {
    navigation.push(Screens.JOIN_RIDE, { ride });
  }

  const renderHelp = () => {
    return (
      <Body>
        En base a tus direcciones guardadas buscamos los viajes que más te puedan servir. Para agregar direcciones, anda a <BoldBody>Configuración {'>'} Direcciones guardadas</BoldBody>
      </Body>
    )
  }

  return (
    <Container>
      <PaddedScrollableContent
        showContent={hasRides}
        onRefresh={handleFetchSoonToLeaveRides}
        refreshing={isFetchingRides}
        noContentHelp={renderHelp()}
        noContentAsset={noRidesFoundImage}
      >
        <MarginedChildren mt="lg">
          {rides.map(ride => <RideBubble onPress={() => handleJoinRide(ride)} ride={ride} />)}
        </MarginedChildren>
      </PaddedScrollableContent>

      <SearchButtonPositioner>
        <FloatingButton onPress={handleSearchForRide} size={'lg'} icon={'magnify'} />
      </SearchButtonPositioner>
    </Container>
  );
}

export default Rides;

const Container = styled.View`
  flex: 1;
`

const PaddedScrollableContent = styled(ScrollableContent)`
  padding: 8px;
`

const SearchButtonPositioner = styled.View`
  position: absolute;
  bottom: 16px;
  right: 16px;
`

const BoldBody = styled(Body)`
  font-weight: bold;
`