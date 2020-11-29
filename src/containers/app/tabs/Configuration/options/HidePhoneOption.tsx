import React from 'react'
import styled from 'styled-components/native';
import BooleanConfiguration from './commons/BooleanConfiguration';
import ConfigurationOption from './commons/ConfigurationOption';

interface HidePhoneOptionProps {
}

const HidePhoneOption: React.FC<HidePhoneOptionProps> = ({ }) => {

  return (
    <ConfigurationOption>
      <BooleanConfiguration value={true} config="Ocultar numero de telefono" />
    </ConfigurationOption>
  )

}

export default HidePhoneOption;

const Container = styled.View`

`