import PlainButton from 'components/Button/PlainButton';
import Toaster from 'components/Toaster/Toaster';
import { Stylable } from 'components/types';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from 'state/user/actions';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import ConfigurationOption from './commons/ConfigurationOption';
import Storage from 'storage/Storage';
import { logout } from 'api/auth';

interface SignoutOptionProps {
}

const SignoutOption: React.FC<SignoutOptionProps> = ({ }) => {

  const dispatch = useDispatch();
  const handleSignout = () => {
    logout();
    Storage.removeItem(Storage.TOKENS);
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