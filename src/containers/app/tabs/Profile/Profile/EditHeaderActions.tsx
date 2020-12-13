import PlainButton from 'components/Button/PlainButton';
import Loading from 'components/Loading/Loading';
import React from 'react'
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface EditHeaderActionsProps {
  editing: boolean;
  saving: boolean;
  onSave: () => void;
  onToggleEdit: () => void;
}

const EditHeaderActions: React.FC<EditHeaderActionsProps> = ({ editing, saving, onSave, onToggleEdit }) => {

  return (
    <Container>
      <PlainButton onPress={onToggleEdit}>{!editing ? 'Editar' : 'Cancelar'}</PlainButton>
      {editing && (saving ? <Loading size={30} style={{ marginLeft: 16 }} color={colors.main} /> : <PlainButton onPress={onSave}>Guardar</PlainButton>)}
    </Container>
  )
}

export default EditHeaderActions;

const Container = styled.View`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`