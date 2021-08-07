import SimpleModal from 'components/Modal/SimpleModal';
import { Body } from 'components/Typography/Typography';
import React from 'react'
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface RememberToAddPhoneNumberModalProps {
  open: boolean;
  onClose: () => void;
}

const RememberToAddPhoneNumberModal: React.FC<RememberToAddPhoneNumberModalProps> = (props) => {
  return (
    <SimpleModal {...props}>
      <Body>Para que tus pasajeros o conductor puedan comunicarse contigo, acordate de agregar un numero de telefono.</Body>
      <Body></Body>
      <Body>Anda a tu perfil y apreta en <EditText>Editar</EditText></Body>
    </SimpleModal>
  )
}

export default RememberToAddPhoneNumberModal;

const EditText = styled(Body)`
  font-size: 16px;
  color: ${colors.main};
`
