import React from 'react'
import { openSettings } from 'react-native-permissions';
import ToOtherScreenOption from './commons/ToOtherScreenOption';
import crashlytics from '@react-native-firebase/crashlytics';

interface PermissionsOptionProps {
}

const PermissionsOption: React.FC<PermissionsOptionProps> = ({ }) => {


  const handleGoToSettings = () => openSettings().catch(e => crashlytics().recordError(e));

  return (
    <ToOtherScreenOption title="Permisos" onPress={handleGoToSettings} />
  )

}

export default PermissionsOption;
