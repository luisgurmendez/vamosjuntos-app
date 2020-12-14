import WhereFromToWhereTo from 'components/Address/WhereFromToWhereTo';
import { Body, LargeBody, SmallBody } from 'components/Typography/Typography';
import moment from 'moment';
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { Ride } from 'types/models';
import { colors } from 'utils/colors';
import { getDateText, getTimeText } from 'utils/date';

type RideLike = Ride | Pick<Ride, 'whereFrom' | 'whereTo' | 'date'>

interface RideSummaryProps {
  ride: RideLike;
}

const RideDetailsSummary: React.FC<RideSummaryProps> = ({ ride }) => {

  const rideDate = moment(ride.date);

  return (
    <Container>
      <WhereFromToWhereTo whereFrom={ride.whereFrom} whereTo={ride.whereTo} />
      <Body>{getDateText(rideDate)} {getTimeText(rideDate)}</Body>
    </Container>
  )
}

export default RideDetailsSummary;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-vertical: 8px;
  width: 100%;
`