import When from '../../common/When';
import moment from 'moment';
import React, { useState } from 'react';
import { LiftScreens } from '../LiftScreens';

const LiftWhen: React.FC = () => {

  const [date, setDate] = useState(moment());

  return (
    <When nextScreen={LiftScreens.PRICE} date={date} onDateChange={setDate} />
  )
}

export default LiftWhen;