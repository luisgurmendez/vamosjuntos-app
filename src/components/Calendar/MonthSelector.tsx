import PressableIcon from 'components/PressableIcon/PressableIcon';
import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'components/Typography/Typography';
import { colors } from 'utils/colors';
import moment from 'moment';

interface MonthSelectorProps {
  month: number;
  onMonthChange: (month: number) => void;
}

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

const MonthSelector: React.FC<MonthSelectorProps> = ({ month, onMonthChange }) => {
  const handleIncrementMonth = () => {
    const newMonth = (month + 1) % 12;
    onMonthChange(newMonth);
  };

  const handleDecrementMonth = () => {
    const newMonth = month === 0 ? 11 : month - 1;
    onMonthChange(newMonth);
  };

  return (
    <Container>
      <StyledPressableIcon onPress={handleDecrementMonth} name="chevron-left" size={16} />
      <MonthText>{months[month]}</MonthText>
      <StyledPressableIcon onPress={handleIncrementMonth} name="chevron-right" size={16} />
    </Container>
  );
};

export default MonthSelector;

const Container = styled.View`
  width: 100%;
  display: flex;
  margin-top: 16px;
  margin-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MonthText = styled(Text)`
  font-size: 18px;
`;

const StyledPressableIcon = styled(PressableIcon)`
  padding: 12px;
`;
