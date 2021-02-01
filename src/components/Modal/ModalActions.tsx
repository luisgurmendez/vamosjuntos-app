import Button from 'components/Button/Button';
import PlainButton from 'components/Button/PlainButton';
import React from 'react'
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface ModalActionsProps {
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
}

const ModalActions: React.FC<ModalActionsProps> = ({
  primaryLabel,
  secondaryLabel,
  onPrimaryPress,
  onSecondaryPress
}) => {

  return (
    <Container>
      {primaryLabel && <PlainButton onPress={onPrimaryPress}>{primaryLabel}</PlainButton>}
      {secondaryLabel && <PlainButton onPress={onSecondaryPress}>{secondaryLabel}</PlainButton>}
    </Container>
  )

}

export default ModalActions;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`
