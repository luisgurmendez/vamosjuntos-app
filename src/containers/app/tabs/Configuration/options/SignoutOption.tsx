import Toaster from 'components/Toaster/Toaster';
import { Stylable } from 'components/types';
import React from 'react'
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import ConfigurationOption from './commons/ConfigurationOption';

interface SignoutOptionProps {
}

const SignoutOption: React.FC<SignoutOptionProps> = ({ }) => {

  const handleSignout = () => {
    Toaster.warn("signed out")
  }

  return (
    <ConfigurationOption>
      <StyledButton color={colors.danger} title="Cerrar Sesion" onPress={handleSignout} />
    </ConfigurationOption>
  )

}

export default SignoutOption;

const StyledButton = styled(Button)`
  text-align: center;
`