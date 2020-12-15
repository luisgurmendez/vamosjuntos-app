import { getPossibleRides } from 'api/adedo';
import MarginedChildren from 'components/Box/MarginedChildren';
import HideIfLoading from 'components/Loading/HideIfLoading';
import Loading from 'components/Loading/Loading';
import RideBubble from 'components/Ride/RideBubble';
import { Subtitle } from 'components/Typography/Typography';
import Wizard from 'components/Wizard/Wizard';
import { useFormikContext } from 'formik';
import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { Ride } from 'types/models';
import { colors } from 'utils/colors';
import { LiftCreationValues } from './LiftForm/formSchema';

interface JoinRideProps {
}

const JoinRide: React.FC<JoinRideProps> = ({ }) => {

  const [rides, setRides] = useState<Ride[] | undefined>(undefined);

  const { isValid, handleSubmit, validateForm, isSubmitting, values, errors } = useFormikContext<LiftCreationValues>();

  useEffect(() => {
    validateForm()
  }, [])

  useEffect(() => {
    const asyncCb = async () => {
      console.log(isValid)
      if (isValid) {
        const _rides = await getPossibleRides(values as any);
        setRides(_rides);
      }
    }
    asyncCb()

  }, [isValid])


  return (
    <Wizard action={{ hideAction: true }} title="Posibles viajes">
      <HideIfLoading loading={rides === undefined} label="Te estamos buscnado viajes">
        {
          rides && rides.length > 0 ?
            <Content>
              <MarginedChildren mt="lg">
                {rides?.map(ride => <RideBubble ride={ride} />)}
              </MarginedChildren>
            </Content>
            :
            <Subtitle>No encontramos viajes que te sirvan :(</Subtitle>
        }

      </HideIfLoading>
    </Wizard>
  )

}

export default JoinRide;

const Content = styled.ScrollView`
  flex: 1;
  overflow: visible;
`