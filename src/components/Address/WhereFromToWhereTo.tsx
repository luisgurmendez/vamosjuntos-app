import { Body, LargeBody } from 'components/Typography/Typography';
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { Address } from 'types/models';
import { colors } from 'utils/colors';

interface WhereFromToWhereToProps {
  whereFrom: Address;
  whereTo: Address;
}

const WhereFromToWhereTo: React.FC<WhereFromToWhereToProps> = ({ whereFrom, whereTo }) => {

  return (
    <Container>
      <AddressContainer>
        <AddressDisplay>
          <LargeBody>{whereFrom.department}</LargeBody>
          {whereFrom.city && <Body>{whereFrom.city}</Body>}
        </AddressDisplay>
        <Icon name="arrow-right" color={colors.main} size={30} />
        <AddressDisplay>
          <LargeBody>{whereTo.department}</LargeBody>
          {whereTo.city && <Body>{whereTo.city}</Body>}
        </AddressDisplay>
      </AddressContainer>
    </Container>
  )

}

export default WhereFromToWhereTo;

const Container = styled.View`
  width: 100%;
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
  align-items: center;
`