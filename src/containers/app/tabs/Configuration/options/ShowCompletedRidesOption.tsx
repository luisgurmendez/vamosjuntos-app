import React from 'react'
import BooleanConfiguration from './commons/BooleanConfiguration';
import Storage from 'storage/Storage';
import useStorage from 'hooks/useStorage';

interface ShowCompletedRidesProps { }

const ShowCompletedRidesOption: React.FC<ShowCompletedRidesProps> = ({ }) => {

  const { value: isEnabled, setValue: setIsEnabled } = useStorage(Storage.SHOW_COMPLETED_RIDES, true);

  return (
    <BooleanConfiguration
      config={'Mostrar viajes completados'}
      value={isEnabled}
      onConfigChange={setIsEnabled}
    />
  )

}

export default ShowCompletedRidesOption;
