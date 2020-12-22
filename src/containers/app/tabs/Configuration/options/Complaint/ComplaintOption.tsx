import React from 'react'
import ToOtherScreenOption from '../commons/ToOtherScreenOption';
import ConfigurationScreens from '../../ConfigurationScreens';

interface ComplaintOptionProps {
}

const ComplaintOption: React.FC<ComplaintOptionProps> = ({ }) => {

  return (
    <ToOtherScreenOption title="Quejas" toScreen={ConfigurationScreens.COMPLAINT} />
  )

}

export default ComplaintOption;
