import React, { useState } from 'react';

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
  const [innerMomentDate, setInnerDate] = useState<Moment>(moment(date));
  const navigation = useNavigation<any>();

  const handleClose = () => {
    setDate(innerMomentDate.toISOString());
    navigation.goBack();
  }

  return (
    <Container>
      <Header showBack />
      <Content>
        <WhenCommon date={innerMomentDate} onDateChange={setInnerDate} />
        <Button analyticsKey={'search_ride_select_date'} onPress={handleClose}>Listo</Button>
      </Content>
    </Container>
  );
};

export default When;

function useDateState(): [string, (d: string) => void] {
  const { date, setDate } = useSearchForRide();
  return [date, setDate];
}


const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0px 16px;
`

const Content = styled.View`
  padding:  0px 16px;
  flex: 1;
`