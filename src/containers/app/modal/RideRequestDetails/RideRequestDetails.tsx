import PageWithBack from 'components/Page/PageWithBack';
import React from 'react'
import styled from 'styled-components/native';
import { RideRequest as RideRequestModel, User } from 'types/models';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WhereFromWhereToStaticMap from 'components/Map/WhereFromWhereToStaticMap';
import Header from 'components/Page/Header';

interface RideRequestDetailsProps {
  route: { params: { rideRequest: RideRequestModel, user: User } }
}

const RideRequestDetails: React.FC<RideRequestDetailsProps> = ({ route: { params: { user, rideRequest } } }) => {
  const safeAreaInsets = useSafeAreaInsets();

  console.log(rideRequest);
  return (
    <Container>
      <FloatingHeader style={{ top: safeAreaInsets.top }} showBack title={user.name} />
      <FullHeightWhereFromWhereToMap mapId={`passenger-details-map`} whereFrom={rideRequest.whereFrom} whereTo={rideRequest.whereTo} />
    </Container>
  )
}

export default RideRequestDetails;

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