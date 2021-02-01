import { Box } from 'components/Box/Box';
import MarginedChildren from 'components/Box/MarginedChildren';
import RideRequest from 'components/RideRequest/RideRequest';
import React from 'react'
import styled from 'styled-components/native';
import { RideRequest as RideRequestModel } from 'types/models';

interface RideRequestsListProps {
  rideRequests: RideRequestModel[];
}

const RideRequestsList: React.FC<RideRequestsListProps> = ({ rideRequests }) => {

  console.log(rideRequests);

  return (
    <Container>
      <Box pb="lg">
        <MarginedChildren mt="md">
          {rideRequests.map(r => (
            <RideRequest key={r.id} rideRequest={r} />
          ))}
        </MarginedChildren>
      </Box>

    </Container>
  )

}

export default RideRequestsList;

const Container = styled.View`

`