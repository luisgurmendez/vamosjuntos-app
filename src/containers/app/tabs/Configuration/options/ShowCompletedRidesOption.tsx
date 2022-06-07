import React from 'react'
import BooleanConfiguration from './commons/BooleanConfiguration';
import Storage from 'storage/Storage';
import useStorage from 'hooks/useStorage';

interface ShowCompletedRidesProps { }

const ShowCompletedRidesOption: React.FC<ShowCompletedRidesProps> = ({ }) => {

  const [isEnabled, setIsEnabled] = useStorage<boolean>('showCompletedRides');

  return (
    <BooleanConfiguration
      config={'Mostrar viajes completados'}
      value={isEnabled}
      onConfigChange={setIsEnabled}
    />
  )

}

export default ShowCompletedRidesOption;
