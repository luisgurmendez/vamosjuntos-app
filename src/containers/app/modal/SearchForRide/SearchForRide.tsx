import React from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import SearchForRideHeader from './SearchForRideHeader';
import { useSearchForRide } from './useSearchForRide';
import MarginedChildren from 'components/Box/MarginedChildren';
import RideBubble from 'components/Ride/RideBubble';
import { Ride } from 'types/models';
import Screens from '../Screens';
import HideIfLoading from 'components/Loading/HideIfLoading';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';
import { NO_SEARCHED_RIDES_IMG } from 'assets/images';

const SearchForRide: React.FC = () => {

  return (
    <Container>
      <SearchForRideHeader />
      <Rides />
    </Container>
  );
};

export default SearchForRide;

const Container = styled.View`
  flex: 1;
`

const Rides: React.FC = () => {

  const navigation = useNavigation<any>();
  const { searchedRides, isFetchingSearchedRides, hasAlreadyMadeASearch } = useSearchForRide();

  const handleJoinRide = (ride: Ride) => {
    navigation.dangerouslyGetParent().push(Screens.JOIN_RIDE, {
      ride,
      onJoinedToRide: () => navigation.goBack()
    });
  }

  const showConSearchedRidesImg = searchedRides.length === 0 && hasAlreadyMadeASearch

  return (
    <HideIfLoading loading={isFetchingSearchedRides} label="Te estamos buscando viajes">
      <RidesContainer
        showContent={!showConSearchedRidesImg}
        noContentAsset={NO_SEARCHED_RIDES_IMG}
      >
        <MarginedChildren mt="lg">
          {searchedRides.map(ride => <RideBubble key={ride.id} onPress={() => handleJoinRide(ride)} ride={ride} />)}
        </MarginedChildren>
      </RidesContainer>
    </HideIfLoading>
  )
}

// const RidesContainer = styled.ScrollView`
//   flex: 1;
//   padding: 8px;
// `

const RidesContainer = styled(ScrollableContent)`
  padding: 8px;
`