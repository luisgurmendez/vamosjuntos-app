import React, { useState } from 'react'
import SimpleModal from 'components/Modal/SimpleModal';
import ModalActions from 'components/Modal/ModalActions';
import HideIfLoading from 'components/Loading/HideIfLoading';

interface ModalWithYesNoActionsProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  analyticsKey: string;
}

const ModalWithYesNoActions: React.FC<ModalWithYesNoActionsProps> = ({
  analyticsKey,
  onConfirm,
  onClose,
  ...modalProps
}) => {
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
          primaryAnalyticsKey={`modal_yes_no_${analyticsKey}_action_yes`}
          secondaryAnalyticsKey={`modal_yes_no_${analyticsKey}_action_no`}
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
