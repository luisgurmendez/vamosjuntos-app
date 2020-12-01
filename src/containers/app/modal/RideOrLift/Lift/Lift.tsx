import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { LiftScreens } from './LiftScreens';
import HowMany from './LiftForm/HowMany';
import Price from './LiftForm/Price';
import LiftWhen from './LiftForm/LiftWhen';
import LiftWhereFrom from './LiftForm/LiftWhereFrom';
import LiftWhereTo from './LiftForm/LiftWhereTo';
import { SafeAreaView } from 'react-native-safe-area-context';
import LiftSummary from './LiftSummary';
import { Formik } from 'formik';
import moment from 'moment';
import LiftFormSchema from './LiftForm/formSchema';

const Stack = createNativeStackNavigator();

const intialValues = {
  whereFrom: undefined,
  whereTo: undefined,
  when: moment().toISOString(),
  howMany: 3,
  price: 100
}

const LiftStack: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik validationSchema={LiftFormSchema} validateOnChange validateOnMount initialValues={intialValues} onSubmit={(values) => console.log('submitting', values)}>
        <Stack.Navigator
          screenOptions={{
            headerBackTitle: 'Atras',
            headerShown: false
          }}>
          <Stack.Screen name={LiftScreens.WHERE_TO} component={LiftWhereTo} />
          <Stack.Screen name={LiftScreens.WHERE_FROM} component={LiftWhereFrom} />
          <Stack.Screen name={LiftScreens.HOW_MANY} component={HowMany} />
          <Stack.Screen name={LiftScreens.WHEN} component={LiftWhen} />
          <Stack.Screen name={LiftScreens.PRICE} component={Price} />
          <Stack.Screen name={LiftScreens.SUMMARY} component={LiftSummary} />

        </Stack.Navigator>
      </Formik>

    </SafeAreaView>
  );
};

export default LiftStack;
