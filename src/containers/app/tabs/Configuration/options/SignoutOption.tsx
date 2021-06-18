import PlainButton from 'components/Button/PlainButton';
import React from 'react'
import { colors } from 'utils/colors';
import ConfigurationOption from './commons/ConfigurationOption';
import { logout } from 'api/auth';

interface SignoutOptionProps {
}

const SignoutOption: React.FC<SignoutOptionProps> = ({ }) => {

  const handleSignout = () => {
    logout();
  }

  return (
    <ConfigurationOption>
      <PlainButton textStyle={{ fontSize: 18, color: colors.danger }} onPress={handleSignout}>Cerrar Sesion</PlainButton>
    </ConfigurationOption>
  )

}

export default SignoutOption;
