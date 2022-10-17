import { useNavigation } from '@react-navigation/native';
import { Body, SmallBody } from 'components/Typography/Typography';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { getUser } from 'state/user/selectors';
import styled from 'styled-components/native';
import { Message, MessageType } from 'types/models';
import { colors } from 'utils/colors';
import { getTimeTextPlain } from 'utils/date';
import Screens from '../Screens';
import LocationMessageBubbleContent from './LocationMessageBubbleContent';

interface MessageBubbleProps {
    message: Message;
    showSender: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, showSender }) => {

    const self = useSelector(getUser)
    const navigation = useNavigation<any>();
    const isMessageSentBySelf = self!.id == message.from.id;

    const messageBubbleStyles: StyleProp<ViewStyle> = {
        backgroundColor: !isMessageSentBySelf ? colors.white : colors.main,
    };

    const alignmentStyles: StyleProp<ViewStyle> = {
        justifyContent: !isMessageSentBySelf ? 'flex-start' : 'flex-end',
        alignItems: !isMessageSentBySelf ? 'flex-start' : 'flex-end'
    }

    const bodyStyle = {
        color: !isMessageSentBySelf ? colors.black : colors.white,
    };

    const dateBodyStyle = {
        color: !isMessageSentBySelf ? colors.gray : '#EEE',
    };

    const handleGoToUserProfile = () => {
        navigation.push(Screens.USER_PROFILE, { user: message.from });
    }

    return (
        <MessageAlignment style={[alignmentStyles, { paddingTop: showSender ? 8 : 0, paddingBottom: 3 }]}>
            <MessageContent style={alignmentStyles}>
                <Container style={messageBubbleStyles}>
                    {showSender && (
                        <TouchableOpacity onPress={!isMessageSentBySelf ? handleGoToUserProfile : undefined}>
                            <SenderBody style={bodyStyle}>{message.from.name}:</SenderBody>
                        </TouchableOpacity>
                    )}
                    {message.type === MessageType.MESSAGE && <WrappedBody style={bodyStyle}>{message.message}</WrappedBody>}
                    {message.type === MessageType.LOCATION && <LocationMessageBubbleContent senderName={message.from.name} mapId={`location-${message.id}`} location={message.location} />}
                    <MessageFooter>
                        <DateSmallBody style={dateBodyStyle}>{getTimeTextPlain(message.createdAt)}</DateSmallBody>
                    </MessageFooter>
                </Container>
            </MessageContent>
        </MessageAlignment>
    );
}


export default MessageBubble;

const Container = styled.View`
    border-radius: 10px;
    display: flex;
    padding-top: 8px;
    padding-bottom: 4px;
    padding-right: 16px; 
    padding-left: 16px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);

`

const MessageContent = styled.View`
    flex-direction: column;
    max-width: 65%;
`

const MessageAlignment = styled.View`
    width: 100%;
    flex-direction: row;
`

const WrappedBody = styled(Body)`
    padding: 0px;
`

const DateSmallBody = styled(SmallBody)`
    color: ${colors.gray}
`

const MessageFooter = styled.View`
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
`

const SenderBody = styled(Body)`
    fontWeight: bold;
    margin-bottom: 2px;
`
