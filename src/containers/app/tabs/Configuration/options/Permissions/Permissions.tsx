import React from 'react'
import styled from 'styled-components/native';
import Permission from './Permission';
import { PERMISSIONS } from 'react-native-permissions';

interface PermissionsProps {
}

/**
 * @deprecated
 */
const Permissions: React.FC<PermissionsProps> = ({ }) => {

  return (
    <Container>
      <Permission permission={PERMISSIONS.IOS.CAMERA} />
    </Container>
  )

}

export default Permissions;

const Container = styled.View`

`