import PageWithBack from 'components/Page/PageWithBack';
import React from 'react'
import styled from 'styled-components/native';
import { RideRequest as RideRequestModel } from 'types/models';

interface RideRequestDetailsProps {
  route: { params: { rideRequest: RideRequestModel } }
}

const RideRequestDetails: React.FC<RideRequestDetailsProps> = ({ route: { params: { rideRequest } } }) => {

  console.log(rideRequest);
  return (
    <PageWithBack>

    </PageWithBack>
  )
}

export default RideRequestDetails;

