import React from 'react'
import ConfigurationScreens from '../../ConfigurationScreens';
import ToOtherScreenOption from '../commons/ToOtherScreenOption';

const FAQOption: React.FC = () => {

  return (
    <ToOtherScreenOption title="Preguntas frecuentes" toScreen={ConfigurationScreens.FAQ} />
  )

}

export default FAQOption;
