import React from 'react'
import BooleanConfiguration from './commons/BooleanConfiguration';
import useStorage from 'hooks/useStorage';

interface ShowOldAlertsOptionProps { }

const ShowOldAlertsOption: React.FC<ShowOldAlertsOptionProps> = ({ }) => {

  const [isEnabled, setIsEnabled] = useStorage<boolean>('showSeenNotifications');

  return (
    <BooleanConfiguration
      config={'Mostrar notificaciones viejas'}
      value={isEnabled}
      onConfigChange={setIsEnabled}
    />
  )

}

export default ShowOldAlertsOption;
