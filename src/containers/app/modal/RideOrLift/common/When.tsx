import Calendar from 'components/Calendar/Calendar';
import Wizard, { WizardProps } from 'components/Wizard/Wizard';
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Subtitle, Text } from 'components/Typography/Typography';
import HourInput from 'components/Input/HourInput';
import KeyboardShift from 'components/Keyboard/KeyboardShift';
import { Box } from 'components/Box/Box';
import { ScrollView } from 'react-native-gesture-handler';
import { getDateText } from 'utils/date';

interface WhenProps {
  nextScreen?: string;
  action?: WizardProps['action'];
  date?: moment.Moment;
  onDateChange?: (date: moment.Moment) => void;
}

const When: React.FC<WhenProps> = ({ date = moment(), action, nextScreen, onDateChange }) => {

  const handleHourChange = (hour: number, mins: number) => {
    const _date = date.clone();
    _date.set({ hour: hour, minutes: mins });
    onDateChange && onDateChange(_date);
  };

  const handleDateChange = (value: moment.Moment) => {
    const _date = date.clone();
    _date.set({ date: value.date(), month: value.month() });
    onDateChange && onDateChange(_date);
  };

  return (
    <Wizard action={action} nextScreen={nextScreen} title="¿Cuando?">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardShift>
          <Container>
            <Box mt="xxlg">
              <MarginedSubtitle>{getDateText(date)}</MarginedSubtitle>
              <Calendar selectedDate={date} onSelectDate={handleDateChange} />
            </Box>
            <Box mt="xxxxlg">
              <MarginedSubtitle>{date.format('[A las] HH:mm')}</MarginedSubtitle>
              <HourInput onHourChange={handleHourChange} value={date.format('HH:mm')} />
            </Box>
          </Container>
        </KeyboardShift>
      </ScrollView>
    </Wizard>
  );
};

export default When;

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  width: 100%;
`;

const MarginedSubtitle = styled(Subtitle)`
  margin-bottom: 16px;
`;
