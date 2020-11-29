import { Body } from 'components/Typography/Typography';
import React from 'react'
import styled from 'styled-components/native';
import ConfigurationOption from './commons/ConfigurationOption';

interface AppVersionOptionProps {
}

const AppVersionOption: React.FC<AppVersionOptionProps> = ({ }) => {

  return (
    <ConfigurationOption>
      <Body>Version 1.21.1</Body>
    </ConfigurationOption>
  )

}

export default AppVersionOption;

const Container = styled.View`

`