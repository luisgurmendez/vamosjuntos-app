import { Body } from 'components/Typography/Typography';
import React from 'react'
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import Loading from './Loading';

interface HideIfLoadingProps {
  loading: boolean;
  label?: string;
  size?: number;
}

const HideIfLoading: React.FC<HideIfLoadingProps> = ({ loading, label, size = 64, children }) => {

  if (loading) {
    return (
      <Container>
        <Loading size={size} color={colors.main} />
        {label && <Body>{label}</Body>}
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