


import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import Comment from './Comment';
import { Comment as CommentModel } from 'types/models';

const CommentList: React.FC = () => {

  const comments: CommentModel[] = (new Array(6).fill(0)).map(i => ({ user: 'Luis Gurmendez', comment: 'Es un hdp', score: Math.floor(Math.random() * 5) + 1 }))

  const renderComment = ({ item }: ListRenderItemInfo<CommentModel>) => {
    return <Comment {...item} />
  }

  return (
    <FlatList<CommentModel> keyExtractor={(c, i) => i.toString()} data={comments} renderItem={renderComment} />
  )
}

export default CommentList;