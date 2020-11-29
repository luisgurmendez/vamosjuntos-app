import { useNavigation } from '@react-navigation/native';
import MarginedChildren from 'components/Box/MarginedChildren';
import Ride from 'components/Ride/Ride';
import { Subtitle } from 'components/Typography/Typography';
import { Screens } from 'containers/Screens';
import React from 'react';
import styled from 'styled-components/native';
import Page from '../commons/Page';

const Rides: React.FC = () => {

  const nav: any = useNavigation();

  const handleRidePress = () => {
    console.log(nav);
    nav.navigate(Screens.RIDE);
  }

  return (
    <Page title="Viajes">
      <Container>
        <Subtitle>Pendientes</Subtitle>
        <MarginedChildren mt="md">
          <Ride onPress={handleRidePress} id="1" />
          <Ride id="2" />
          <Ride id="3" />
          <Ride id="4" />
          <Ride id="5" />
        </MarginedChildren>
      </Container>
    </Page>
  );
}



export default Rides;

const Container = styled.ScrollView`
  flex: 1;
  padding: 8px;
`