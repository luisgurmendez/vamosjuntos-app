import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { LiftScreens } from './LiftScreens';
import LiftWhen from './LiftForm/LiftWhen';
import LiftWhereFrom from './LiftForm/LiftWhereFrom';
import LiftWhereTo from './LiftForm/LiftWhereTo';
import { SafeAreaView } from 'react-native-safe-area-context';
import JoinRide from './JoinRide';
import { Formik } from 'formik';
import moment from 'moment';
import LiftFormSchema, { LiftCreationValues } from './LiftForm/formSchema';

const Stack = createNativeStackNavigator();

const intialValues: LiftCreationValues = {
  whereFrom: undefined,
  whereTo: undefined,
  date: moment().toISOString()
}

const LiftStack: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        validationSchema={LiftFormSchema}
        validateOnChange
        validateOnMount
        initialValues={intialValues}
        onSubmit={(values) => console.log('submitting', values)}
      >
        <Stack.Navigator
          screenOptions={{
            headerBackTitle: 'Atras',
            headerShown: false
          }}>
          <Stack.Screen name={LiftScreens.WHERE_TO} component={LiftWhereTo} />
          <Stack.Screen name={LiftScreens.WHERE_FROM} component={LiftWhereFrom} />
          <Stack.Screen name={LiftScreens.WHEN} component={LiftWhen} />
          <Stack.Screen name={LiftScreens.JOIN_RIDE} component={JoinRide} />
        </Stack.Navigator>
      </Formik>

    </SafeAreaView>
  );
};

export default LiftStack;
