import { Body } from 'components/Typography/Typography';
import React from 'react'
import styled from 'styled-components/native';
import ConfigurationOption from './commons/ConfigurationOption';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from 'utils/colors';

interface HelpOptionProps {
}

const HelpOption: React.FC<HelpOptionProps> = ({ }) => {

  return (
    <ConfigurationOption>
      <Container>
        <Body>Ayuda</Body>
        <Icon size={20} color={colors.black} name="chevron-right" />
      </Container>
    </ConfigurationOption>
  )

}

export default HelpOption;

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`