import Calendar from 'components/Calendar/Calendar';
import Wizard from 'components/Wizard/Wizard';
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { LiftScreens } from '../LiftScreens';
import { Subtitle, Text } from 'components/Typography/Typography';
import { colors } from 'utils/colors';
import { View } from 'react-native';
import HourInput from 'components/Input/HourInput';
import KeyboardShift from 'components/Keyboard/KeyboardShift';
import { Box } from 'components/Box/Box';
import { ScrollView } from 'react-native-gesture-handler';

moment.locale('es')
const When: React.FC = () => {

  const [selectedDate, setSelectedDate] = useState(moment().startOf('day'));

  const handleHourChange = (hour: number, mins: number) => {
    const _date = selectedDate.clone();
    _date.set({ hour: hour, minutes: mins });
    setSelectedDate(_date);
  }

  const handleDateChange = (date: moment.Moment) => {
    const _date = selectedDate.clone();
    _date.set({ date: date.date(), month: date.month() });
    setSelectedDate(_date);
  }

  return (
    <Wizard nextScreen={LiftScreens.LIFT_WHERE_FROM} title="¿Cuando?">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
        <KeyboardShift>
          <Container>
            <View>
              <MarginedSubtitle>El ...</MarginedSubtitle>
              <Calendar selectedDate={selectedDate} onSelectDate={handleDateChange} />
            </View>
            <Box mt="xxxxlg">
              <MarginedSubtitle>A las ...</MarginedSubtitle>
              <HourInput onHourChange={handleHourChange} value={selectedDate.format('HH:mm')} />
            </Box>
            <SelectedDateContainer>
              <SelectedDateText>{selectedDate.format('[El] ddd DD [de] MMM [a las] HH:mm')}</SelectedDateText>
            </SelectedDateContainer>
          </Container>
        </KeyboardShift>
      </ScrollView>
    </Wizard>
  )
}

export default When;

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  width: 100%;
`

const SelectedDateText = styled(Text)`
  color: ${colors.main};
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`

const MarginedSubtitle = styled(Subtitle)`
  margin-bottom: 16px;
`

const SelectedDateContainer = styled.View`
  flex: 1;
  justify-content: center;
`