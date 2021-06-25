import { Stylable } from 'components/types';
import { Body } from 'components/Typography/Typography';
import React from 'react'
import { Switch } from 'react-native'
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import ConfigurationOption from './ConfigurationOption';

interface BooleanConfigurationProps extends Stylable {
  config?: string;
  onConfigChange?: (v: boolean) => void;
  value?: boolean;
}

const BooleanConfiguration: React.FC<BooleanConfigurationProps> = ({ style, config, onConfigChange, value }) => {

  return (
    <ConfigurationOption>
      <Container style={style}>
        <Body>{config}</Body>
        <Switch value={value} onValueChange={onConfigChange} trackColor={{ true: colors.main, false: '' }} />
      </Container>
    </ConfigurationOption>
  )
}


export default BooleanConfiguration;


const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-between;
`

