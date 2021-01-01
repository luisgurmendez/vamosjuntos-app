import React from 'react';
import styled from "styled-components/native";
import { colors } from "utils/colors";
import Icon from 'react-native-vector-icons/Feather';

interface IconedValueProps {
  icon: string;
}

const IconedValue: React.FC<IconedValueProps> = ({ children, icon }) => {

  return (
    <Container>
      <Icon name={icon} size={30} color={colors.gray} />
      <ValueContainer>
        {children}
      </ValueContainer>
    </Container>
  )
}

export default IconedValue;


const Container = styled.View`
  display: flex;
  width: 100%;
  margin-vertical: 16px;
  flex-direction: row;
  align-items: center;
`

const ValueContainer = styled.View`
  margin-left: 16px;
  flex: 1 1 auto;
`