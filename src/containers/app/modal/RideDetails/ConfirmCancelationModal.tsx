import React from 'react'
import styled from 'styled-components/native';
import SimpleModal from 'components/Modal/SimpleModal';
import ModalActions from 'components/Modal/ModalActions';

interface ConfirmCancelationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const ConfirmCancelationModal: React.FC<ConfirmCancelationModalProps> = ({ onConfirm, onClose, ...modalProps }) => {

  return (
    <SimpleModal {...modalProps} onClose={onClose}>
      <ModalActions
        primaryLabel="Si"
        secondaryLabel="No"
        onPrimaryPress={onConfirm}
        onSecondaryPress={onClose}
      />
    </SimpleModal>
  )

}

export default ConfirmCancelationModal;

const Content = styled.View`
  backgroundColor: white;
  padding: 22px;
  justifyContent: center;
  alignItems: center;
  borderRadius: 4px;
  borderColor: rgba(0, 0, 0, 0.1);
`
