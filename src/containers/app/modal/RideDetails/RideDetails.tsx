import React, { useEffect, useState } from 'react'
import { Ride } from 'types/models';
import { getRideDetails } from 'api/callables';
import HideIfLoading from 'components/Loading/HideIfLoading';
import RideDetailsInner from './RideDetailsInner';
import { useCallback } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';

interface RideDetailsWrapperProps {
  route: { params: { rideId: string } }
}

const RideDetails: React.FC<RideDetailsWrapperProps> = ({ route: { params: { rideId } } }) => {
  const [rideWithDetails, setRideWithDetails] = useState<Ride | undefined>(undefined);
  const [isFetchingRide, setIsFetchingRide] = useState(false);
  const navigation = useNavigation<any>();

  const handleFetchRide = useCallback(async () => {
    setIsFetchingRide(true);
    try {
      const rideDetails = await getRideDetails(rideId);
      setRideWithDetails(rideDetails);
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