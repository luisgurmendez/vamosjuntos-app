import { useNavigation } from '@react-navigation/native';
import { sendComplaint } from 'api/adedo';
import Button from 'components/Button/Button';
import PageWithBack from 'components/Page/PageWithBack';
import TextInput from 'components/TextInput/TextInput';
import Toaster from 'components/Toaster/Toaster';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components/native';

interface ComplaintProps {
}

const Complaint: React.FC<ComplaintProps> = ({ }) => {

  const [complaint, setComplaint] = useState('');
  const [isSendingComplaint, setSendingComplaint] = useState(false);

  const navigation: any = useNavigation();

  const handleSendComplaint = async () => {
    setSendingComplaint(true);
    try {
      await sendComplaint(complaint);
      navigation.goBack();
      Toaster.success('Queja guarada.')
    } catch (e) {
      Toaster.alert('Error guardando tu queja.')
    }
    setSendingComplaint(false);

  }

  return (
    <PageWithBack title="Quejate">
      <Content>
        <MultilinedTextInput
          placeholder="Contanos que paso"
          value={complaint}
          multiline
          numberOfLines={6}
          onChangeText={setComplaint}
        />
        <Button loading={isSendingComplaint} onPress={handleSendComplaint}>Mandar</Button>
      </Content>
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