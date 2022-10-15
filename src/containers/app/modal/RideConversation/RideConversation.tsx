import Header from 'components/Page/Header';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import SelectAddressModal from 'components/SelectAddress/SelectAddressModal';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { getUser } from 'state/user/selectors';
import styled from 'styled-components/native';
import { Address, Message, MessageType, User } from 'types/models';
import { colors } from 'utils/colors';
import MessageBubble from './Message';

const RideConversation: React.FC = () => {
    const self = useSelector(getUser);
    const [sendAddressModalOpen, setSendAddressModalOpen] = useState(false);

    const mateo = { id: 'mateo', name: 'Mateo' } as User;
    const cata = { id: 'cata', name: 'Catalina' } as User;

    const message: Message = {
        type: MessageType.MESSAGE,
        from: cata,
        message: 'Buenos dias!',
        sentAt: new Date(),
    }

    const message2: Message = {
        type: MessageType.MESSAGE,
        from: self!,
        message: 'Hola como andan? Armando el matesito, salgo en 20 a buscar al primero.',
        sentAt: new Date(),
    }

    const message3: Message = {
        type: MessageType.MESSAGE,
        from: cata,
        message: 'Perfecto! Quien va a ser el primero?',
        sentAt: new Date(),
    }

    const message4: Message = {
        type: MessageType.MESSAGE,
        from: self!,
        message: 'Mario Mateo.',
        sentAt: new Date(),
    }

    const message5: Message = {
        type: MessageType.MESSAGE,
        from: mateo,
        message: 'dalee te espero afuera.',
        sentAt: new Date(),
    }

    const message6: Message = {
        type: MessageType.MESSAGE,
        from: self!,
        message: 'Buenisimo, mandame bien la ubic de donde estas',
        sentAt: new Date(),
    }

    const message7: Message = {
        type: MessageType.MESSAGE,
        from: mateo,
        message: 'Ya te mando',
        sentAt: new Date(),
    }

    const message8: Message = {
        type: MessageType.LOCATION,
        from: mateo,
        location: {
            latitude: 12,
            longitude: 42
        } as Address,
        sentAt: new Date(),
    }


    function generateMessage(): Message[] {
        return [message, message2, message3, message4, message5, message6, message7, message8];
    }

    const messages = generateMessage();
    let prevMessage: Message | null = null;

    const handleSelectAddress = () => {
        setSendAddressModalOpen(false);
    };

    const handleOpenLocationModal = () => {
        setSendAddressModalOpen(true);
    }

    const handleCloseAddressModal = () => {
        setSendAddressModalOpen(false);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <Container>
                <Header showBack title='Chat' />
                <ScrollContainer style={{ backgroundColor: '#f3f3f3' }}>
                    {messages.map(m => {
                        const showSender = prevMessage === null || prevMessage.from.id !== m.from.id;
                        prevMessage = m;
                        return <MessageBubble showSender={showSender} message={m} />
                    })}
                </ScrollContainer>
                <Input onOpenLocationModal={handleOpenLocationModal} />
            </Container>
            <SelectAddressModal
                actionButtonText={'Mandar'}
                onSelectAddress={handleSelectAddress}
                onClose={handleCloseAddressModal}
                open={sendAddressModalOpen} />
        </KeyboardAvoidingView>

    )
}

export default RideConversation;

const Container = styled(SafeAreaView)`
    flex: 1;
    height: 100%;
    background-color: white;
`;

const ScrollContainer = styled.ScrollView`
    padding: 0px 8px;
    width: 100%;
    flex: 1;
`

interface InputProps {
    onOpenLocationModal: () => void;
}


const Input: React.FC<InputProps> = ({ onOpenLocationModal }) => {

    return (
        <InputContainer>
            <StyledPressableIcon onPress={onOpenLocationModal} color={colors.main} name={'map-pin'} size={24} />
            <InputContent>
                <RoundedTextInput
                    multiline
                    numberOfLines={3}
                    placeholderTextColor={colors.darkGray}
                    underlineColorAndroid='transparent'
                    placeholder='Mensaje...'
                />
            </InputContent>
            <StyledPressableIcon color={colors.main} name={'send'} size={24} />
        </InputContainer>
    )
}

const InputContainer = styled.View`
    backgroundColor: white;
    padding: 8px;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
`

const StyledPressableIcon = styled(PressableIcon)`
    margin: 4px;
    margin-left: 8px;
    margin-right: 8px;
`

const InputContent = styled.View`
  background-color: #f3f3f3;
  padding: 10px 8px;
  border-radius: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`

const RoundedTextInput = styled.TextInput`
  background-color: #f3f3f3;
  font-size: 16px;
  font-family: Roboto;
  flex: 1;
  margin-left: 8px;
  color: ${colors.black};
  padding: 0px;
  max-height: ${16 * 4};
`;