import React from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { Text } from 'components/Typography/Typography';
import PressAnimation from 'components/Animations/PressAnimation';
import PressableIcon from 'components/PressableIcon/PressableIcon';

interface NumberSelectProps {
  count: number;
  onChange?: (count: number) => void;
  min?: number;
  max?: number;
}

const NumberSelect: React.FC<NumberSelectProps> = ({ count, min = 0, max = 20, onChange }) => {

  const handleIncrement = () => {
    const newCount = count + 1;
    if (newCount <= max) {
      onChange && onChange(newCount)
    }
  }
  const handleDecrement = () => {
    const newCount = count - 1;
    if (newCount >= min) {
      onChange && onChange(newCount)
    }
  }

  return (
    <Container>
      <PressableIcon onPress={handleDecrement} name="minus" color={count === min ? colors.invalid : colors.main} size={50} />
      <Count>{count}</Count>
      <PressableIcon onPress={handleIncrement} name="plus" color={count === max ? colors.invalid : colors.main} size={50} />
    </Container>
  );
}

export default NumberSelect;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
`

const Count = styled(Text)`
  color: ${colors.black};
  font-size: 60px;
`