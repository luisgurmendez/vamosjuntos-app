import PlainButton from 'components/Button/PlainButton';
import React, { useState } from 'react'
import { colors } from 'utils/colors';
import ConfigurationOption from './commons/ConfigurationOption';
import { logout } from 'api/auth';
import styled from 'styled-components/native';
import { deleteUserRequest } from 'api/callables';
import ModalWithYesNoActions from 'components/Modal/ModalWithYesNoActions';

interface DeleteUserOptionProps { }

const DeleteUserOption: React.FC<DeleteUserOptionProps> = ({ }) => {

    const [confirmDeletionModalOpen, setConfirmDeletionModalOpen] = useState(false);

    const handleConfirmDeletionModalClose = () => {
        setConfirmDeletionModalOpen(false);
    }

    const handleConfirmDeletionModalOpen = () => {
        setConfirmDeletionModalOpen(true);
    }

    const handleConfirmUserDeletion = async () => {
        await deleteUserRequest();
        logout();
    }

    return (
        <ConfigurationOption>
            <UnMarginedButton textStyle={{ fontSize: 18, color: colors.danger }} onPress={handleConfirmDeletionModalOpen}>
                Borrar usuario
            </UnMarginedButton>
            <ModalWithYesNoActions
                title={"¿Estas seguro que queres borrar tu usuario?"}
                open={confirmDeletionModalOpen}
                onConfirm={handleConfirmUserDeletion}
                onClose={handleConfirmDeletionModalClose}
            />
        </ConfigurationOption>
    )

}

export default DeleteUserOption;

const UnMarginedButton = styled(PlainButton)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin: 0px;
  padding: 0px;
`
