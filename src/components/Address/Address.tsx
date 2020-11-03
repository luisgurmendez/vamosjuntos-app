import { Body, LargeBody } from 'components/Typography/Typography';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { Address as AddressModel } from 'types/models';
import { colors } from 'utils/colors';
import { renderAddressDetails } from './utils';

interface AddressProps {
  address: AddressModel;
}

const Address: React.FC<AddressProps> = ({ address }) => {

  return (
    <Container>
      <Icon size={20} color={colors.black} name="map-pin" />
      <AddressContainer>
        <LargeBody>{address?.address}</LargeBody>
        <Body>{renderAddressDetails(address)}</Body>
      </AddressContainer>
    </Container>
  )
}

export default Address;

const AddressContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`
