import React from 'react';
import styled from 'styled-components/native';
import { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps } from 'react-native';
import { colors } from 'utils/colors';
import { Text, SmallBody, Body } from 'components/Typography/Typography';
import { View } from 'react-native';

interface TextInputProps extends NativeTextInputProps {
  error?: string;
  prefix?: React.ReactNode | string;
  label?: string;
  required?: boolean;
  textInputStyle?: any;
  textInputContainerStyle?: any;

}

const TextInput = React.forwardRef<NativeTextInput, TextInputProps>(({
  error,
  label,
  prefix,
  required = false,
  style,
  textInputStyle,
  textInputContainerStyle,
  ...textInputProps
}, forwardedRef) => {
  const showError = error !== undefined;
  const color = textInputStyle?.backgroundColor ?? '#e3e3e3';
  let Prefix = null;
  if (prefix !== undefined) {
    Prefix = typeof prefix === 'string' ? <Text>{prefix}</Text> : prefix;
  }

  return (
    <View style={style}>
      {label && <Body>{required ? <Body style={{ color: colors.danger }}>* </Body> : null}{label}:</Body>}
      <TextInputContainer style={[{ backgroundColor: color }, textInputContainerStyle]} error={showError} >
        {Prefix !== null && Prefix}
        <TextInputBase
          ref={forwardedRef}
          autoCorrect={false}
          placeholderTextColor="#888"
          clearButtonMode="while-editing"
          style={[{ backgroundColor: color }, textInputStyle]}
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
  font-size: 16px;
  font-family: Roboto;
  flex: 1;
  margin-left: 8px;
  color: ${colors.black};
  padding: 0px;
`;

const ErrorText = styled(SmallBody)`
  color: ${colors.danger};
`;

