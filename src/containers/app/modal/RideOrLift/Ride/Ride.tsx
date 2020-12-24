import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { RideScreens } from './RideScreens';
import HowMany from './RideForm/HowMany';
import Price from './RideForm/Price';
import RideWhen from './RideForm/RideWhen';
import RideWhereFrom from './RideForm/RideWhereFrom';
import RideWhereTo from './RideForm/RideWhereTo';
import { SafeAreaView } from 'react-native-safe-area-context';
import RideSummary from './RideSummary';
import { Formik, FormikHelpers } from 'formik';
import moment from 'moment';
import RideFormSchema, { RideCreationValues } from './RideForm/formSchema';
import { createRide, getRides } from 'api/adedo';
import Toaster from 'components/Toaster/Toaster';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setRides } from 'state/ride/actions';

const Stack = createNativeStackNavigator();

const intialValues: RideCreationValues = {
  whereFrom: undefined,
  whereTo: undefined,
  date: moment().toISOString(),
  capacity: 3,
  price: 100
}

const RideStack: React.FC = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const handleCreateRide = async (values: RideCreationValues, helpers: FormikHelpers<RideCreationValues>) => {

    try {
      await createRide(values);
      const rides = await getRides();
      dispatch(setRides(rides));
      navigation.goBack();

    } catch (e) {
      Toaster.alert('Hubo un error al crear el viaje')
    }
    helpers.setSubmitting(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        validationSchema={RideFormSchema}
        validateOnChange
        validateOnMount
        initialValues={intialValues}
        onSubmit={handleCreateRide}
      >
        <Stack.Navigator
          screenOptions={{
            headerBackTitle: 'Atras',
            headerShown: false
          }}>
          <Stack.Screen name={RideScreens.WHERE_TO} component={RideWhereTo} />
          <Stack.Screen name={RideScreens.WHERE_FROM} component={RideWhereFrom} />
          <Stack.Screen name={RideScreens.HOW_MANY} component={HowMany} />
          <Stack.Screen name={RideScreens.WHEN} component={RideWhen} />
          <Stack.Screen name={RideScreens.PRICE} component={Price} />
          <Stack.Screen name={RideScreens.SUMMARY} component={RideSummary} />

        </Stack.Navigator>
      </Formik>

    </SafeAreaView>
  );
};

export default RideStack;
