import When from '../../common/When';
import React from 'react';
import { RideScreens } from '../RideScreens';
import { useField } from 'formik';
import { Moment } from 'moment';
import moment from 'moment';

const RideWhen: React.FC = () => {
  const [when, whenMeta, whenHelpers] = useField<string>('date');

  const isFieldValid = whenMeta.error === undefined;

  const handleDateChange = (mDate: Moment) => {
    whenHelpers.setValue(mDate.toISOString(), true)
  }

  return <When nextDisabled={!isFieldValid} nextScreen={RideScreens.PRICE} date={moment(when.value)} onDateChange={handleDateChange} />;
};

export default RideWhen;
