import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';
import React, { useCallback } from 'react'
import analytics from 'utils/analytics';
import { BaseNotification, NotificationProps } from './commons';

interface SavedSearchRideAlertNotificationProps extends NotificationProps { }

const SavedSearchRideAlertNotification: React.FC<SavedSearchRideAlertNotificationProps> = ({
    style,
    notification
}) => {

    const navigation = useNavigation<any>();

    const handleNotificationPress = useCallback(() => {
        console.log(notification)
        if (notification.context.ride && notification.context.savedSearchRide) {
            navigation.push(Screens.JOIN_RIDE, {
                ride: notification.context.ride,
                whereFromWhereTo: [
                    notification.context.savedSearchRide.whereFrom,
                    notification.context.savedSearchRide.whereTo
                ],
                onJoinedRide: () => analytics.logEvent('join_ride_through_alert'),

            })
        }
    }, [notification])

    return (
        <BaseNotification
            style={style}
            onNotificationPress={handleNotificationPress}
            notification={notification} label={'creo un viaje que te puede servir'}
        />
    )
}

export default SavedSearchRideAlertNotification;
