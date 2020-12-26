import React from 'react'
import styled from 'styled-components/native';
import { Box } from 'components/Box/Box';
import MarginedChildren from 'components/Box/MarginedChildren';
import RideBubble from 'components/Ride/RideBubble';
import { Subtitle } from 'components/Typography/Typography';
import { Ride } from 'types/models';
import { Screens } from 'containers/Screens';
import { useNavigation } from '@react-navigation/native';

interface RidesListProps {
  rides: Ride[];
  title: string;
  onRidePress?: (r: Ride) => void;
}

const RidesList: React.FC<RidesListProps> = ({ onRidePress, rides, title }) => {

  const navigation = useNavigation<any>();

  if (rides.length === 0) {
    return null;
  }

  const handleGoToRideDetails = (ride: Ride) => {
    navigation.push(Screens.RIDE_DETAILS, { rideId: ride.id })
  }

  const handleRidePress = (ride: Ride) => {
    if (onRidePress) {
      onRidePress(ride)
    } else {
      handleGoToRideDetails(ride)
    }
  }

  return (
    <Container>
      <Subtitle>{title}</Subtitle>
      <Box pb="lg">
        <MarginedChildren mt="md">
          {rides.map(r => <RideBubble key={r.id} ride={r} onPress={() => handleRidePress(r)} />)}
        </MarginedChildren>
      </Box>
    </Container>
  )
}

export default RidesList;

const Container = styled.View``