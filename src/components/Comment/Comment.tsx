import Shadow from 'components/Shadow/Shadow';
import { Stylable } from 'components/types';
import { Body, Bold, SmallBody } from 'components/Typography/Typography';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import ScoreDisplay from 'components/Score/Score'
import { Box } from 'components/Box/Box';
import { Review } from 'types/models';

interface CommentProps {
  review: Review;
  style?: ViewStyle;
}

const Comment: React.FC<CommentProps> = ({ review, style }) => {

  return (
    <Container style={style} r>
      <Header>
        <Box mr="md">
          <Body><Bold>{review.fromUser.name}</Bold></Body>
        </Box>
        <ScoreDisplay score={review.score} size={15} />
      </Header>
      <Content>
        <SmallBody>{review.comment}</SmallBody>
      </Content>
    </Container>
  )
}

export default Comment;

const Container = styled.View`
  padding-vertical: 16px;
  padding-horizontal: 8px;
  background-color: ${colors.white};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`


const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Content = styled.View`
  margin-top: 4px;
  padding-left: 16px;
`