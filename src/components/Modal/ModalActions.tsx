import Button from 'components/Button/Button';
import PlainButton from 'components/Button/PlainButton';
import React from 'react'
import styled from 'styled-components/native';

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
      {secondaryLabel && <Button style={{ flexGrow: 1, margin: 16, width: 0 }} type='danger' onPress={onSecondaryPress}>{secondaryLabel}</Button>}
      {primaryLabel && <Button style={{ flexGrow: 1, margin: 16, width: 0 }} onPress={onPrimaryPress}>{primaryLabel}</Button>}
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
