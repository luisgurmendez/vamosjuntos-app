import Toaster from 'components/Toaster/Toaster';
import { Title } from 'components/Typography/Typography';
import useCheckAndRequestPermission from 'hooks/useCheckAndRequestPermission';
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

const Container = styled.View`

`

// function useNeedLocationPermissions() {
//   const hasLocationPerms = useCheckAndRequestPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//   useEffect(() => {
//     if (hasLocationPerms !== undefined) {
//       if (!hasLocationPerms) {
//         Toaster.alert({ message: 'Tenes que habilitar los permisos de ubicacion' });
//       }
//     }
//   }, [hasLocationPerms]);
// }
