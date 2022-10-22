import { Body } from 'components/Typography/Typography';
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ConfigurationOption from './commons/ConfigurationOption';
import InAppReview from 'react-native-in-app-review';

interface ShowRateAppDialogOptionProps { }

const ShowRateAppDialogOption: React.FC<ShowRateAppDialogOptionProps> = ({ }) => {

    const handleShowRateApp = () => {
        if (InAppReview.isAvailable()) {
            InAppReview.RequestInAppReview();
        }

    }

    return (
        <TouchableOpacity onPress={handleShowRateApp}>
            <ConfigurationOption>
                <Body>Calificá la app</Body>
            </ConfigurationOption>
        </TouchableOpacity>
    )

}

export default ShowRateAppDialogOption;