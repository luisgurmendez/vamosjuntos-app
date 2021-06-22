import React, { useState } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import MonthSelector from './MonthSelector';
import SelectableCell from './SelectableCell';

interface CalendarProps {
  selectedDate: moment.Moment;
  onSelectDate?: (date: moment.Moment) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate }) => {
  const today = moment();
  const [month, setMonth] = useState(selectedDate.month());

  // Go to the last Sunday of previous month
  const iteratingDay = moment(month + 1, 'MM')
    .subtract(1, 'month')
    .endOf('month')

  if (iteratingDay.weekday() !== 6) {
    iteratingDay.startOf('week');
    iteratingDay.subtract(1, 'day');
  }

  const firstSundayOfNextMonth = moment(month + 1, 'MM').endOf('month');
  const numOfWeeks = firstSundayOfNextMonth.diff(iteratingDay, 'days') / 7;

  const renderWeeks = () => {
    const weeks = [];
    for (let i = 0; i < numOfWeeks; i++) {
      weeks.push(
        <Row key={i}>
          {[1, 2, 3, 4, 5, 6, 7].map((j) => {
            iteratingDay.add(1, 'day');
            const isInThisMonth = iteratingDay.month() === month;
            const isSelectable = isInThisMonth && iteratingDay.isSameOrAfter(today, 'day');
            const isSelected = iteratingDay.isSame(selectedDate, 'day') && isInThisMonth;
            const date = iteratingDay.clone();
            return (
              <SelectableCell
                key={j}
                onSelect={onSelectDate}
                disabled={!isSelectable}
                selected={isSelected}
                date={date}>
                <CenteredText>{isInThisMonth ? date.date() : null}</CenteredText>
              </SelectableCell>
            );
          })}
        </Row>
      );
    }
    return weeks;
  };

  return (
    <CalendarContainer>
      <MonthSelector month={month} onMonthChange={setMonth} />
      <HeaderRow>
        <Cell>
          <HeaderLabel>L</HeaderLabel>
        </Cell>
        <Cell>
          <HeaderLabel>M</HeaderLabel>
        </Cell>
        <Cell>
          <HeaderLabel>M</HeaderLabel>
        </Cell>
        <Cell>
          <HeaderLabel>J</HeaderLabel>
        </Cell>
        <Cell>
          <HeaderLabel>V</HeaderLabel>
        </Cell>
        <Cell>
          <HeaderLabel>S</HeaderLabel>
        </Cell>
        <Cell>
          <HeaderLabel>D</HeaderLabel>
        </Cell>
      </HeaderRow>
      <RowsContainer>{renderWeeks()}</RowsContainer>
    </CalendarContainer>
  );
};

export default Calendar;

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

const HeaderRow = styled(Row)`
  border-top-width: 0;
`;

const Cell = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  padding: 10px;
`;

const CalendarContainer = styled.View`
  background-color: white;
  border-radius: 10px;
`;

const RowsContainer = styled.View``;

const CenteredText = styled.Text`
  text-align: center;
  flex: 1;
`;

const HeaderLabel = styled(CenteredText)`
  color: rgba(0, 0, 0, 0.54);
`;
