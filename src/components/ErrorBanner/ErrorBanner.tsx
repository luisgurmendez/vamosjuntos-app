import { WithChildren } from 'components/types';
import { Body } from 'components/Typography/Typography';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface ErrorBannerProps extends WithChildren { }

const ErrorBanner: React.FC<ErrorBannerProps> = ({ children }) => {

  return (
    <SafeAreaView>
      <Container>
        <WhiteBody>{children}</WhiteBody>
      </Container>
    </SafeAreaView>
  )
}

export default ErrorBanner;

const Container = styled.View`
  width: 100%;
  background-color: ${colors.danger};
  padding-vertical: 4px;
`

const WhiteBody = styled(Body)`
  color:${colors.white};
  text-align: center;
`