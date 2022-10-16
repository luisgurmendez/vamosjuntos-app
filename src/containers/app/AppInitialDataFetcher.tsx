import { getFeatureFlags, getNotifications, getOwesReviews, getRideRequests, getRides } from 'api/callables';
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

interface AppInitialDataFetcherProps extends WithChildren { }

const AppInitialDataFetcher: React.FC<AppInitialDataFetcherProps> = ({ children }) => {
  const [fetchingData, setFetchingData] = useState(false);
  const [hasError, setError] = useState(false);
  const dispatch = useDispatch();
  const isFetchingUser = useFetchUser();

  const fetching = fetchingData || isFetchingUser;

  useEffect(() => {
    // setFetchingData(true);

    const handleSetRides = (data: any) => {
      dispatch(setRides(data))
      return data;
    }
    const _rides = getRides().then(handleSetRides)


    const handleSetFeatureFlags = (data: any) => {
      dispatch(setFeatureFlags(data))
      return data;
    }
    const _featureFlags = getFeatureFlags().then(handleSetFeatureFlags)

    const handleSetOwesReview = (data: any) => {
      dispatch(setOwesReview(data))
      return data;
    }
    const _owesReview = getOwesReviews().then(handleSetOwesReview)


    // const handleSetNotifications = (data: any) => {
    //   dispatch(setNotifications(data))
    //   return data;
    // }
    // const _notifications = getNotifications().then(handleSetNotifications);

    // const handleSetRideRequests = (data: any) => {
    //   dispatch(setRideRequests(data))
    //   return data;
    // }
    // const _rideRequests = getRideRequests().then(handleSetRideRequests)

    Promise.all([_rides, _featureFlags, _owesReview,/**   _rideRequests, _notifications*/])
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
    // setFetchingData(false);

  }, [dispatch])

  return (
    <HideIfLoading loading={fetching} label='Buscando tus datos 😉'>
      {children}
    </HideIfLoading>
  )

}

export default AppInitialDataFetcher;

const Container = styled.View`

`