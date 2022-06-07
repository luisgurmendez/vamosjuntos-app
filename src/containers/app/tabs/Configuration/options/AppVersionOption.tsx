import { Body } from 'components/Typography/Typography';
import useVersion from 'hooks/useVersion';
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ConfigurationOption from './commons/ConfigurationOption';

interface AppVersionOptionProps {
  onPress: () => void
}

const AppVersionOption: React.FC<AppVersionOptionProps> = ({ onPress }) => {

  const version = useVersion();

  return (
    <TouchableOpacity onPress={onPress}>
      <ConfigurationOption>
        <Body>Versión {version}</Body>
      </ConfigurationOption>
    </TouchableOpacity>
  )

}

export default AppVersionOption;