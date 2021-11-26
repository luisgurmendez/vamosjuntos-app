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

interface AppInitialDataFetcherProps { }

const AppInitialDataFetcher: React.FC<AppInitialDataFetcherProps> = ({ children }) => {
  const [fetchingData, setFetchingData] = useState(false);
  const [hasError, setError] = useState(false);
  const dispatch = useDispatch();
  const isFetchingUser = useFetchUser();

  const fetching = fetchingData || isFetchingUser;

  useEffect(() => {
    setFetchingData(true);
    const _notifications = getNotifications();
    const _rides = getRides();
    const _rideRequests = getRideRequests();
    const _featureFlags = getFeatureFlags();
    const _owesReview = getOwesReviews();

    Promise.all([_notifications, _rides, _rideRequests, _featureFlags, _owesReview])
      .then(([notifications, rides, rideRequests, featureFlags, owesReview]) => {
        dispatch(setNotifications(notifications));
        dispatch(setRides(rides));
        dispatch(setRideRequests(rideRequests));
        dispatch(setFeatureFlags(featureFlags));
        dispatch(setOwesReview(owesReview));
      }).catch((e) => {
        crashlytics().log('Failed app initial data fetcher');
        Toaster.alert('Hubo un error');
        console.log(e);
        crashlytics().recordError(e)
        setError(true)
      }).finally(() => {
        setFetchingData(false);
      })

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