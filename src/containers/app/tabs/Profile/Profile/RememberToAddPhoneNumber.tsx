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
      <Body>Podés agregar un número de teléfono para que tus pasajeros o tu conductor se comuniquen contigo.</Body>
      <Body></Body>
      <Body>Tu número lo podran ver los integrantes del viaje.</Body>
      <Body>Anda a tu perfil y apretá en <EditText>Editar</EditText></Body>
    </SimpleModal>
  )
}

export default RememberToAddPhoneNumberModal;

const EditText = styled(Body)`
  font-size: 16px;
  color: ${colors.main};
`
