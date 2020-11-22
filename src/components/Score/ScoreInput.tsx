import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from 'utils/colors';
import PressAnimation from 'components/Animations/PressAnimation';
import StartSVG from './Start';

interface ScoreInputProps {
  score?: number;
  onChange?: (score: number) => void;
}

const ICON_SIZE = 60;

const ScoreInput: React.FC<ScoreInputProps> = ({ score, onChange }) => {
  const [value, setValue] = useState(0);

  const _score = score !== undefined ? score : value;

  const handleScoreChange = (value: number) => {
    if (value !== _score) {
      setValue(value);
    } else {
      setValue(0);
    }
  }

  return (
    <Container>
      {[1, 2, 3, 4, 5].map(v => (
        <PressAnimation onPress={() => handleScoreChange(v)}>
          <StartSVG color={colors.yellow} size={ICON_SIZE} fill={v <= _score ? colors.yellow : 'none'} />
        </PressAnimation>
      ))}
    </Container>
  )
}

export default ScoreInput;

const Container = styled.View`
  display: flex;
  flex-direction: row;
`
