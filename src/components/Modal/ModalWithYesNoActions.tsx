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
          primaryAnalyticsKey={`mdl_y_n_${analyticsKey}_yes`}
          secondaryAnalyticsKey={`mdl_y_n_${analyticsKey}_no`}
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
