import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import MarginedChildren from 'components/Box/MarginedChildren';
import RideBubble from 'components/Ride/RideBubble';
import useStorage from 'hooks/useStorage';
import { Address, Ride } from 'types/models';
import FloatingButton from 'components/FloatingButton/FloatingButton';
import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';
import { SavedAddress } from 'types/storage';
import { NO_SEARCHED_RIDES_IMG } from 'assets/images';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';
import crashlytics from '@react-native-firebase/crashlytics';
import Toaster from 'components/Toaster/Toaster';
import Storage from 'storage/Storage';
import { Animated } from 'react-native';
import { Body, LargeBody } from 'components/Typography/Typography';
import { setHasMadeASearchInStorage } from 'state/storage/thunkActions';
import { useDispatch, useSelector } from 'react-redux';
import useCallable from 'hooks/useCallable';
import analytics from 'utils/analytics';
import ReadTermsAndConditionsModal from './ReadTermsAndConditionsModal';
import { getUser } from 'state/user/selectors';
import remoteConfig from '@react-native-firebase/remote-config';

const Rides: React.FC = () => {
  const [isFetchingRides, setIsFetchingRides] = useState(false);
  const [rides, setRides] = useState<Ride[]>([]);
  const hasRides = rides.length > 0;
  const navigation = useNavigation<any>();
  const [savedAddresses] = useStorage<SavedAddress[]>('addresses');
  const dispatch = useDispatch();
  const getSoonToLeaveRides = useCallable<Ride[]>('/rides/get-soon-to-leave');

  const [showTermsAndConditions, setShowTermsAndConditions] = useTermsAndConditionsModalProps();

  const handleFetchSoonToLeaveRides = useCallback(async () => {
    setIsFetchingRides(true);
    let _rides: Ride[] = [];
    const addresses = savedAddresses.map(sa => sa.address);
    try {
      if (addresses.length > 0) {
        _rides = (await getSoonToLeaveRides({ addresses })).data;
      } else {
        const defaultAddresses = [
          { department: 'Montevideo', city: 'Montevideo' },
          { department: 'Maldonado', city: 'Punta del Este' }
        ] as Address[];

        _rides = ((await getSoonToLeaveRides({ addresses: defaultAddresses })).data);
      }
    } catch (e) {
      crashlytics().recordError(e)
      Toaster.alert('Hubo un error');
    }

    setRides(_rides);
    setIsFetchingRides(false);
  }, [savedAddresses])

  useEffect(() => {
    handleFetchSoonToLeaveRides();
  }, [handleFetchSoonToLeaveRides]);

  const handleSearchForRide = () => {
    dispatch(setHasMadeASearchInStorage(true));
    navigation.push(Screens.SEARCH_FOR_RIDE);
  }

  const handleJoinRide = (ride: Ride) => {
    navigation.push(Screens.JOIN_RIDE, { ride, onJoinedToRide: () => { analytics.logEvent('join_ride_directly') } });
  }

  const renderHelp = () => {
    return (
      <Body>
        En base a tus direcciones guardadas buscamos los viajes que más te puedan servir. Para agregar direcciones, anda a <Body bold>Configuración {'>'} Direcciones guardadas</Body>
      </Body>
    )
  }

  const handleCloseTermsAndConditionsModal = () => {
    setShowTermsAndConditions(false);
  }

  return (
    <Container>
      <PaddedScrollableContent
        showContent={hasRides}
        onRefresh={handleFetchSoonToLeaveRides}
        refreshing={isFetchingRides}
        noContentHelp={renderHelp()}
        noContentAsset={NO_SEARCHED_RIDES_IMG}
      >
        <>
          <LargeBody>¿Te sirve algún viaje de estos?</LargeBody>
          <MarginedChildren mt="lg">
            {rides.map(ride => <RideBubble key={ride.id} onPress={() => handleJoinRide(ride)} ride={ride} />)}
          </MarginedChildren>
        </>
      </PaddedScrollableContent>

      <SearchButtonPositioner>
        <PointingDownIndicator />
        <FloatingButton onPress={handleSearchForRide} size={'lg'} icon={'magnify'} />
      </SearchButtonPositioner>
      <ReadTermsAndConditionsModal open={showTermsAndConditions} onClose={handleCloseTermsAndConditionsModal} />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const PointingDownIndicator: React.FC = () => {
  const [hasMadeASearch] = useStorage(Storage.HAS_MADE_A_SEARCH);
  const animation = useRef(new Animated.Value(0));
  const animationDuration = 800;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation.current, {
          toValue: -16,
          duration: animationDuration,
          useNativeDriver: false,

        }),
        Animated.timing(animation.current, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: false,

        })
      ]),
    ).start();
  }, [animation]);

  if (!hasMadeASearch) {
    return <Animated.View style={{
      position: 'relative',
      transform: [{ translateY: animation.current }],
    }}><Body style={{ fontSize: 32 }}>👇</Body></Animated.View>
  }
  return null;
}

function useTermsAndConditionsModalProps(): [boolean, (b: boolean) => void] {
  const user = useSelector(getUser);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false)

  useEffect(() => {
    if (user) {
      const configs = remoteConfig().getAll();
      const termsLastUpdateDate = new Date(configs['TERMS_AND_CONDITIONS_LAST_UPDATED_DATE'].asString());
      setShowTermsAndConditions(
        user.termsAndConditions === null ||
        new Date(user!.termsAndConditions) < termsLastUpdateDate
      )
    }
  }, [user])

  return [showTermsAndConditions, setShowTermsAndConditions]
}
