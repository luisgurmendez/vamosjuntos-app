


import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import Comment from './Comment';
import { Review } from 'types/models';

interface CommentListProps {
  reviews: Review[];
}

const CommentList: React.FC<CommentListProps> = ({ reviews }) => {

  const renderComment = ({ item }: ListRenderItemInfo<Review>) => {
    return <Comment review={item} />
  }

  return (
    <FlatList<Review> keyExtractor={(c, i) => i.toString()} data={reviews} renderItem={renderComment} />
  )
}

export default CommentList;