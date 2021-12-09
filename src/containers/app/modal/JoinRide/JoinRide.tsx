import Button from 'components/Button/Button';
import PageWithBack from 'components/Page/PageWithBack';
import ToJoinRideDetails from 'components/ToJoinRideDetails/ToJoinRideDetails';
import React from 'react'
import styled from 'styled-components/native';
import { Ride } from 'types/models';

interface JoinRideProps {
  route: {
    params: {
      ride: Ride
    }
  }
}

const JoinRide: React.FC<JoinRideProps> = ({ route: { params: { ride } } }) => {



  //  const handleCreateRideRequest = async (values: LiftCreationValues) => {
//   try {
//     const rideRequest = await createRideRequest(values.rideId, values.whereFrom!, values.whereTo!);
//     Toaster.success('Se mando tu solicitud de viaje')
//     console.log(rideRequest);
//     rideRequest && dispatch(addRideRequest(rideRequest));
//     navigation.goBack();
//   } catch (e) {
//     Toaster.alert('Hubo un error al intentar unirte al viaje')
//     crashlytics().recordError(e);
//   }
// }


  return (
    <PageWithBack>
      <Container>
        <ScrollingContent contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
          <ToJoinRideDetails ride={ride}/>
        </ScrollingContent>
        <Button>Unirme</Button>
      </Container>
    </PageWithBack>
  )
}

export default JoinRide;

const Container = styled.View`
  padding: 8px;
  flex: 1;
`

const ScrollingContent = styled.ScrollView``;