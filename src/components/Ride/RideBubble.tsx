import React from 'react';
import styled from 'styled-components/native';
import Shadow from 'components/Shadow/Shadow';
import RideDetailsSummary from './RideDetailsSummary';
import { Stylable } from 'components/types';
import { Ride } from 'types/models';
import { colors } from 'utils/colors';

interface RideBubbleProps extends Stylable {
  ride: Ride;
  showPriceTag?: boolean;
  onPress?: () => void;
}

const RideBubble: React.FC<RideBubbleProps> = ({ style, ride, showPriceTag = false, onPress }) => {

  return (
    <Container onPress={onPress} disabled={onPress === undefined} style={style}>
      <RideDetailsSummary ride={ride} />
    </Container>
  );
}

export default RideBubble;

const Container = styled.TouchableOpacity`
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  background-color: ${colors.white};
`
