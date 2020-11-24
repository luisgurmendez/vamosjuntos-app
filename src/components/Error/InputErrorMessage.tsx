import React from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { Text } from 'components/Typography/Typography';

interface InputErrorMessageProps {
  msg: string;
  show: boolean;
}

const InputErrorMessage: React.FC<InputErrorMessageProps> = ({ msg, show }) => {
  if (show) {
    return <ErrorText>{msg}</ErrorText>;
  }

  return null;
};

export default InputErrorMessage;

const ErrorText = styled(Text)`
  color: ${colors.danger};
`;
