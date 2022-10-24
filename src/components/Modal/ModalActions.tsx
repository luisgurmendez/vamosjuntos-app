import Button from 'components/Button/Button';
import React from 'react'
import styled from 'styled-components/native';

interface ModalActionsProps {
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  primaryAnalyticsKey: string;
  secondaryAnalyticsKey: string;
}

const ModalActions: React.FC<ModalActionsProps> = ({
  primaryLabel,
  secondaryLabel,
  onPrimaryPress,
  onSecondaryPress,
  primaryAnalyticsKey,
  secondaryAnalyticsKey
}) => {

  return (
    <Container>
      {secondaryLabel &&
        <Button
          style={{ flexGrow: 1, margin: 16, width: 0 }}
          type='danger'
          onPress={onSecondaryPress}
          analyticsKey={secondaryAnalyticsKey}
        >
          {secondaryLabel}
        </Button>
      }
      {primaryLabel && <Button style={{ flexGrow: 1, margin: 16, width: 0 }} analyticsKey={primaryAnalyticsKey} onPress={onPrimaryPress}>{primaryLabel}</Button>}
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
