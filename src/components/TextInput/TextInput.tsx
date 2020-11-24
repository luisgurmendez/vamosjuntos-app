import React from 'react';
import styled from 'styled-components/native';
import { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps } from 'react-native';
import { colors } from 'utils/colors';
import { SmallBody } from 'components/Typography/Typography';
import { View } from 'react-native';

interface TextInputProps extends NativeTextInputProps {
  error?: string;
}

const TextInput = React.forwardRef<NativeTextInput, TextInputProps>(({ error, ...textInputProps }, forwardedRef) => {
  const showError = error !== undefined;

  return (
    <View>
      <TextInputBase
        ref={forwardedRef}
        autoCorrect={false}
        placeholderTextColor="#888"
        clearButtonMode="while-editing"
        error={showError}
        {...textInputProps}
      />
      {showError && <ErrorText>{error}</ErrorText>}
    </View>
  );
});

export default TextInput;

interface TextInputBaseProps {
  error: boolean;
}

const TextInputBase = styled.TextInput<TextInputBaseProps>`
  background-color: #e3e3e3;
  padding: 10px 8px;
  border-radius: 4px;
  font-size: 16px;
  font-family: Roboto;
  color: ${colors.black};
  ${(props) => props.error && `borderColor: ${colors.danger}; borderWidth: 1px;`};
`;

const ErrorText = styled(SmallBody)`
  color: ${colors.danger};
`;
