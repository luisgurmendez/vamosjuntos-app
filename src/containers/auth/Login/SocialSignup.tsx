import { Text } from 'components/Typography/Typography';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';

const SocialSignup: React.FC = () => {

  return (
    <Container>
      <Or />
      <GoogleLogin />
      <FacebookLogin />
      <GoogleLogin />
    </Container>
  )
}

export default SocialSignup;

const Container = styled.View`
  align-items: center;
`

const Or: React.FC = () => {

  return (
    <OrContainer>
      <Line />
      <Text style={{ fontSize: 16, color: colors.black, marginBottom: 8 }}>o</Text>
      <Line />
    </OrContainer>
  )
}

const OrContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Line = styled.View`
  margin-horizontal: 16px;
  flex: 1;
  height: 4px;
  borderTopWidth: 0.5px;
  borderColor: #AAA;
`;