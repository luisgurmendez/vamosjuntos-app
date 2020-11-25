import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from 'utils/colors';
import PressAnimation from 'components/Animations/PressAnimation';
import StartSVG from './Start';

interface ScoreInputProps {
  score?: number;
  size?: number;
  onChange?: (score: number) => void;
}

const ICON_SIZE = 60;

const ScoreInput: React.FC<ScoreInputProps> = ({ size = ICON_SIZE, score, onChange }) => {
  const [value, setValue] = useState(0);

  const _score = score !== undefined ? score : value;

  const handleScoreChange = (value: number) => {
    if (value !== _score) {
      setValue(value);
      onChange && onChange(value);
    } else {
      setValue(0);
      onChange && onChange(0);
    }
  };

  const getColor = (v: number) => {
    return v <= _score ? colors.yellow : colors.border;
  }

  return (
    <Container>
      {[1, 2, 3, 4, 5].map((v) => (
        <PressAnimation key={v} onPress={() => handleScoreChange(v)}>
          <StartSVG color={getColor(v)} size={size} fill={getColor(v)} />
        </PressAnimation>
      ))}
    </Container>
  );
};

export default ScoreInput;

const Container = styled.View`
  display: flex;
  flex-direction: row;
`;
