import PlainButton from 'components/Button/PlainButton';
import React from 'react'
import styled from 'styled-components/native';

interface EditHeaderActionsProps {
  editing: boolean;
  onSave: () => void;
  onToggleEdit: () => void;
}

const EditHeaderActions: React.FC<EditHeaderActionsProps> = ({ editing, onSave, onToggleEdit }) => {

  return (
    <Container>
      <PlainButton onPress={onToggleEdit}>{!editing ? 'Editar' : 'Cancelar'}</PlainButton>
      {editing && <PlainButton onPress={onSave}>Guardar</PlainButton>}
    </Container>
  )
}

export default EditHeaderActions;

const Container = styled.View`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
`