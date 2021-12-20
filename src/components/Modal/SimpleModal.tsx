import React from 'react'
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { Subtitle } from 'components/Typography/Typography';
import { Stylable } from 'components/types';
import { Box } from 'components/Box/Box';

export interface SimpleModalProps extends Stylable {
  open: boolean;
  onClose: () => void;
  title?: string;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ open, onClose, title, children, style }) => {

  return (
    <Modal isVisible={open} onBackdropPress={onClose} backdropTransitionOutTiming={0}>
      <Container style={style}>
        {title && <Subtitle>{title}</Subtitle>}
        <Content p="lg">
          {children}
        </Content>
      </Container>
    </Modal>
  )
}

export default SimpleModal;

const Container = styled.View`
  backgroundColor: white;
  padding: 22px;
  justifyContent: center;
  alignItems: center;
  borderRadius: 4px;
  borderColor: rgba(0, 0, 0, 0.1);
`

const Content = styled(Box)`
  width: 100%;
`