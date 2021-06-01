import PlainButton from 'components/Button/PlainButton';
import React from 'react'
import styled from 'styled-components/native';
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
      <StyledButton textStyle={{ fontSize: 18, color: colors.danger }} onPress={handleSignout}>Cerrar Sesion</StyledButton>
    </ConfigurationOption>
  )

}

export default SignoutOption;

const StyledButton = styled(PlainButton)`
  text-align: center;
`