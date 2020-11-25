import Shadow from 'components/Shadow/Shadow';
import { Stylable } from 'components/types';
import { Body, Bold } from 'components/Typography/Typography';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface RideRequestNotification extends Stylable { }

const RideRequestNotification: React.FC<RideRequestNotification> = ({ style }) => {

  return (
    <Container style={style}>
      <View style={{ width: 30, height: 30, marginRight: 16, backgroundColor: colors.gray, borderRadius: 15 }} />
      <Body style={{ flex: 1 }}><Bold>Luis Gurmendez</Bold> quiere irse contigo en el viaje de mañana</Body>
    </Container>
  )
}

export default RideRequestNotification;

const Container = styled(Shadow)`
  padding: 8px;
  background-color: ${colors.white};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
