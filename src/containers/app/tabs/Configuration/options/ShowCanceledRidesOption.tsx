import React from 'react'
import BooleanConfiguration from './commons/BooleanConfiguration';
import useStorage from 'hooks/useStorage';

interface ShowCanceledRidesProps { }

const ShowCanceledRidesOption: React.FC<ShowCanceledRidesProps> = ({ }) => {

  const [isEnabled, setIsEnabled] = useStorage<boolean>('showCanceledRides');

  return (
    <BooleanConfiguration
      config={'Mostrar viajes cancelados'}
      value={isEnabled}
      analyticsKey={'show_canceled_rides'}
      onConfigChange={setIsEnabled}
    />
  )

}

export default ShowCanceledRidesOption;
