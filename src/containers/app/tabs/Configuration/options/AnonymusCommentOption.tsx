import React from 'react'
import styled from 'styled-components/native';
import BooleanConfiguration from './commons/BooleanConfiguration';
import ConfigurationOption from './commons/ConfigurationOption';

interface AnonymusCommentOptionProps {
}

const AnonymusCommentOption: React.FC<AnonymusCommentOptionProps> = ({ }) => {

  return (
    <ConfigurationOption>
      <BooleanConfiguration value={true} config="Comentarios anonimos" />
    </ConfigurationOption>
  )

}

export default AnonymusCommentOption;

const Container = styled.View`

`