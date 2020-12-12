import { getNotifications, getRides } from 'api/adedo';
import HideIfLoading from 'components/Loading/HideIfLoading';
import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setNotifications } from 'state/notification/actions';
import { setRides } from 'state/ride/actions';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface AppInitialDataFetcherProps {
}

const AppInitialDataFetcher: React.FC<AppInitialDataFetcherProps> = ({ children }) => {
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    const notifications = getNotifications();
    const rides = getRides();

    Promise.all([notifications, rides]).then(([notifications, rides]) => {
      dispatch(setNotifications(notifications));
      dispatch(setRides(rides));
      setFetching(false);
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