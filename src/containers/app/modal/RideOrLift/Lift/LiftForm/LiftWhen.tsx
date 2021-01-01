import When from '../../common/When';
import React from 'react';
import { LiftScreens } from '../LiftScreens';
import { useField } from 'formik';
import { Moment } from 'moment';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationAPI } from 'types/Navigation';
import useInterstatialAd from 'hooks/useInterstitialAd';

const LiftWhen: React.FC = () => {
  const [when, whenMeta, whenHelpers] = useField<string>('date');
  const navigation: StackNavigationAPI = useNavigation<any>();
  const handleShowAd = useInterstatialAd();

  const handleNextScreen = () => {
    handleShowAd();
    navigation.push(LiftScreens.POSSIBLE_RIDES);
  }

  const isFieldValid = whenMeta.error === undefined;

  const handleDateChange = (mDate: Moment) => {
    whenHelpers.setValue(mDate.toISOString(), true)
  }

  return <When
    action={{ disabled: !isFieldValid, onPress: handleNextScreen }}
    date={moment(when.value)}
    onDateChange={handleDateChange}
  />;
};

export default LiftWhen;
