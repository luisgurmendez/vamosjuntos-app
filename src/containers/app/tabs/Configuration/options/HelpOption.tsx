import { Screens } from 'containers/Screens';
import React from 'react'
import ToOtherScreenOption from './commons/ToOtherScreenOption';

interface HelpOptionProps {
}

const HelpOption: React.FC<HelpOptionProps> = ({ }) => {

  return (
    <ToOtherScreenOption title="Ayuda" toScreen={Screens.WELCOME} />
  )

}

export default HelpOption;
