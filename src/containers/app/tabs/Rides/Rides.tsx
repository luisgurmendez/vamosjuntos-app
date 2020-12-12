import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';
import React from 'react';
import { useSelector } from 'react-redux';
import { getCompletedRides, getPendingRides } from 'state/ride/selectors';
import styled from 'styled-components/native';
import Page from 'components/Page/Page';
import RidesList from './RidesList';
import NoRides from './NoRides';

const Rides: React.FC = () => {

  const nav: any = useNavigation();
  const pendingRides = useSelector(getPendingRides);
  const completedRides = useSelector(getCompletedRides);

  const hasRides = pendingRides.length > 0 || completedRides.length > 0;

  const handleRidePress = () => {
    console.log(nav);
    nav.navigate(Screens.RIDE);
  }

  return (
    <Page title="Viajes">
      <Container>
        {!hasRides && <NoRides />}
        {hasRides &&
          <>
            <RidesList title="Pendientes" rides={pendingRides} />
            <RidesList title="Completados" rides={completedRides} />
          </>
        }
      </Container>
    </Page>
  );
}


export default Rides;

const Container = styled.ScrollView`
  flex: 1;
  padding: 8px;
`