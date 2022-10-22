import React, { useEffect, useState } from 'react'
import { Ride } from 'types/models';
import HideIfLoading from 'components/Loading/HideIfLoading';
import RideDetailsInner from './RideDetailsInner';
import { useCallback } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import useCallable from 'hooks/useCallable';

interface RideDetailsWrapperProps {
  route: { params: { rideId: string } }
}

const RideDetails: React.FC<RideDetailsWrapperProps> = ({ route: { params: { rideId } } }) => {
  const [rideWithDetails, setRideWithDetails] = useState<Ride | undefined>(undefined);
  const [isFetchingRide, setIsFetchingRide] = useState(false);
  const navigation = useNavigation<any>();
  const getRide = useCallable<Ride>('/rides/get')

  const handleFetchRide = useCallback(async () => {
    setIsFetchingRide(true);
    try {
      const ride = await getRide({ rideId });
      setRideWithDetails(ride.data);
    } catch (e) {
      crashlytics().recordError(e);
      navigation.goBack();
    }
    setIsFetchingRide(false);
  }, [])

  useEffect(() => {
    handleFetchRide();
  }, [handleFetchRide])

  return (
    <HideIfLoading label="Buscando detalles del viaje" loading={isFetchingRide}>
      {rideWithDetails && <RideDetailsInner ride={rideWithDetails} fetchRideDetails={handleFetchRide} />}
    </HideIfLoading>
  )
}

export default RideDetails;