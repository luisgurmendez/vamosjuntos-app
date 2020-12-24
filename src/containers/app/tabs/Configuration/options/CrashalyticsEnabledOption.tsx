import React, { useState } from 'react'
import BooleanConfiguration from './commons/BooleanConfiguration';
import crashlytics from '@react-native-firebase/crashlytics';

interface CrashalyticsEnabledOptionProps {
}

const CrashalyticsEnabledOption: React.FC<CrashalyticsEnabledOptionProps> = ({ }) => {

  const [isCrashalyticsEnabled, setCrashalyticsEnabled] = useState<boolean>(crashlytics().isCrashlyticsCollectionEnabled)

  const handleCrashalyticsChange = (enabled: boolean) => {
    crashlytics().setCrashlyticsCollectionEnabled(enabled);
    setCrashalyticsEnabled(enabled);
  }

  return (
    <BooleanConfiguration
      config={'Recolectar errores en la app'}
      value={isCrashalyticsEnabled}
      onConfigChange={handleCrashalyticsChange}
    />
  )

}

export default CrashalyticsEnabledOption;
