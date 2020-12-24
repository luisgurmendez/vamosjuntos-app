import { getFeatureFlags, getNotifications, getRides } from 'api/adedo';
import HideIfLoading from 'components/Loading/HideIfLoading';
import Toaster from 'components/Toaster/Toaster';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setFeatureFlags } from 'state/featureFlags/actions';
import { setNotifications } from 'state/notification/actions';
import { setRides } from 'state/ride/actions';
import styled from 'styled-components/native';

interface AppInitialDataFetcherProps {
}

const AppInitialDataFetcher: React.FC<AppInitialDataFetcherProps> = ({ children }) => {
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    const notifications = getNotifications();
    const rides = getRides();
    const featureFlags = getFeatureFlags();

    Promise.all([notifications, rides, featureFlags]).then(([notifications, rides, featureFlags]) => {
      dispatch(setNotifications(notifications));
      dispatch(setRides(rides));
      dispatch(setFeatureFlags(featureFlags));
      setFetching(false);
    }).catch(() => {
      setFetching(false);
      Toaster.alert('Hubo un error');
    })

  }, [dispatch])

  return (
    <HideIfLoading loading={fetching}>
      {children}
    </HideIfLoading>
  )

}

export default AppInitialDataFetcher;

const Container = styled.View`

`