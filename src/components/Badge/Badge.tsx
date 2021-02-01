import { Text } from 'components/Typography/Typography';
import React from 'react'
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface BadgeProps {
  badge?: number;
  max?: number;
  size?: number;
}

const Badge: React.FC<BadgeProps> = ({ size = 18, max = 100, badge, children }) => {

  if (badge === undefined || badge === 0) {
    return <>{children}</>
  }

  const borderRadius = size / 2;
  const fontSize = Math.floor((size * 3) / 4);

  return (
    <Container pointerEvents="box-none">
      <BadgeContainer style={{
        fontSize,
        lineHeight: size - 1,
        height: size,
        minWidth: size,
        borderRadius,
      }}>{badge < max ? badge : `+${max - 1}`}</BadgeContainer>
      {children}
    </Container>
  )

}

export default Badge;

const Container = styled.View``

const BadgeContainer = styled(Text)`
  background-color: ${colors.notification};
  align-self: flex-end;
  text-align: center;
  padding-horizontal: 4px;
  overflow: hidden;
  position: absolute;
  z-index: 100;
  color: white;
  right: -3px;
  top: -3px;
`