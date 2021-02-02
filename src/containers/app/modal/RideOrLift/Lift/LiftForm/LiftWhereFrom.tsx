import WhereFrom from '../../common/WhereFrom';
import React from 'react';
import { LiftScreens } from '../LiftScreens';

const LiftWhereFrom: React.FC = () => {
  return <WhereFrom nextScreen={LiftScreens.WHERE_TO} />;
}

export default LiftWhereFrom;
