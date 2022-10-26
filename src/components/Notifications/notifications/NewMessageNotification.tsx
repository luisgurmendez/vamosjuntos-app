import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';
import React, { useCallback } from 'react'
import { BaseNotification, NotificationProps } from './commons';

interface NewMessageNotificationProps extends NotificationProps { }

const NewMessageNotification: React.FC<NewMessageNotificationProps> = ({ style, notification }) => {

    const navigation = useNavigation<any>();

    const handleNotificationPress = useCallback(() => {
        if (notification.context.ride) {
            navigation.push(Screens.RIDE_CONVERSATION, { ride: notification.context.ride })
        }
    }, [notification])


    return (
        <BaseNotification
            style={style}
            onNotificationPress={handleNotificationPress}
            notification={notification} label={'mando un mensaje al chat'}
        />
    )
}

export default NewMessageNotification;
