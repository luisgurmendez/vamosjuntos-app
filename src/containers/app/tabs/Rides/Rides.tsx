import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { RefreshControl } from 'react-native';
import WithBackgroundImage from 'components/WithBackgroundImage/WithBackgroundImage';
import MarginedChildren from 'components/Box/MarginedChildren';
import RideBubble from 'components/Ride/RideBubble';
import { getSoonToLeaveRides } from 'api/callables';
import useStorage from 'hooks/useStorage';
import Storage from 'storage/Storage';
import { Address, Ride } from 'types/models';
import HideIfLoading from 'components/Loading/HideIfLoading';
import FloatingButton from 'components/FloatingButton/FloatingButton';
import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';

const noSearchedRidesImage = require('../../../../assets/NoSearchedRides.png');

const Rides: React.FC = () => {
  const [isFetchingRides, setIsFetchingRides] = useState(false);
  const [rides, setRides] = useState<Ride[]>([]);
  const hasRides = rides.length > 0;
  const navigation = useNavigation<any>();
  const {isFetching: isFetchingAddresses, value: addresses} = useStorage(Storage.ADDRESSES, []);

  const handleFetchSoonToLeaveRides = useCallback(async () => {
    setIsFetchingRides(true);
    let _rides = [];
    if(addresses.length > 0){
      _rides = await getSoonToLeaveRides({addresses});  
    }else{
      const defaultAddresses = [
      {department: 'Montevideo', city: 'Montevideo'},
      {department: 'Maldonado', city: 'Punta del Este'}
      ] as Address[];

      _rides = await getSoonToLeaveRides({addresses:defaultAddresses});  
    }
    setRides(_rides);
    setIsFetchingRides(false);
  }, [addresses])

  useEffect(() => {
    if(!isFetchingAddresses){
      handleFetchSoonToLeaveRides();
    }
  }, [isFetchingAddresses, handleFetchSoonToLeaveRides]);

  const handleSearchForRide = () => {
    navigation.push(Screens.LIFT);
  }

  const handleJoinRide = (ride: Ride) => {
    navigation.push(Screens.JOIN_RIDE, {ride});
  }

  return (
    <Container>
        <WithBackgroundImage asset={(!isFetchingRides && !hasRides) ? noSearchedRidesImage : undefined}>
          <ScrollingContent
            contentContainerStyle={{paddingBottom: 32}}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={400}
            refreshControl={<RefreshControl onRefresh={handleFetchSoonToLeaveRides} refreshing={isFetchingRides} />}
            >
            <MarginedChildren mt="lg">
              {rides.map(ride => <RideBubble onPress={() => handleJoinRide(ride)} ride={ride} />)}
            </MarginedChildren>
          </ScrollingContent>
        </WithBackgroundImage>
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

const ScrollingContent = styled.ScrollView`
  flex: 1;
  padding: 8px;
`

const SearchButtonPositioner = styled.View`
  position: absolute;
  bottom: 16px;
  right: 16px;
`
