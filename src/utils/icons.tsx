import React from "react";
import { IconProps } from "react-native-vector-icons/Icon";
import MaerialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';

export enum IconProviders {
    Feather,
    Material,
    FontAwesome5
}

interface IconWithProviderProp extends IconProps {
    provider: IconProviders;
}

export const Icon: React.FC<IconWithProviderProp> = ({ provider, ...rest }) => {
    switch (provider) {
        case IconProviders.Feather:
            return <FeatherIcon {...rest} />;
        case IconProviders.FontAwesome5:
            return <FontAwesome5Icon {...rest} />;
        default:
            return <MaerialIcon {...rest} />;
    }

}
