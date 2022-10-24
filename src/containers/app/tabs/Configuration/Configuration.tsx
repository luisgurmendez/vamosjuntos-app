import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import Page from 'components/Page/Page';
import HelpOption from './options/HelpOption';
import AppVersionOption from './options/AppVersionOption';
import SignoutOption from './options/SignoutOption';
import SavedAddressesOption from './options/SavedAddresses/SavedAddressesOption';
import ComplaintOption from './options/Complaint/ComplaintOption';
import CrashalyticsEnabledOption from './options/CrashalyticsEnabledOption';
import ShowCanceledRidesOption from './options/ShowCanceledRidesOption';
import ShowCompletedRidesOption from './options/ShowCompletedRidesOption';
import PermissionsOption from './options/PermissionsOption';
import ShowOldAlertsOption from './options/ShowOldAlertsOption';
import FAQOption from './options/FAQ/FAQOption';
import { useAnimation } from 'react-native-animation-hooks';
import AbsolutePositioned from 'components/AbsolutePositioned/AbsolutePositioned';
import { AnimatedText } from 'components/Typography/Typography';
import { DeviceDimensions } from 'utils/device';
import EventManager from 'components/Toaster/EventManager';
import { Easing } from 'react-native';
import useFeatureFlag from 'hooks/useFeatureFlag';
import { FeatureFlags } from 'types/models';
import DeleteUserOption from './options/DeleteUserOption';
import ShowRateAppDialogOption from './options/ShowRateAppDialogOption';
import analytics from 'utils/analytics';

interface ConfigurationProps { }

const Configuration: React.FC<ConfigurationProps> = () => {

  const showWelcome = useFeatureFlag(FeatureFlags.SHOW_WELCOME);

  const handleVersionOptionPressed = () => {
    analytics.logEvent('autitos')
    AnimatedCarManager.add();
  }

  return (
    <Page title="Configuración">
      <Container>
        <SavedAddressesOption />
        {showWelcome && <HelpOption />}
        <CrashalyticsEnabledOption />
        <ShowCanceledRidesOption />
        <ShowCompletedRidesOption />
        <ShowOldAlertsOption />
        <FAQOption />
        <PermissionsOption />
        <ComplaintOption />
        <ShowRateAppDialogOption />
        <AppVersionOption onPress={handleVersionOptionPressed} />
        <Spacer />
        <DeleteUserOption />
        <SignoutOption />
      </Container>
      <AnimatedCarManager />
    </Page>
  );
}

export default Configuration;

const Container = styled.ScrollView`
  padding-horizontal: 16px;
  flex: 1;
`

const Spacer = styled.View`
  margin: 8px 0px;
  width: 100%;
  borderBottomWidth: 0.5px;
  borderBottomColor: #999;
`

const eventManager = new EventManager();
const ADD_CAR = 'add_car';
const REMOVE_CAR = 'remove_car';
const cars = ['🚙', '🚗', '🚕', '🏎️', '🛻'];

interface Car {
  id: number;
  car: string;
  duration: number;
  direction: 'left' | 'right';
}

class AnimatedCarManager extends React.Component<{}, { cars: Car[] }> {

  static carId = 0;

  constructor(props: any) {
    super(props);

    this.state = {
      cars: []
    };
  }

  componentDidMount() {
    eventManager.on(ADD_CAR, this.handleAddCar);
    eventManager.on(REMOVE_CAR, this.handleRemoveCar);

  }

  handleAddCar = (car: Car) => {
    this.setState((prevState, props) => ({
      cars: [...prevState.cars, car]
    }));
  };

  handleRemoveCar = (id: number) => {
    this.setState((prevState, _props) => ({
      cars: prevState.cars.filter((car) => car.id !== id)
    }));
  };

  static add() {
    const car: Car = {
      car: getRandomValueOf(cars),
      direction: getRandomValueOf(['left', 'right']),
      duration: getRandomValueInInterval([1500, 4000]),
      id: AnimatedCarManager.carId
    }

    if (car.car === '🏎️') {
      car.duration = 900;
    }

    AnimatedCarManager.carId++;
    eventManager.emit(ADD_CAR, car);
  }

  static remove(id: number) {
    eventManager.emit(REMOVE_CAR, id);
  }

  render() {

    return (
      <FullWidthAbsolutePositioned bottom={'72px'} pointerEvents="box-none">
        {this.state.cars.map(car => <AnimatedCar key={car.id} onAnimationEnd={AnimatedCarManager.remove} car={car} />)}
      </FullWidthAbsolutePositioned>)
  }
}


interface AnimatedCarProps {
  car: Car;
  onAnimationEnd: (id: number) => void;
}

const AnimatedCar: React.FC<AnimatedCarProps> = ({ car, onAnimationEnd }) => {
  const carChar = car.car;
  const isMirrored = car.direction === 'right';
  useEffect(() => {
    setTimeout(() => {
      onAnimationEnd(car.id);
    }, car.duration);
  }, []);

  const animation = useAnimation({
    type: 'timing',
    initialValue: isMirrored ? 1 : 0,
    toValue: isMirrored ? 0 : 1,
    duration: car.duration,
    useNativeDriver: false,
    easing: Easing.linear
  })

  const marginLeftAnimation = animation.interpolate({ inputRange: [0, 1], outputRange: [-64, DeviceDimensions.width] });

  return (
    <AnimatedText style={{
      position: 'absolute',
      fontSize: 64,
      transform: [{ rotateY: isMirrored ? '0deg' : '180deg' }],
      marginLeft: marginLeftAnimation
    }}>{carChar}</AnimatedText>
  )
}


function getRandomValueOf<T>(values: T[]) {
  const value = Math.round(Math.random() * (values.length - 1));
  return values[value];
}

function getRandomValueInInterval(interval: [number, number]) {
  const min = interval[0];
  const max = interval[1];
  return Math.round(Math.random() * (max - min)) + min
}


const FullWidthAbsolutePositioned = styled(AbsolutePositioned)`
  width: ${DeviceDimensions.width + 64}px;
`