import PressableIcon from 'components/PressableIcon/PressableIcon';
import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'components/Typography/Typography';

interface YearSelectorProps {
  year: number;
  onYearChange: (month: number) => void;
}


const YearSelector: React.FC<YearSelectorProps> = ({ year, onYearChange }) => {
  const handleIncrementYear = () => {
    const newMonth = (year + 1);
    onYearChange(newMonth);
  };

  const handleDecrementYear = () => {
    const newMonth = (year - 1);
    onYearChange(newMonth);
  };

  return (
    <Container>
      <StyledPressableIcon onPress={handleDecrementYear} name="chevron-left" size={16} />
      <MonthText>{year}</MonthText>
      <StyledPressableIcon onPress={handleIncrementYear} name="chevron-right" size={16} />
    </Container>
  );
};

export default YearSelector;

const Container = styled.View`
  width: 100%;
  display: flex;
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
