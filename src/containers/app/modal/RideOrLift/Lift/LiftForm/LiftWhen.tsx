import When from '../../common/When';
import React from 'react';
import { LiftScreens } from '../LiftScreens';
import { useField } from 'formik';
import { Moment } from 'moment';
import moment from 'moment';

const LiftWhen: React.FC = () => {
  const [when, whenMeta, whenHelpers] = useField<string>('date');

  const isFieldValid = whenMeta.error === undefined;

  const handleDateChange = (mDate: Moment) => {
    whenHelpers.setValue(mDate.toISOString(), true)
  }

  return <When nextDisabled={!isFieldValid} nextScreen={LiftScreens.PRICE} date={moment(when.value)} onDateChange={handleDateChange} />;
};

export default LiftWhen;
