import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import SearchForRideHeader from './SearchForRideHeader';
import { useSearchForRide } from './useSearchForRide';
import MarginedChildren from 'components/Box/MarginedChildren';
import RideBubble from 'components/Ride/RideBubble';
import { Address, Ride } from 'types/models';
import Screens from '../Screens';
import HideIfLoading from 'components/Loading/HideIfLoading';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';
import { NO_SEARCHED_RIDES_IMG } from 'assets/images';
import analytics from 'utils/analytics';
import Button from 'components/Button/Button';
import { Icon, IconProviders } from 'utils/icons';
import { colors } from 'utils/colors';
import { Animated } from 'react-native';
import { Body } from 'components/Typography/Typography';
import useCallable from 'hooks/useCallable';

const ANIAMTION_DURATION = 100;

const SearchForRide: React.FC = () => {
  const [animation, handleOnSearchAlarmCreated] = useHandleBellAnimation();
  return (
    <Container>
      <SearchForRideHeader bellRingingAnimation={animation} />
      <Rides onSearchAlarmCreated={handleOnSearchAlarmCreated} />
    </Container>
  );
};

export default SearchForRide;

const Container = styled.View`
  flex: 1;
`

interface CreateSearchAlarmBody {
  whereTo: Address;
  whereFrom: Address;
  date: string;
}

const Rides: React.FC<{ onSearchAlarmCreated: () => void }> = ({ onSearchAlarmCreated }) => {

  const navigation = useNavigation<any>();
  const { searchedRides, isFetchingSearchedRides, origin, destination, date } = useSearchForRide();
  const createAlarm = useCallable('/users/search-ride/create');
  const [isCreatingAlarm, setIsCreatingAlarm] = useState(false);

  const handleJoinRide = (ride: Ride) => {
    navigation.dangerouslyGetParent().push(Screens.JOIN_RIDE, {
      ride,
      whereFromWhereTo: [origin, destination],
      onJoinedToRide: () => {
        navigation.goBack();
        analytics.logEvent('join_ride_through_search');
      }
    });
  }

  const handleCreateSearchAlarm = async () => {
    if (origin !== null && destination !== null) {
      setIsCreatingAlarm(true);
      try {
        await createAlarm<CreateSearchAlarmBody>({
          whereFrom: origin,
          whereTo: destination,
          date: date
        })
        onSearchAlarmCreated();
      } finally {
        setIsCreatingAlarm(false);
      }

    }
  }

  const noContentHelp = () => {
    const hasSetOriginAndDestination = origin !== null && destination !== null;
    return (
      <>
        <Button
          disabled={!hasSetOriginAndDestination}
          onPress={handleCreateSearchAlarm}
          type={'secondary'}
          loading={isCreatingAlarm}
          icon={<Icon style={{ marginRight: 8 }}
            provider={IconProviders.Material}
            name="bell-ring-outline"
            color={!hasSetOriginAndDestination ? colors.white : colors.black}
            size={24}
          />}
        >
          Crear alerta de viaje
        </Button>
        {!hasSetOriginAndDestination && <Body style={{ textAlign: 'center', marginTop: 4 }}>Especificá un origen y un destino</Body>}
      </>
    )
  }

  const showConSearchedRidesImg = searchedRides.length === 0
  return (
    <HideIfLoading loading={isFetchingSearchedRides} label="Te estamos buscando viajes">
      <RidesContainer
        showContent={!showConSearchedRidesImg}
        noContentAsset={NO_SEARCHED_RIDES_IMG}
        noContentHelp={noContentHelp()}
      >
        <MarginedChildren mt="lg">
          {searchedRides.map(ride => <RideBubble key={ride.id} onPress={() => handleJoinRide(ride)} ride={ride} />)}
        </MarginedChildren>
      </RidesContainer>
    </HideIfLoading>
  )
}

const RidesContainer = styled(ScrollableContent)`
  padding: 8px;
`



function useHandleBellAnimation(): [Animated.Value, () => void] {
  const animation = useRef(new Animated.Value(0.5));
  const sequenceAnimation = useRef<Animated.CompositeAnimation | null>(null);
  useEffect(() => {
    sequenceAnimation.current =
      Animated.sequence([
        Animated.timing(animation.current, {
          toValue: 1,
          duration: ANIAMTION_DURATION,
          useNativeDriver: true,

        }),
        Animated.timing(animation.current, {
          toValue: 0,
          duration: ANIAMTION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animation.current, {
          toValue: 1,
          duration: ANIAMTION_DURATION,
          useNativeDriver: true,

        }),
        Animated.timing(animation.current, {
          toValue: 0,
          duration: ANIAMTION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animation.current, {
          toValue: 1,
          duration: ANIAMTION_DURATION,
          useNativeDriver: true,

        }),
        Animated.timing(animation.current, {
          toValue: 0,
          duration: ANIAMTION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animation.current, {
          toValue: 1,
          duration: ANIAMTION_DURATION,
          useNativeDriver: true,

        }),
        Animated.timing(animation.current, {
          toValue: 0,
          duration: ANIAMTION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animation.current, {
          toValue: 0.5,
          duration: ANIAMTION_DURATION,
          useNativeDriver: true,
        }),
      ]);
  }, [])

  const handleOnSearchAlarmCreated = () => {
    sequenceAnimation.current?.start(() => {
      sequenceAnimation.current?.reset();
    });
  }

  return [animation.current, handleOnSearchAlarmCreated];

}