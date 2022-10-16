import PlainButton from 'components/Button/PlainButton';
import React, { useState } from 'react'
import { colors } from 'utils/colors';
import ConfigurationOption from './commons/ConfigurationOption';
import { logout } from 'api/auth';
import styled from 'styled-components/native';
import SimpleModal from 'components/Modal/SimpleModal';
import { Body } from 'components/Typography/Typography';
import { deleteUserRequest } from 'api/callables';

interface DeleteUserOptionProps { }

const DeleteUserOption: React.FC<DeleteUserOptionProps> = ({ }) => {

    const [confirmDeletionModalOpen, setConfirmDeletionModalOpen] = useState(false);

    const handleConfirmDeletionModalClose = () => {
        setConfirmDeletionModalOpen(false);
    }

    const handleConfirmDeletionModalOpen = () => {
        setConfirmDeletionModalOpen(true);
    }

    return (
        <ConfigurationOption>
            <UnMarginedButton textStyle={{ fontSize: 18, color: colors.danger }} onPress={handleConfirmDeletionModalOpen}>
                Borrar usuario
            </UnMarginedButton>
            <ConfirmDeletionModal open={confirmDeletionModalOpen} onClose={handleConfirmDeletionModalClose} />
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

interface ConfirmDeletionModalProps {
    open: boolean;
    onClose: () => void;
}

const ConfirmDeletionModal: React.FC<ConfirmDeletionModalProps> = (props) => {

    const handleDeleteUserRequest = () => {
        deleteUserRequest();
        logout();
    }

    return (
        <SimpleModal {...props}>
            <Body>¿Estas seguro que queres borrar tu usuario?.</Body>
            <ButtonActionFooter>
                <FooterButton onPress={handleDeleteUserRequest}>Si</FooterButton>
                <FooterButton onPress={props.onClose}>No</FooterButton>
            </ButtonActionFooter>
        </SimpleModal>
    )
}


const ButtonActionFooter = styled.View`
  display: flex;
  flex-direction: row;
  margin-horizontal: 8px;
  padding: 8px;
  justify-content: center;
`

const FooterButton = styled(PlainButton)`
  flex: 1;
  margin-horizontal: 4px;
`
