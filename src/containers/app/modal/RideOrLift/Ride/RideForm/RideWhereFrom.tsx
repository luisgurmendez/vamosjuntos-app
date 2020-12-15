import WhereFrom from '../../common/WhereFrom';
import React from 'react';
import { RideScreens } from '../RideScreens';

const RideWhereFrom: React.FC = () => {
  return <WhereFrom nextScreen={RideScreens.HOW_MANY} />;
}

export default RideWhereFrom;
