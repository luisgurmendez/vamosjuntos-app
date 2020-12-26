import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import { colors } from 'utils/colors';
import { useNavigation } from '@react-navigation/native';
import { Subtitle } from 'components/Typography/Typography';
import { StatusBar } from 'react-native';
import RideDetailsSummary from 'components/Ride/RideDetailsSummary';
import { Ride, RideStatus } from 'types/models';
import UserInRide from './UserInRide';
import { cancelRide, dropOutRide, getRideDetails, getRides, setRideCompleted } from 'api/adedo';
import HideIfLoading from 'components/Loading/HideIfLoading';
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
  const navigation = useNavigation();

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
          <Subtitle>Conductor</Subtitle>
          <UserInRide user={ride.driver} />
          {hasPassengers &&
            <Box mt="lg">
              <Subtitle>Pasageros</Subtitle>
              {ride.passengers.map(p => <UserInRide key={`passenger-${p.user.id}`} user={p.user} />)}
            </Box>
          }
        </Content>
      </ScrollContent>

      {ride.status === RideStatus.PENDING &&
        <Footer>
          <FooterButton
            textStyle={{ color: colors.danger, fontSize: 20 }}
            onPress={handleCancelRide}
          >
            {isDriver ? 'Cancelar Viaje' : 'Bajarme del viaje'}
          </FooterButton>

          {isPassedDate &&
            <FooterButton onPress={handleRideCompleted} textStyle={{ fontSize: 20 }}>
              Completado
          </FooterButton>
          }
        </Footer>
      }

      <ModalWithYesNoActions
        open={isConfirmCompleteRideModalOpen}
        onClose={handleConfirmCompleteRideModal}
        onConfirm={handleConfirmCompleteRide}
        title={'¿Esta seguro que este viaje ya se completo?'}
      />

      <ModalWithYesNoActions
        open={isConfirmCancelModalOpen}
        onClose={handleCancelConfirmModal}
        onConfirm={handleConfirmCancelRide}
        title={isDriver ? '¿Esta seguro que quiere cancel el viaje?' : '?Esta seguro que quiere darse de baja del viaje?'}
      />

    </Container >
  )
}

const Container = styled.View`
  flex: 1;
  background-color: white;
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
`

const FooterButton = styled(PlainButton)`
  flex: 1;
  margin-horizontal: 8px;
`

interface RideDetailsWrapperProps {
  route: { params: { rideId: string } }
}

const RideDetailsWrapper: React.FC<RideDetailsWrapperProps> = ({ route: { params: { rideId } } }) => {
  const [rideWithDetails, setRideWithDetails] = useState<Ride | undefined>(undefined);
  const [isFetchingRide, setIsFetchingRide] = useState(false);

  useEffect(() => {
    const asyncEffect = async () => {
      setIsFetchingRide(true);
      try {
        const rideDetails = await getRideDetails(rideId);
        setRideWithDetails(rideDetails);
      } catch (e) { }
      setIsFetchingRide(false);
    }
    asyncEffect();
  }, [])

  return (
    <HideIfLoading loading={isFetchingRide}>
      {rideWithDetails && <RideDetails ride={rideWithDetails} />}
    </HideIfLoading>
  )
}

export default RideDetailsWrapper;