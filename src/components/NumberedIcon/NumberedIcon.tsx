import { Stylable } from 'components/types';
import { LargeBody } from 'components/Typography/Typography';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface NumberedIconProps extends Stylable {
  icon: string;
  number: number;
  size?: number;
  color?: string;
}

const NumberedIcon: React.FC<NumberedIconProps> = ({ style, icon, number, size = 25, color = colors.black }) => {

  return (
    <Container style={style}>
      <Icon color={color} name={icon} size={size} />
      <LargeBody style={{ color: color, marginLeft: 4 }}>: {number}</LargeBody>
    </Container>
  )
}

export default NumberedIcon;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`
