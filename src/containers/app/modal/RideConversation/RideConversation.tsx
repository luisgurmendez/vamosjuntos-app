import { createMessage, getMessages, GetMessagesResponse } from 'api/callables';
import Header from 'components/Page/Header';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import SelectAddressModal from 'components/SelectAddress/SelectAddressModal';
import usePagination, { PaginationData } from 'hooks/usePagination';
import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Address, Message, MessageType } from 'types/models';
import { colors } from 'utils/colors';
import MessageBubble from './Message';

interface RideConversationProps {
    route: any;
}

const RideConversation: React.FC<RideConversationProps> = ({ route: { params: { rideId } } }) => {
    const [sendAddressModalOpen, setSendAddressModalOpen] = useState(false);
    const [messageText, setMessageText] = useState('');
    const { messages } = useGetMessages(rideId);

    let prevMessage: Message | null = null;

    const handleOpenLocationModal = () => {
        setSendAddressModalOpen(true);
    }

    const handleCloseAddressModal = () => {
        setSendAddressModalOpen(false);
    };

    const handleSendMessage = async () => {
        console.log('SENGIN MESSAGE!', {
            type: MessageType.MESSAGE,
            message: messageText,
            rideId: rideId,
        })
        await createMessage({
            type: MessageType.MESSAGE,
            message: messageText,
            rideId: rideId,
        });
        setMessageText('');
    };

    const handleSendLocationMessage = async (address: Address) => {
        console.log('SENGIN MESSAGE!', {
            type: MessageType.LOCATION,
            location: address,
            rideId: rideId,
        })

        await createMessage({
            type: MessageType.LOCATION,
            location: address,
            rideId: rideId,
        });
        setMessageText('');
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
                    }).reverse()}
                </ScrollContainer>
                <Input message={messageText} onSend={handleSendMessage} onMessageChange={setMessageText} onOpenLocationModal={handleOpenLocationModal} />
            </Container>
            <SelectAddressModal
                actionButtonText={'Mandar'}
                onSelectAddress={handleSendLocationMessage}
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
    onSend: () => void;
    onMessageChange: (m: string) => void;
    message: string;
}


const Input: React.FC<InputProps> = ({ onOpenLocationModal, onSend, onMessageChange, message }) => {

    return (
        <InputContainer>
            <StyledPressableIcon onPress={onOpenLocationModal} color={colors.main} name={'map-pin'} size={24} />
            <InputContent>
                <RoundedTextInput
                    multiline
                    numberOfLines={3}
                    placeholderTextColor={colors.darkGray}
                    underlineColorAndroid='transparent'
                    value={message}
                    onChangeText={onMessageChange}
                    placeholder='Mensaje...'
                />
            </InputContent>
            <StyledPressableIcon color={colors.main} name={'send'} size={24} onPress={onSend} />
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


function useGetMessages(rideId: string) {
    const [messages, setMessages] = useState<Message[]>([]);

    const handleGetMessages = useCallback(async ({ skip, take }: PaginationData) => {
        const response = await getMessages(rideId, skip, take)
        setMessages(response?.messages ?? []);
        return response;
    }, []);

    const handleDeserializePaginationCounts = (respose: GetMessagesResponse) => {
        return { totalCount: 0, fetchedCount: 0 };
    }
    const handleGetMessagesWithPagination = usePagination(handleGetMessages, handleDeserializePaginationCounts);

    useEffect(() => {
        handleGetMessagesWithPagination();
    }, [handleGetMessagesWithPagination]);

    return { messages, reload: handleGetMessagesWithPagination };
}