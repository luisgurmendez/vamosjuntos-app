import React from 'react'
import styled from 'styled-components/native';
import { Address, RideRequest as RideRequestModel, User } from 'types/models';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WhereFromWhereToStaticMap from 'components/Map/WhereFromWhereToStaticMap';
import Header from 'components/Page/Header';

interface WhereFromWhereToDetailsProps {
  route: { params: { whereFrom: Address, whereTo: Address, title?:string } }
}

const WhereFromWhereToDetails: React.FC<WhereFromWhereToDetailsProps> = ({ route: { params: { whereFrom, whereTo, title } } }) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <Container>
      <FloatingHeader style={{ top: safeAreaInsets.top }} showBack title={title} />
      <FullHeightWhereFromWhereToMap mapId={`whereFrom-whereTo-details-map`} whereFrom={whereFrom} whereTo={whereTo} />
    </Container>
  )
}

export default WhereFromWhereToDetails;

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