import BackArrow from 'components/Back/BackArrow';
import { Title } from 'components/Typography/Typography';
import React from 'react'
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface HeaderProps {
  showBack?: boolean;
  title?: string;
  secondaryAction?: React.ReactNode;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({ style, showBack, title, secondaryAction }) => {

  return (
    <Container style={style}>
      {showBack ? <BackArrow /> : <Placeholder />}
      <ExpandedTitle>{title}</ExpandedTitle>
      {secondaryAction ? secondaryAction : <Placeholder />}
    </Container>
  )
}

export default Header;

const Container = styled.View`
  display: flex;
  padding: 8px 0px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 100;
`;

const ExpandedTitle = styled(Title)`
  flex: 1 1 auto;
  text-align: center;
`

const Placeholder = styled.View`
  padding: 20px;
`;