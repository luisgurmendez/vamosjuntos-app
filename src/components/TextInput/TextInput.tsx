import React from 'react';
import styled from 'styled-components/native';
import { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps } from 'react-native';
import { colors } from 'utils/colors';
import { Text, SmallBody } from 'components/Typography/Typography';
import { View } from 'react-native';

interface TextInputProps extends NativeTextInputProps {
  error?: string;
  prefix?: string;

}

const TextInput = React.forwardRef<NativeTextInput, TextInputProps>(({ error, prefix, style, ...textInputProps }, forwardedRef) => {
  const showError = error !== undefined;

  return (
    <View style={style}>
      <TextInputContainer error={showError}>
        {prefix && <Text>{prefix}</Text>}
        <TextInputBase
          ref={forwardedRef}
          autoCorrect={false}
          placeholderTextColor="#888"
          clearButtonMode="while-editing"
          {...textInputProps}
        />
      </TextInputContainer>
      {showError && <ErrorText>{error}</ErrorText>}
    </View>
  );
});

export default TextInput;

interface TextInputBaseProps {
  error: boolean;
}

const TextInputContainer = styled.View<TextInputBaseProps>`
  background-color: #e3e3e3;
  padding: 10px 8px;
  border-radius: 4px;
  font-size: 16px;
  font-family: Roboto;
  color: ${colors.black};
  display: flex;
  flex-direction: row;
  align-items: center;
  ${(props) => props.error && `borderColor: ${colors.danger}; borderWidth: 1px;`};
`

const TextInputBase = styled.TextInput`
  background-color: #e3e3e3;
  font-size: 16px;
  font-family: Roboto;
  flex: 1;
  margin-left: 8px;
  color: ${colors.black};
`;

const ErrorText = styled(SmallBody)`
  color: ${colors.danger};
`;
