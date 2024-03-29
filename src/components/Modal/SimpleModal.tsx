import React from 'react'
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { Subtitle } from 'components/Typography/Typography';
import { Stylable, WithChildren } from 'components/types';
import { Box } from 'components/Box/Box';

export interface SimpleModalProps extends Stylable, WithChildren {
  open: boolean;
  onClose: () => void;
  title?: string;
  backdropPressEnabled?: boolean
}

const SimpleModal: React.FC<SimpleModalProps> = ({ open, backdropPressEnabled = true, onClose, title, children, style }) => {

  return (
    <Modal isVisible={open} onBackdropPress={() => backdropPressEnabled && onClose()} backdropTransitionOutTiming={0}>
      <Container style={style}>
        {title && <Subtitle>{title}</Subtitle>}
        <Content mt="lg">
          {children}
        </Content>
      </Container>
    </Modal>
  )
}

export default SimpleModal;

const Container = styled.View`
  backgroundColor: white;
  padding: 16px;
  justifyContent: center;
  alignItems: center;
  borderRadius: 4px;
  borderWidth: 1px;
`

const Content = styled(Box)`
  width: 100%;
  min-height: 24px;
`