import { useNavigation } from '@react-navigation/native';
import { getPossibleRides } from 'api/callables';
import MarginedChildren from 'components/Box/MarginedChildren';
import HideIfLoading from 'components/Loading/HideIfLoading';
import RideBubble from 'components/Ride/RideBubble';
import { Subtitle } from 'components/Typography/Typography';
import Wizard from 'components/Wizard/Wizard';
import { useField, useFormikContext } from 'formik';
import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { Ride } from 'types/models';
import { LiftCreationValues } from './LiftForm/formSchema';
import { LiftScreens } from './LiftScreens';

const PossibleRides: React.FC = () => {

  const [rides, setRides] = useState<Ride[] | undefined>(undefined);
  const navigation = useNavigation<any>();
  const [rideSelect, rideSelectMeta, rideSelectHelpers] = useField<string>('rideId');
  const { values } = useFormikContext<LiftCreationValues>();


  useEffect(() => {
    const asyncCb = async () => {
      try {
        const _rides = await getPossibleRides(values as any);
        setRides(_rides);
      } catch (e) {
        setRides([]);
      }
    }
    asyncCb()

  }, [])

  const handleJoinRide = async (ride: Ride) => {
    rideSelectHelpers.setValue(ride.id, true)
    navigation.push(LiftScreens.JOIN_RIDE, { ride })
  }

  return (
    <Wizard action={{ hideAction: true }} title="Posibles viajes">
      <HideIfLoading loading={rides === undefined} label="Te estamos buscando viajes">
        <Container>
          {
            rides && rides.length > 0 ?
              <Content>
                <MarginedChildren mt="lg">
                  {rides?.map(ride => <RideBubble onPress={() => handleJoinRide(ride)} ride={ride} />)}
                </MarginedChildren>
              </Content>
              :
              <Subtitle>No encontramos viajes que te sirvan :(</Subtitle>
          }
        </Container>
      </HideIfLoading>
    </Wizard>
  )

}

export default PossibleRides;

const Container = styled.ScrollView`
  flex: 1;
  padding-horizontal: 4px;
`

const Content = styled.ScrollView`
  flex: 1;
  overflow: visible;
`