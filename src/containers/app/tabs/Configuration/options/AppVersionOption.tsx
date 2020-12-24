import { Body } from 'components/Typography/Typography';
import useVersion from 'hooks/useVersion';
import React from 'react'
import ConfigurationOption from './commons/ConfigurationOption';

interface AppVersionOptionProps {
}

const AppVersionOption: React.FC<AppVersionOptionProps> = ({ }) => {

  const version = useVersion();

  return (
    <ConfigurationOption>
      <Body>Version {version}</Body>
    </ConfigurationOption>
  )

}

export default AppVersionOption;