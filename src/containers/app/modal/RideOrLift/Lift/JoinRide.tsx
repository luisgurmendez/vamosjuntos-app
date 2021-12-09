import ToJoinRideDetails from 'components/ToJoinRideDetails/ToJoinRideDetails';
import Wizard from 'components/Wizard/Wizard';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react'
import styled from 'styled-components/native';
import { Ride } from 'types/models';
import { LiftCreationValues } from './LiftForm/formSchema';

interface JoinRideProps {
  route: {
    params: {
      ride: Ride
    }
  }
}

const JoinRide: React.FC<JoinRideProps> = ({ route: { params: { ride } } }) => {

  const { isValid, validateForm, handleSubmit, isSubmitting } = useFormikContext<LiftCreationValues>();

  useEffect(() => {
    validateForm();
  }, [])

  return (
    <Wizard action={{ disabled: !isValid, loading: isSubmitting, label: 'Unirme', onPress: handleSubmit }} title="¿Te unís?" >
      <ToJoinRideDetails ride={ride}/>
    </Wizard>
  )

}

export default JoinRide;

const Content = styled.ScrollView`
  flex: 1;
`