import WhereFromWhereToStaticMap from 'components/Map/WhereFromWhereToStaticMap';
import Header from 'components/Page/Header';
import PageWithBack from 'components/Page/PageWithBack';
import React from 'react'
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Passenger } from 'types/models';

interface RideRequestDetailsProps {
  route: { params: { passenger: Passenger } }
}

const PassengerDetails: React.FC<RideRequestDetailsProps> = ({ route: { params: { passenger } } }) => {

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <Container>
      <FloatingHeader style={{ top: safeAreaInsets.top }} showBack title={passenger.user.name} />
      <FullHeightWhereFromWhereToMap mapId={`passenger-details-map`} whereFrom={passenger.whereFrom} whereTo={passenger.whereTo} />
    </Container>
  )
}

export default PassengerDetails;

const Container = styled.View`
  position: relative;
  flex: 1;
`

const FloatingHeader = styled(Header)`
  position: absolute;
  top: 0px;
`

const FullHeightWhereFromWhereToMap = styled(WhereFromWhereToStaticMap)`
  flex: 1;
  height :100%;
`