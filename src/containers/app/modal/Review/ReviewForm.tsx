import React from 'react';

import ScoreInput from 'components/Score/ScoreInput';
import { Subtitle } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { User } from 'types/models';

const ScoreFormSchema = Yup.object().shape({
  score: Yup.number().moreThan(0).required(),
  comment: Yup.string()
});

export interface ReviewFormValues {
  score: number;
  comment: string;
}

const initialValues: ReviewFormValues = {
  score: 0,
  comment: ''
}

interface ReviewFormProps {
  onSubmit: (vals: ReviewFormValues) => void;
  toUser: User;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ toUser, onSubmit }) => {

  return (
    <Formik validateOnMount validationSchema={ScoreFormSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, setFieldValue, isSubmitting, handleSubmit, values, isValid }) => (
        <Content>
          <FieldsContainer>
            <ScoreContainer>
              <Subtitle>¿Como estuvo tu viaje con {toUser.name}? <RequiredFieldText>*</RequiredFieldText></Subtitle>
              <ScoreInput score={values.score} onChange={(score) => setFieldValue('score', score)} />
            </ScoreContainer>
            <CommentContainer>
              <Subtitle>Deja un comentario</Subtitle>
              <MultilinedTextInput
                placeholder="ej. Maneja con cuidado"
                value={values.comment}
                multiline
                numberOfLines={4}
                onChangeText={handleChange('comment')}
              />
            </CommentContainer>
          </FieldsContainer>
          <Button disabled={!isValid} loading={isSubmitting} onPress={handleSubmit} >Commentar</Button>
        </Content>
      )}
    </Formik>
  )
}

export default ReviewForm


const RequiredFieldText = styled.Text`
  color: ${colors.danger};
`

const CommentContainer = styled.View`
  margin-top: 64px;
`

const Content = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`

const ScoreContainer = styled.View`
  align-items: center;
`

const FieldsContainer = styled.View``

const MultilinedTextInput = styled(TextInput)`
  max-height: 100px;
`