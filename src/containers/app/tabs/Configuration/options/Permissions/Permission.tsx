
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native';
import BooleanConfiguration from '../commons/BooleanConfiguration';
import { Permission as RNPermissionEnum, RESULTS, check, openSettings, request } from 'react-native-permissions';
import HideIfLoading from 'components/Loading/HideIfLoading';

interface PermissionProps {
  permission: RNPermissionEnum;
}

/**
 * @deprecated
 */
const Permission: React.FC<PermissionProps> = ({ permission }) => {

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(false);

  useEffect(() => {
    check(permission).then((checkedPerms) => {
      if (checkedPerms === RESULTS.GRANTED) {
        setValue(true);
      }
    }).finally(() => setLoading(false))
    openSettings();

  }, [permission])


  return (
    <HideIfLoading loading={loading}>
      <Container>
        <BooleanConfiguration value={true} config="Ubicacion" />
      </Container>
    </HideIfLoading>
  )

}

export default Permission;

const Container = styled.View`

`