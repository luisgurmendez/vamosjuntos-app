import React from 'react';
import styled from 'styled-components/native';
import Shadow from 'components/Shadow/Shadow';
import RideDetailsSummary from './RideDetailsSummary';
import { Stylable } from 'components/types';
import { Ride } from 'types/models';

interface RideBubbleProps extends Stylable {
  onPress?: () => void;
  ride: Ride;
}

const RideBubble: React.FC<RideBubbleProps> = ({ style, ride, onPress }) => {

  return (
    <Shadow>
      <Container onPress={onPress} style={style}>
        <RideDetailsSummary ride={ride} />
      </Container>
    </Shadow>
  );
}

export default RideBubble;

const Container = styled.TouchableOpacity`
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  background-color: white;
`