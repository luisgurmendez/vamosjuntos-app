import { useNavigation } from '@react-navigation/native';
import WhereFromToWhereTo from 'components/Address/WhereFromToWhereTo';
import IconedValue from 'components/IconedValue/IconedValue';
import WhereFromWhereToStaticMap from 'components/Map/WhereFromWhereToStaticMap';
import { Body } from 'components/Typography/Typography';
import UserCardPlain from 'components/UserCard/UserCardPlain';
import Wizard from 'components/Wizard/Wizard';
import { Screens } from 'containers/Screens';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Ride } from 'types/models';
import { getDateTimeText } from 'utils/date';
import { LiftCreationValues } from './LiftForm/formSchema';

interface JoinRideProps {
  route: {
    params: {
      ride: Ride
    }
  }
}

const JoinRide: React.FC<JoinRideProps> = ({ route: { params: { ride } } }) => {

  const { isValid, errors, validateForm, handleSubmit, isSubmitting } = useFormikContext<LiftCreationValues>();

  const navigation = useNavigation<any>();

  const handlePressUser = () => {
    navigation.push(Screens.USER_PROFILE, { user: ride.driver })
  }

  useEffect(() => {
    validateForm();
  }, [])

  return (
    <Wizard action={{ disabled: !isValid, loading: isSubmitting, label: 'Unirme', onPress: handleSubmit }} title="¿Te unis?" >
      <Content>
        <IconedValue icon="map-pin">
          <WhereFromToWhereTo whereFrom={ride.whereFrom!} whereTo={ride.whereTo!} />
        </IconedValue>
        <WhereFromWhereToStaticMap style={{ height: 150 }} whereFrom={ride.whereFrom!} whereTo={ride.whereTo!} mapId={"ride-summary-map"} />
        <IconedValue icon="calendar">
          <Body>{getDateTimeText(ride.date)}</Body>
        </IconedValue>
        <IconedValue icon="dollar-sign">
          <Body>Se pide una colaboracion de {ride.price}$</Body>
        </IconedValue>
        <IconedValue icon="user">
          <TouchableOpacity onPress={handlePressUser}>
            <UserCardPlain user={ride.driver}></UserCardPlain>
          </TouchableOpacity>
        </IconedValue>
      </Content>
    </Wizard>
  )

}

export default JoinRide;

const Content = styled.ScrollView`
  flex: 1;
`