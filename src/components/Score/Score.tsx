import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import StartSVG from './Start';
import { colors } from 'utils/colors';

interface Size {
  size?: number;
}

interface ScoreInputProps extends Size {
  score?: number;
}

const ICON_SIZE = 60;

const ScoreInput: React.FC<ScoreInputProps> = ({ size = ICON_SIZE, score = 0.5 }) => {
  const getScoreValueForItem = (itemIndex: number) => {
    const s = score - itemIndex + 1;
    return s > 0 ? s : 0;
  };

  return (
    <Container>
      {[1, 2, 3, 4, 5].map((v) => (
        <IconContainer key={v} size={size}>
          <Icon name="star" color={colors.yellow} key={v} size={size} />
          <Painted size={size} score={getScoreValueForItem(v)}>
            <StartSVG fill={colors.yellow} key={v} color={colors.yellow} size={size} />
          </Painted>
        </IconContainer>
      ))}
    </Container>
  );
};

export default ScoreInput;

const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

// Float between 0 - 1;
const Painted = styled.View<ScoreInputProps>`
  width: ${(props) => props.score! * props.size!}px;
  margin-top: 1px;
  position: absolute;
  overflow: hidden;
`;

const IconContainer = styled.View<Size>`
  width: ${props => props.size!}px;
  height: ${props => props.size!}px;
`;
