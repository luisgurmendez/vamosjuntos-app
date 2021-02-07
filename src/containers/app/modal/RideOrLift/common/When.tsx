import Calendar from 'components/Calendar/Calendar';
import Wizard, { WizardProps } from 'components/Wizard/Wizard';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components/native';
import { Subtitle } from 'components/Typography/Typography';
import TimePicker from 'components/Input/TimePicker';
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
              <TimePicker onTimeChange={onDateChange} date={date} />
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
