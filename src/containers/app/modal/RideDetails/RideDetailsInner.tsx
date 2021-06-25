import React, { useState } from 'react'
import styled from 'styled-components/native';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import { colors } from 'utils/colors';
import { useNavigation } from '@react-navigation/native';
import { Body, Subtitle } from 'components/Typography/Typography';
import { StatusBar } from 'react-native';
import RideDetailsSummary from 'components/Ride/RideDetailsSummary';
import { Passenger, Ride, RideStatus } from 'types/models';
import { cancelRide, dropOutRide, getRides, setRideCompleted } from 'api/callables';
import PlainButton from 'components/Button/PlainButton';
import { useDispatch, useSelector } from 'react-redux';
import WhereFromWhereToStaticMap from 'components/Map/WhereFromWhereToStaticMap';
import { Box } from 'components/Box/Box';
import Toaster from 'components/Toaster/Toaster';
import { setRides } from 'state/ride/actions';
import { getUser } from 'state/user/selectors';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import ModalWithYesNoActions from 'components/Modal/ModalWithYesNoActions';
import UserCard from 'components/UserCard/UserCard';
import IconedValue from 'components/IconedValue/IconedValue';
import Screens from '../Screens';

interface RideDetailsProps {
  ride: Ride;
}

const RideDetails: React.FC<RideDetailsProps> = ({ ride }) => {

  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] = useState(false);
  const [isConfirmCompleteRideModalOpen, setIsConfirmCompleteRideModalOpen] = useState(false);

  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const isDriver = user && user.id === ride.driver.id;
  const isPassedDate = moment().diff(moment(ride.date)) > 0;

  const mapId = `RideDetails-${ride.id}-map`
  const navigation: any = useNavigation();

  const hasPassengers = ride.passengers.length > 0

  const handleClose = () => {
    navigation.goBack();
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
    navigation.push(Screens.PASSENGER_DETAILS, { passenger: p })
  }

  return (
    <Container>
      <StatusBar hidden />
      <AbsoluteSafeArea mt={'xxlg'}>
        <PositionedPressableIcon onPress={handleClose} name="x" size={30} color={colors.black} />
      </AbsoluteSafeArea>
      <ScrollContent contentContainerStyle={{ paddingBottom: 32 }}>
        <WhereFromWhereToStaticMap mapId={mapId} whereFrom={ride.whereFrom} whereTo={ride.whereTo} />
        <Content>
          <RideDetailsSummary ride={ride} />
          <IconedValue icon="dollar-sign">
            <Body>Se pide una colaboracion de {ride.price}$</Body>
          </IconedValue>
          <Subtitle>Conductor</Subtitle>
          <UserCard user={ride.driver} />
          {hasPassengers &&
            <Box mt="lg">
              <Subtitle>Pasajeros</Subtitle>
              {ride.passengers.map(p =>
                <UserCard
                  key={`passenger-${p.user.id}`}
                  user={p.user}
                  action={isDriver ? () => <PlainButton onPress={() => handleOnPassengerClick(p)}>Ver trayecto</PlainButton> : undefined}
                />)
              }
            </Box>
          }
        </Content>
      </ScrollContent>

      {ride.status === RideStatus.PENDING ?
        <Footer>
          <FooterButton
            textStyle={{ color: colors.danger, fontSize: 20 }}
            onPress={handleCancelRide}
          >
            {isDriver ? 'Cancelar viaje' : 'Bajarme del viaje'}
          </FooterButton>

          {isPassedDate &&
            <FooterButton onPress={handleRideCompleted} textStyle={{ fontSize: 20 }}>
              Completado
            </FooterButton>
          }
        </Footer>
        :
        <Footer>
          {ride.status === RideStatus.CANCELED ?
            <Body style={{ color: colors.danger }}>Cancelado</Body>
            :
            <Body style={{ color: colors.success }}>Completado</Body>
          }
        </Footer>
      }

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

    </Container >
  )
}

export default RideDetails;

const Container = styled.View`
  flex: 1;
  position:relative;
  padding-bottom: 14px;
`

const AbsoluteSafeArea = styled(Box)`
  position: absolute;
  zIndex: 300;
`

const PositionedPressableIcon = styled(PressableIcon)`
  margin-left: 24px;
`

const ScrollContent = styled.ScrollView`
  width: 100%;
  flex: 1;
`

const Content = styled.View`
  padding: 16px; 
`

const Footer = styled(SafeAreaView)`
  display: flex;
  flex-direction: row;
  margin-horizontal: 8px;
  justify-content: center;
`

const FooterButton = styled(PlainButton)`
  flex: 1;
  margin-horizontal: 8px;
`
