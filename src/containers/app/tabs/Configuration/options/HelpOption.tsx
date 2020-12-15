import React from 'react'
import styled from 'styled-components/native';
import ToOtherScreenOption from './commons/ToOtherScreenOption';

interface HelpOptionProps {
}

const HelpOption: React.FC<HelpOptionProps> = ({ }) => {

  return (
    <ToOtherScreenOption title="Ayuda" />
  )

}

export default HelpOption;

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`