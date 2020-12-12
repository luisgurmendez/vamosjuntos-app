import NumberedIcon from 'components/NumberedIcon/NumberedIcon';
import React from 'react'
import styled from 'styled-components/native';

interface RidesAndLiftsProps {
  rides: number;
  lifts: number;
}

const RidesAndLifts: React.FC<RidesAndLiftsProps> = ({ rides, lifts }) => {

  return (
    <Container>
      <NumberedIcon style={{ marginRight: 32 }} icon="thumb-up" number={lifts} />
      <NumberedIcon icon="car" number={rides} />
    </Container>
  )

}

export default RidesAndLifts;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`