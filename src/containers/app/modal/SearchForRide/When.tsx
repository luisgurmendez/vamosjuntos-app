import React from 'react';

import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Page/Header';
import WhenCommon from 'components/When/When';
import { useSearchForRide } from './useSearchForRide';
import moment, { Moment } from 'moment';
import Button from 'components/Button/Button';

const When: React.FC = () => {
  const [date, setDate] = useDateState();
  const navigation = useNavigation<any>();

  const handleClose = () => {
    navigation.goBack();
  }

  const handleDateChange = (mDate: Moment) => {
    setDate(mDate.toISOString());
  }

  return (
      <Container>
        <Header showBack>title</Header>
        <Content>
          <WhenCommon date={date} onDateChange={handleDateChange} />
          <Button onPress={handleClose}>Listo</Button>
        </Content>
      </Container>
  );
};

export default When;

function useDateState(): [Moment, (d: string)=>void]{
  const {date, setDate} = useSearchForRide();
  return [moment(date), setDate];
}


const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0px 16px;
`

const Content = styled.View`
  padding:  0px 16px;
  flex: 1;
`