import { Body, LargeBody, SmallBody } from 'components/Typography/Typography';
import moment from 'moment';
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { Ride } from 'types/models';
import { colors } from 'utils/colors';
import { getDateText } from 'utils/date';

interface RideSummaryProps {
  ride?: Ride;
}

const RideDetailsSummary: React.FC<RideSummaryProps> = ({ ride }) => {

  return (
    <Container>
      <AddressContainer>
        <AddressDisplay>
          <LargeBody>Maldonado,</LargeBody>
          <Body>Punta del este</Body>
        </AddressDisplay>
        <Icon name="arrow-right" color={colors.main} size={30} />
        <AddressDisplay>
          <LargeBody>Maldonado</LargeBody>
        </AddressDisplay>
      </AddressContainer>
      <Body>{getDateText(moment().add(5, 'days'))} a las 8:00 pm</Body>
    </Container>
  )
}

export default RideDetailsSummary;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-vertical: 8px;
  flex: 1;
`

const AddressDisplay = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
`

const AddressContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
`