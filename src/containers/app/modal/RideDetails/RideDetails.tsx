import React, { useEffect, useState } from 'react'
import { Ride } from 'types/models';
import { getRideDetails } from 'api/callables';
import HideIfLoading from 'components/Loading/HideIfLoading';
import RideDetailsInner from './RideDetailsInner';

interface RideDetailsWrapperProps {
  route: { params: { rideId: string } }
}

const RideDetails: React.FC<RideDetailsWrapperProps> = ({ route: { params: { rideId } } }) => {
  const [rideWithDetails, setRideWithDetails] = useState<Ride | undefined>(undefined);
  const [isFetchingRide, setIsFetchingRide] = useState(false);

  useEffect(() => {
    const asyncEffect = async () => {
      setIsFetchingRide(true);
      try {
        const rideDetails = await getRideDetails(rideId);
        setRideWithDetails(rideDetails);
      } catch (e) { }
      setIsFetchingRide(false);
    }
    asyncEffect();
  }, [])

  return (
    <HideIfLoading loading={isFetchingRide}>
      {rideWithDetails && <RideDetailsInner ride={rideWithDetails} />}
    </HideIfLoading>
  )
}

export default RideDetails;