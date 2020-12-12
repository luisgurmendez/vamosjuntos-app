import React from 'react'
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import Loading from './Loading';

interface HideIfLoadingProps {
  loading: boolean;
}

const HideIfLoading: React.FC<HideIfLoadingProps> = ({ loading, children }) => {

  if (loading) {

    return (
      <Container>
        <Loading size={64} color={colors.main} />
      </Container>
    )
  }

  return <>{children}</>

}

export default HideIfLoading;

const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
`