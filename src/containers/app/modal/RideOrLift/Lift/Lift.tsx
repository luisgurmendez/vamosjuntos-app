import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { LiftScreens } from './LiftScreens';
import LiftWhen from './LiftForm/LiftWhen';
import LiftWhereFrom from './LiftForm/LiftWhereFrom';
import LiftWhereTo from './LiftForm/LiftWhereTo';
import { SafeAreaView } from 'react-native-safe-area-context';
import PossibleRides from './PossibleRides';
import { Formik } from 'formik';
import moment from 'moment';
import LiftFormSchema, { LiftCreationValues } from './LiftForm/formSchema';
import JoinRide from './JoinRide';
import { useNavigation } from '@react-navigation/native';
import { createRideRequest } from 'api/callables';
import crashlytics from '@react-native-firebase/crashlytics';
import Toaster from 'components/Toaster/Toaster';
import { useDispatch } from 'react-redux';
import { addRideRequest } from 'state/ride/actions';

const Stack = createNativeStackNavigator();

const intialValues: LiftCreationValues = {
  rideId: '',
  whereFrom: undefined,
  whereTo: undefined,
  date: moment().set({ hours: 12, minutes: 0 }).toISOString()
}

const LiftStack: React.FC = () => {

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleCreateRideRequest = async (values: LiftCreationValues) => {
    try {
      const rideRequest = await createRideRequest(values.rideId, values.whereFrom!, values.whereTo!);
      Toaster.success('Se mando tu solicitud de viaje')
      console.log(rideRequest);
      rideRequest && dispatch(addRideRequest(rideRequest));
      navigation.goBack();
    } catch (e) {
      Toaster.alert('Hubo un error al intentar unirte al viaje')
      crashlytics().recordError(e);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        validationSchema={LiftFormSchema}
        validateOnChange
        validateOnMount
        initialValues={intialValues}
        onSubmit={handleCreateRideRequest}
      >
        <Stack.Navigator
          screenOptions={{
            headerBackTitle: 'Atras',
            headerShown: false
          }}>
          <Stack.Screen name={LiftScreens.WHERE_FROM} component={LiftWhereFrom} />
          <Stack.Screen name={LiftScreens.WHERE_TO} component={LiftWhereTo} />
          <Stack.Screen name={LiftScreens.WHEN} component={LiftWhen} />
          <Stack.Screen name={LiftScreens.POSSIBLE_RIDES} component={PossibleRides} />
          <Stack.Screen name={LiftScreens.JOIN_RIDE} component={JoinRide} />
        </Stack.Navigator>
      </Formik>

    </SafeAreaView>
  );
};

export default LiftStack;
