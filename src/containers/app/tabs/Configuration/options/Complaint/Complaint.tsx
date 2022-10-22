import { useNavigation } from '@react-navigation/native';
import Button from 'components/Button/Button';
import DismissKeyboard from 'components/Keyboard/DismissKeyboardView';
import PageWithBack from 'components/Page/PageWithBack';
import TextInput from 'components/TextInput/TextInput';
import Toaster from 'components/Toaster/Toaster';
import { Body } from 'components/Typography/Typography';
import useCallable from 'hooks/useCallable';
import React from 'react'
import { useState } from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface ComplaintProps { }

const Complaint: React.FC<ComplaintProps> = ({ }) => {

  const [complaint, setComplaint] = useState('');
  const [isSendingComplaint, setSendingComplaint] = useState(false);
  const sendComplaint = useCallable('/complaint/create');

  const navigation: any = useNavigation();

  const handleSendComplaint = async () => {
    setSendingComplaint(true);
    try {
      await sendComplaint({ complaint });
      navigation.goBack();
      Toaster.success({ title: 'Tu queja se guardo', message: 'Vamos a revisarla y te contactaremos si es necesario.' })
    } catch (e) {
      Toaster.alert('Error guardando tu queja.')
    }
    setSendingComplaint(false);
  }

  const handleGoToInstagram = () => {
    Linking.openURL(`instagram://user?username=vamosjuntos.uy`);
  }

  return (
    <PageWithBack title="Quejate">
      <DismissKeyboard>
        <Content>
          <Body style={{ marginBottom: 8 }}>
            {`Contános que pasó y si queres dejanos un mail o número de contacto. \n\nTambién nos podés escribir a nuestra cuenta de instagram `}
            <Body style={{ color: colors.main }} onPress={handleGoToInstagram}> @vamosjuntos.uy</Body>
          </Body>
          <MultilinedTextInput
            placeholder="No puedo cancelar viajes."
            value={complaint}
            multiline
            numberOfLines={6}
            onChangeText={setComplaint}
          />
          <Button loading={isSendingComplaint} onPress={handleSendComplaint}>Mandar</Button>
        </Content>
      </DismissKeyboard>
    </PageWithBack>
  )
}

export default Complaint;

const MultilinedTextInput = styled(TextInput)`
  max-height: 160px;
  margin-bottom: 32px;  
`
const Content = styled.View`
  display:flex;
  flex-direction: column;
  flex: 1;
  padding: 32px;
`