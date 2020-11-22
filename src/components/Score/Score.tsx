import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import StartSVG from './Start';
import { colors } from 'utils/colors';

interface ScoreInputProps {
  score?: number;
}

const ICON_SIZE = 60;

const ScoreInput: React.FC<ScoreInputProps> = ({ score = 0.5 }) => {

  const getScoreValueForItem = (itemIndex: number) => {
    const s = score - itemIndex + 1
    return s > 0 ? s : 0;
  }

  return (
    <Container>
      {[1, 2, 3, 4, 5].map(v => (
        <IconContainer>
          <Icon name="star" color={colors.yellow} key={v} size={ICON_SIZE} />
          <Painted score={getScoreValueForItem(v)}>
            <StartSVG fill={colors.yellow} key={v} color={colors.yellow} size={ICON_SIZE} />
          </Painted>
        </IconContainer>
      ))}
    </Container>
  )

}

export default ScoreInput;

const Container = styled.View`
  display: flex;
  flex-direction:row;
`

// Float between 0 - 1;
const Painted = styled.View<{ score: number }>`
  width: ${props => props.score * ICON_SIZE}px;
  margin-top: 1px;
  position: absolute;
  overflow: hidden;
`

const IconContainer = styled.View`
  width: ${ICON_SIZE};
  height: ${ICON_SIZE};
`