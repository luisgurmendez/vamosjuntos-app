import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import { colors } from 'utils/colors';
import { useNavigation } from '@react-navigation/native';
import { Body, Subtitle } from 'components/Typography/Typography';
import { StatusBar } from 'react-native';
import RideDetailsSummary from 'components/Ride/RideDetailsSummary';
import { Passenger, Ride, RideStatus } from 'types/models';
import { cancelRide, dropOutRide, getRides, kickPassenger, setRideCompleted } from 'api/callables';
import { useDispatch, useSelector } from 'react-redux';
import WhereFromWhereToStaticMap from 'components/Map/WhereFromWhereToStaticMap';
import { Box } from 'components/Box/Box';
import Toaster from 'components/Toaster/Toaster';
import { setRides } from 'state/ride/actions';
import { getUser } from 'state/user/selectors';
import ModalWithYesNoActions from 'components/Modal/ModalWithYesNoActions';
import UserCard from 'components/UserCard/UserCard';
import IconedValue from 'components/IconedValue/IconedValue';
import Screens from '../Screens';
import PassengerCard from './PassengerCard';
import RideFooter from './RideDetailsFooter'
import crashlytics from '@react-native-firebase/crashlytics';
import Badge from 'components/Badge/Badge';

interface RideDetailsProps {
  ride: Ride;
  fetchRideDetails: () => void;
}

const RideDetails: React.FC<RideDetailsProps> = ({ ride, fetchRideDetails }) => {

  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] = useState(false);
  const [isConfirmCompleteRideModalOpen, setIsConfirmCompleteRideModalOpen] = useState(false);
  const [toBeKickedPassenger, setToBeKickedPassenger] = useState<Passenger | null>(null);
  const isConfirmKickPassengerModalOpen = toBeKickedPassenger !== null;
  useRedirectBackIfUserNotOnRide(ride);

  const handleCloseKickPassengerModal = () => {
    setToBeKickedPassenger(null)
  }

  const handleConfirmKickPassenger = async (passengerId: string) => {

    try {
      await kickPassenger(passengerId);
      await updateRides()
      handleCloseKickPassengerModal();
      fetchRideDetails();
    } catch (e) {
      console.log(e);
      crashlytics().recordError(e);
      Toaster.alert('Hubo un error')
    }
  }


  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const isDriver = user !== undefined && user.id === ride.driver.id;

  const mapId = `RideDetails-${ride.id}-map`
  const navigation: any = useNavigation();

  const hasPassengers = ride.passengers.length > 0

  const handleClose = () => {
    navigation.goBack();
  }

  const handleNavigateToConversation = () => {
    navigation.push(Screens.RIDE_CONVERSATION);
  }

  const updateRides = async () => {
    const rides = await getRides()
    dispatch(setRides(rides))
  }

  const handleConfirmCancelRide = async () => {
    try {
      if (isDriver) {
        await cancelRide(ride.id);
      } else {
        await dropOutRide(ride.id);
      }
      await updateRides()
      handleCancelConfirmModal();
      handleClose();
    } catch (e) {
      crashlytics().recordError(e);
      Toaster.alert('Hubo un error')
    }
  }

  const handleRideCompleted = async () => {
    setIsConfirmCompleteRideModalOpen(true)
  }

  const handleCancelRide = () => {
    setIsConfirmCancelModalOpen(true)
  }

  const handleConfirmCompleteRideModal = () => {
    setIsConfirmCompleteRideModalOpen(false)
  }

  const handleConfirmCompleteRide = async () => {
    await setRideCompleted(ride.id);
    await updateRides();
    handleClose();
  }

  const handleCancelConfirmModal = () => { setIsConfirmCancelModalOpen(false) };

  const handleOnPassengerClick = (p: Passenger) => {
    navigation.push(Screens.WHERE_FROM_WHERE_TO_DETAILS, { title: p.user.name, whereFrom: p.whereFrom, whereTo: p.whereTo })
  }

  return (
    <Container>
      <StatusBar hidden />
      <AbsoluteSafeArea mt={'xxlg'}>
        <PressableIcon onPress={handleClose} name="x" size={30} color={colors.black} />
        <Badge badge={3}>
          <PressableIcon onPress={handleNavigateToConversation} name="message-circle" size={30} color={colors.black} />
        </Badge>
      </AbsoluteSafeArea>
      <ScrollContent contentContainerStyle={{ paddingBottom: 8 }}>
        <WhereFromWhereToStaticMap mapId={mapId} whereFrom={ride.whereFrom} whereTo={ride.whereTo} />
        <Content>
          <RideDetailsSummary ride={ride} />
          <IconedValue icon="dollar-sign">
            <Body>Se pide una colaboración de {ride.price}$</Body>
          </IconedValue>
          <Subtitle>Conductor</Subtitle>
          <UserCard user={ride.driver} />
          {hasPassengers &&
            <Box mt="lg">
              <Subtitle>Pasajeros</Subtitle>
              {ride.passengers.map(p =>
                <PassengerCard
                  key={`passenger-${p.user.id}`}
                  passenger={p}
                  onActionPress={(isDriver && ride.status === RideStatus.PENDING) ? () => setToBeKickedPassenger(p) : undefined}
                  onTrajectoryPress={isDriver ? () => handleOnPassengerClick(p) : undefined}
                />
              )
              }
            </Box>
          }
        </Content>
      </ScrollContent>

      <RideFooter ride={ride} onCancelRide={handleCancelRide} onCompleteRide={handleRideCompleted} />

      <ModalWithYesNoActions
        open={isConfirmCompleteRideModalOpen}
        onClose={handleConfirmCompleteRideModal}
        onConfirm={handleConfirmCompleteRide}
        title={'¿Estas seguro que este viaje ya se completo?'}
      />

      <ModalWithYesNoActions
        open={isConfirmCancelModalOpen}
        onClose={handleCancelConfirmModal}
        onConfirm={handleConfirmCancelRide}
        title={isDriver ? '¿Estas seguro que queres cancelar el viaje?' : '¿Estas seguro que queres bajarte del viaje?'}
      />

      <ModalWithYesNoActions
        open={isConfirmKickPassengerModalOpen}
        onClose={handleCloseKickPassengerModal}
        onConfirm={() => handleConfirmKickPassenger(toBeKickedPassenger?.id || '')}
        title={`¿Estas seguro que queres sacar a ${toBeKickedPassenger?.user.name} del viaje?`}
      />

    </Container>
  )
}

export default RideDetails;

function useIsUserOnRide(ride: Ride) {
  const user = useSelector(getUser);
  const isPassenger = user !== undefined && ride.passengers.map(p => p.user.id).includes(user!.id);
  const isDriver = user && user.id === ride.driver.id;
  return isPassenger || isDriver;
}

function useRedirectBackIfUserNotOnRide(ride: Ride) {
  const isUserOnRide = useIsUserOnRide(ride);
  const navigation = useNavigation<any>();
  useEffect(() => {
    if (!isUserOnRide) {
      navigation.goBack();
      Toaster.alert('¡No formas parte de este viaje!')
    }
  }, [isUserOnRide])
}

const Container = styled.View`
  flex: 1;
  position:relative;
  padding-bottom: 14px;
`

const AbsoluteSafeArea = styled(Box)`
  position: absolute;
  left:16px;
  right:16px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  zIndex: 300;
`

const ScrollContent = styled.ScrollView`
  width: 100%;
  flex: 1;
`

const Content = styled.View`
  padding: 16px; 
`
