import { Box } from 'components/Box/Box';
import TextInput from 'components/TextInput/TextInput';
import { Body } from 'components/Typography/Typography';
import React from 'react';
import { useState } from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

const SaveAddress: React.FC = () => {
  const [saveAddress, setSaveAddress] = useState(false);

  return (
    <SaveAddressContainer>
      <SwitchContainer>
        <MarginedBody>Guardar dirección</MarginedBody>
        <Switch value={saveAddress} onValueChange={setSaveAddress} trackColor={{ true: colors.main, false: '' }} />
      </SwitchContainer>
      {saveAddress && <TextInput placeholder="Nombre" />}
    </SaveAddressContainer>
  )
}

export default SaveAddress;

const SaveAddressContainer = styled.View`
  display: flex;
  flex-direction: column;
`

const SwitchContainer = styled.View`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

const MarginedBody = styled(Body)`
  margin-right: 12px;
`