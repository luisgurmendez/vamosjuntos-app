import { useNavigation } from '@react-navigation/native';
import WhereFromToWhereTo from 'components/Address/WhereFromToWhereTo';
import PlainButton from 'components/Button/PlainButton';
import IconedValue from 'components/IconedValue/IconedValue';
import WhereFromWhereToStaticMap from 'components/Map/WhereFromWhereToStaticMap';
import { Body } from 'components/Typography/Typography';
import UserCardPlain from 'components/UserCard/UserCardPlain';
import { Screens } from 'containers/Screens';
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Ride } from 'types/models';
import { getDateTimeText } from 'utils/date';

interface ToJoinRideDetailsProps {
  ride: Ride
}

const ToJoinRideDetails: React.FC<ToJoinRideDetailsProps> = ({ ride }) => {

  const navigation = useNavigation<any>();

  const handlePressUser = () => {
    navigation.push(Screens.USER_PROFILE, { user: ride.driver })
  }

  const handleShowMapDetails = () => {
    navigation.push(Screens.WHERE_FROM_WHERE_TO_DETAILS, { whereFrom: ride.whereFrom!, whereTo: ride.whereTo! });
  }

  return (
      <Container>
        <IconedValue icon="map-pin">
          <WhereFromToWhereTo whereFrom={ride.whereFrom!} whereTo={ride.whereTo!} />
        </IconedValue>
        <PlainButton onPress={handleShowMapDetails}>Mostrar en mapa</PlainButton>
        <IconedValue icon="calendar">
          <Body>{getDateTimeText(ride.date)}</Body>
        </IconedValue>
        <IconedValue icon="dollar-sign">
          <Body>Se pide una colaboración de {ride.price}$</Body>
        </IconedValue>
        <IconedValue icon="user">
          <TouchableOpacity onPress={handlePressUser}>
            <UserCardPlain user={ride.driver}></UserCardPlain>
          </TouchableOpacity>
        </IconedValue>
      </Container>
  )

}

export default ToJoinRideDetails;

const Container = styled.View``
