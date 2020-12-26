import React, { useState } from 'react'
import styled from 'styled-components/native';
import SimpleModal from 'components/Modal/SimpleModal';
import ModalActions from 'components/Modal/ModalActions';
import HideIfLoading from 'components/Loading/HideIfLoading';

interface ConfirmCompleteRideModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
}

const ConfirmCompleteRideModal: React.FC<ConfirmCompleteRideModalProps> = ({ onConfirm, onClose, ...modalProps }) => {
  const [loading, setLoading] = useState(false);

  const onConfirmWrapper = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  }

  return (
    <SimpleModal {...modalProps} onClose={onClose}>
      <HideIfLoading size={30} loading={loading}>
        <ModalActions
          primaryLabel="Si"
          secondaryLabel="No"
          onPrimaryPress={onConfirmWrapper}
          onSecondaryPress={onClose}
        />
      </HideIfLoading>

    </SimpleModal>
  )

}

export default ConfirmCompleteRideModal;

const Content = styled.View`
  backgroundColor: white;
  padding: 22px;
  justifyContent: center;
  alignItems: center;
  borderRadius: 4px;
  borderColor: rgba(0, 0, 0, 0.1);
`
