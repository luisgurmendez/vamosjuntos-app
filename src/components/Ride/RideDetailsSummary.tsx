import WhereFromToWhereTo from 'components/Address/WhereFromToWhereTo';
import { Body } from 'components/Typography/Typography';
import moment from 'moment';
import React from 'react'
import styled from 'styled-components/native';
import { Address, Ride } from 'types/models';
import { getDateText, getTimeText } from 'utils/date';

interface RideSummaryProps {
  whereTo: Address;
  whereFrom: Address;
  date: string;
}

const RideDetailsSummary: React.FC<RideSummaryProps> = ({ whereTo, whereFrom, date }) => {

  const rideDate = moment(date);

  return (
    <Container>
      <WhereFromToWhereTo whereFrom={whereFrom} whereTo={whereTo} />
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