import React from 'react'
import styled from 'styled-components/native';
import { Box } from 'components/Box/Box';
import MarginedChildren from 'components/Box/MarginedChildren';
import RideBubble from 'components/Ride/RideBubble';
import { Subtitle } from 'components/Typography/Typography';
import { Ride } from 'types/models';

interface RidesListProps {
  rides: Ride[];
  title: string;
}

const RidesList: React.FC<RidesListProps> = ({ rides, title }) => {

  if (rides.length === 0) {
    return null;
  }

  return (
    <Container>
      <Subtitle>{title}</Subtitle>
      <Box pb="lg">
        <MarginedChildren mt="md">
          {rides.map(r => <RideBubble ride={r} />)}
        </MarginedChildren>
      </Box>
    </Container>
  )
}

export default RidesList;

const Container = styled.View``