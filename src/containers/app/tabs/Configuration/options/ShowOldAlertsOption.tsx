import React from 'react'
import BooleanConfiguration from './commons/BooleanConfiguration';
import Storage from 'storage/Storage';
import useStorage from 'hooks/useStorage';

interface ShowOldAlertsOptionProps { }

const ShowOldAlertsOption: React.FC<ShowOldAlertsOptionProps> = ({ }) => {

  const { value: isEnabled, setValue: setIsEnabled } = useStorage(Storage.SHOW_SEEN_NOTIFICATIONS, false);

  return (
    <BooleanConfiguration
      config={'Mostrar alertas viejas'}
      value={isEnabled}
      onConfigChange={setIsEnabled}
    />
  )

}

export default ShowOldAlertsOption;
