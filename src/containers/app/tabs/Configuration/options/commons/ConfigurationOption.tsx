import { Stylable, WithChildren } from 'components/types';
import React from 'react'
import styled from 'styled-components/native';

interface ConfigurationOptionProps extends Stylable, WithChildren { }

const ConfigurationOption: React.FC<ConfigurationOptionProps> = ({ children, style }) => {

  return (
    <Container style={style}>
      {children}
    </Container>
  )

}

export default ConfigurationOption;

const Container = styled.View`
  height: 40px;
  width: 100%;
  padding-vertical: 8px;
  justify-content: center;
`