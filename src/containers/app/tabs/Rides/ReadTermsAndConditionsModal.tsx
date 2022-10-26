import Button from 'components/Button/Button';
import Checkbox from 'components/Checkbox/Checkbox';
import SimpleModal from 'components/Modal/SimpleModal';
import { Body } from 'components/Typography/Typography';
import useCallable from 'hooks/useCallable';
import React, { useState } from 'react'
import { Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from 'state/user/actions';
import styled from 'styled-components/native';
import { User } from 'types/models';
import { colors } from 'utils/colors';

interface ReadTermsAndConditionsModalProps {
  open: boolean;
  onClose: () => void;
}

const ReadTermsAndConditionsModal: React.FC<ReadTermsAndConditionsModalProps> = (props) => {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const updateUser = useCallable<User>('/users/update');
  const dispatch = useDispatch();

  const handleOpenTerms = () => {
    Linking.openURL('https://vamosjuntos.uy/terms')
  }

  const handleUpdateUser = async () => {
    setIsUpdating(true);
    try {
      const updatedUserResponse = await updateUser({ termsAndConditions: new Date().toISOString() });
      if (updatedUserResponse.success) {
        dispatch(setUser(updatedUserResponse.data));
        props.onClose();
      }
    } finally {
      setIsUpdating(false);
    }

  }

  return (
    <SimpleModal {...props} backdropPressEnabled={false} title="Nuevas condiciones">
      <BodyContainer>
        <Body>Actualizamos nuestras <Body style={{ color: colors.main }} onPress={handleOpenTerms}>Condiciones generales de uso</Body>. Porfavor tomate 5 minutos para leerlas.</Body>
      </BodyContainer>
      <Checkbox style={{ marginBottom: 8 }} label={'Leí y acepto las condiciones generales de uso'} value={hasAcceptedTerms} onValueChange={setHasAcceptedTerms} />
      <Button disabled={!hasAcceptedTerms} loading={isUpdating} onPress={handleUpdateUser}>Guardar</Button>
    </SimpleModal>
  )

}

export default ReadTermsAndConditionsModal;


const BodyContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items:center;
  width: 100%;
  flex-wrap: wrap;
  marginVertical: 8px;
`