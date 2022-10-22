import { getFeatureFlags } from 'api/callables';
import HideIfLoading from 'components/Loading/HideIfLoading';
import Toaster from 'components/Toaster/Toaster';
import React, { useEffect, useState } from 'react'
import { setFeatureFlags } from 'state/featureFlags/actions';
import { setNotifications } from 'state/notification/actions';
import { setRideRequests, setRides } from 'state/ride/actions';
import { setOwesReview } from 'state/user/actions';
import styled from 'styled-components/native';
import crashlytics from '@react-native-firebase/crashlytics';
import { useDispatch } from 'react-redux';
import useFetchUser from 'hooks/useFetchUser';
import { WithChildren } from 'components/types';
import useCallable, { CallableResponse } from 'hooks/useCallable';
import { Notification, Passenger, Ride, RideRequest } from 'types/models';

interface AppInitialDataFetcherProps extends WithChildren { }

const AppInitialDataFetcher: React.FC<AppInitialDataFetcherProps> = ({ children }) => {
  const [fetchingData, setFetchingData] = useState(false);
  const [hasError, setError] = useState(false);
  const dispatch = useDispatch();
  const isFetchingUser = useFetchUser();
  const getRides = useCallable<Ride[]>('/rides/get-all');
  const getRideRequests = useCallable<RideRequest[]>('/ride-requests/get-all')
  const getNotifications = useCallable<Notification[]>('/notifications/get')
  const getOwesReviews = useCallable<Passenger | undefined>('/reviews/owes')

  const fetching = fetchingData || isFetchingUser;

  useEffect(() => {
    setFetchingData(true);

    const handleSetRides = (response: CallableResponse<Ride[]>) => {
      dispatch(setRides(response?.data ?? []))
      return response?.data;
    }
    const _rides = getRides().then(handleSetRides);

    const handleSetFeatureFlags = (data: any) => {
      dispatch(setFeatureFlags(data))
      return data;
    }

    getFeatureFlags().then(handleSetFeatureFlags)

    const handleSetOwesReview = (res: CallableResponse<Passenger | undefined>) => {
      dispatch(setOwesReview(res.data))
      return res;
    }
    const _owesReview = getOwesReviews().then(handleSetOwesReview)


    const handleSetNotifications = (response: CallableResponse<Notification[]>) => {
      dispatch(setNotifications(response.data))
      return response.data;
    }
    const _notifications = getNotifications().then(handleSetNotifications);

    const handleSetRideRequests = (response: CallableResponse<RideRequest[]>) => {
      dispatch(setRideRequests(response.data))
      return response.data;
    }
    const _rideRequests = getRideRequests().then(handleSetRideRequests)

    Promise.all([_rides, _owesReview, _rideRequests, _notifications])
      .catch((e) => {
        crashlytics().log('Failed app initial data fetcher');
        Toaster.alert('Hubo un error');
        console.log(e.message);
        console.log(e);
        crashlytics().recordError(e)
        setError(true)
      }).finally(() => {
        setFetchingData(false);
      })

  }, [dispatch, getRides, getRideRequests, getNotifications, getOwesReviews])

  return (
    <HideIfLoading loading={fetching} label='Buscando tus datos 😉'>
      {children}
    </HideIfLoading>
  )

}

export default AppInitialDataFetcher;

const Container = styled.View`

`