import React, { useState } from 'react'
import SimpleModal from 'components/Modal/SimpleModal';
import ModalActions from 'components/Modal/ModalActions';
import HideIfLoading from 'components/Loading/HideIfLoading';

interface ModalWithYesNoActionsProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
}

const ModalWithYesNoActions: React.FC<ModalWithYesNoActionsProps> = ({ onConfirm, onClose, ...modalProps }) => {
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

export default ModalWithYesNoActions;
