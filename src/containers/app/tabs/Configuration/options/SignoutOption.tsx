import PlainButton from 'components/Button/PlainButton';
import React from 'react'
import { colors } from 'utils/colors';
import ConfigurationOption from './commons/ConfigurationOption';
import { logout } from 'api/auth';
import styled from 'styled-components/native';

interface SignoutOptionProps {
}

const SignoutOption: React.FC<SignoutOptionProps> = ({ }) => {

  const handleSignout = () => {
    logout();
  }

  return (
    <ConfigurationOption>
      <UnMarginedButton textStyle={{ fontSize: 18, color: colors.danger }} onPress={handleSignout}>Cerrar sesión</UnMarginedButton>
    </ConfigurationOption>
  )

}

export default SignoutOption;

const UnMarginedButton = styled(PlainButton)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin: 0px;
  padding: 0px;
`