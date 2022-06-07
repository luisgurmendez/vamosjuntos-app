import Wizard, { WizardProps } from 'components/Wizard/Wizard';
import moment from 'moment';
import React from 'react';
import WhenCommon from 'components/When/When';

interface WhenProps {
  nextScreen?: string;
  action?: WizardProps['action'];
  date?: moment.Moment;
  onDateChange?: (date: moment.Moment) => void;
}

const When: React.FC<WhenProps> = ({ date = moment(), action, nextScreen, onDateChange }) => {

  return (
    <Wizard action={action} nextScreen={nextScreen} title="¿Cuando?">
      <WhenCommon  date={date} onDateChange={onDateChange}/>
    </Wizard>
  );
};

export default When;
