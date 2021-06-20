import Toaster from 'components/Toaster/Toaster';
import { Title } from 'components/Typography/Typography';
import useNeedLocationPermissions from 'hooks/useNeedLocationPermissions';
import React, { useEffect } from 'react'
import styled from 'styled-components/native';

interface PermissionsProps {
}

const Permissions: React.FC<PermissionsProps> = ({ }) => {

  useNeedLocationPermissions();

  return (
    <Container>
      <Title>Permisos!</Title>
    </Container>
  )

}

export default Permissions;

const Container = styled.View``