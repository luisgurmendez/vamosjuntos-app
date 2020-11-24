import { Body, LargeBody } from 'components/Typography/Typography';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { Address as AddressModel } from 'types/models';
import { renderAddressDetails } from './utils';

interface AddressNameProps {
  name: string;
  address: AddressModel;
}

const AddressName: React.FC<AddressNameProps> = ({ name, address }) => {
  return (
    <Container>
      <LargeBody>{name}</LargeBody>
      <Body>{renderAddressDetails(address)}</Body>
    </Container>
  );
};

export default AddressName;

const Container = styled.View`
  display: flex;
  flex-direction: column;
`;
