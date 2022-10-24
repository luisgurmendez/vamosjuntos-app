import PlainButton from 'components/Button/PlainButton';
import Loading from 'components/Loading/Loading';
import React from 'react'
import styled from 'styled-components/native';
import analytics from 'utils/analytics';
import { colors } from 'utils/colors';

interface EditHeaderActionsProps {
  editing: boolean;
  saving: boolean;
  onSave: () => void;
  onToggleEdit: () => void;
}

const EditHeaderActions: React.FC<EditHeaderActionsProps> = ({ editing, saving, onSave, onToggleEdit }) => {

  const handleToggleEdit = () => {
    analytics.logEvent('edit_or_cancel_user_profile', {
      edit: editing
    })

    onToggleEdit();
  }

  return (
    <Container>
      {editing && (saving ? <Loading size={30} style={{ marginLeft: 16 }} color={colors.main} /> : <PlainButton analyticsKey='save_user_profile_changes' onPress={onSave}>Guardar</PlainButton>)}
      <PlainButton onPress={handleToggleEdit}>{!editing ? 'Editar' : 'Cancelar'}</PlainButton>
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