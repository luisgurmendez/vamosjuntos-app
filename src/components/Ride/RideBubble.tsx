import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import RideDetailsSummary from './RideDetailsSummary';
import { Stylable } from 'components/types';
import { Ride } from 'types/models';
import { colors } from 'utils/colors';
import { Body } from 'components/Typography/Typography';
import Icon from 'react-native-vector-icons/Feather';

interface RideBubbleProps extends Stylable {
  ride: Ride;
  showPriceTag?: boolean;
  showExpiredTag?: boolean;
  onPress?: () => void;
}

const RideBubble: React.FC<RideBubbleProps> = ({
  style,
  ride,
  showExpiredTag = false,
  showPriceTag = false,
  onPress
}) => {

  const hasExpired = useMemo(() => showExpiredTag && (new Date() > new Date(ride.date)), [showExpiredTag, ride.date])

  return (
    <Container onPress={onPress} disabled={onPress === undefined} style={style}>
      {hasExpired && <ExpiredContainer><Icon name={'clock'} size={16} color={colors.danger} /></ExpiredContainer>}
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

const ExpiredContainer = styled.View`
  position: absolute;
  top: 2;
  right: 2;
`