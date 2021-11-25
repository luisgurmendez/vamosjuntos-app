import SimpleModal from 'components/Modal/SimpleModal';
import { Body } from 'components/Typography/Typography';
import React from 'react'

interface RememberToCompleteRidesModalProps {
  open: boolean;
  onClose: () => void;
}

const RememberToCompleteRidesModal: React.FC<RememberToCompleteRidesModalProps> = (props) => {

  return (
    <SimpleModal {...props}>
      <Body>Acordate de marcar como completado los viajes que ya se realizaron</Body>
    </SimpleModal>
  )

}

export default RememberToCompleteRidesModal;
