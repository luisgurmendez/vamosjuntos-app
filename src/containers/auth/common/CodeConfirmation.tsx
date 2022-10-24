import TextInput from 'components/TextInput/TextInput';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Button from 'components/Button/Button';
import PlainButton from 'components/Button/PlainButton';

interface CodeConfirmationProps {
  phone: string;
  onConfirmed: () => void;
}

const CodeConfirmation: React.FC<CodeConfirmationProps> = ({ phone, onConfirmed }) => {

  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | undefined>(undefined);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth().verifyPhoneNumber(phoneNumber);
      console.log(confirmation);
    } catch (e) {
      console.log(e);
    }

    // setConfirm(confirmation);
  }

  async function confirmCode() {
    if (confirm) {
      try {
        await confirm.confirm(code);
        onConfirmed();
      } catch (error) {
        console.log('Invalid code.');
      }
    }
  }

  useEffect(() => {
    signInWithPhoneNumber(`+598${phone}`)
  }, [])


  return (
    <Container>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button analyticsKey={'auth_code_confirmation'} loading={confirm === undefined} onPress={confirmCode}>Confirmar código</Button>
      <PlainButton>Mandar devuelta</PlainButton>
    </Container>
  )

}

export default CodeConfirmation;

const Container = styled.View`
  flex: 1;
  padding: 32px;
`