import Loading from 'components/Loading/Loading';
import React from 'react'
import { Keyboard, TextStyle } from 'react-native';
import styled from 'styled-components/native';
import { BaseButtonProps } from './types';
import { useSilentDisabled } from './utils';
import { Text } from 'components/Typography/Typography';
import { colors } from 'utils/colors';
import analytics from 'utils/analytics';

export interface PlainButtonProps extends BaseButtonProps {
  textStyle?: TextStyle;
  analyticsKey?: string;
}

const PlainButton: React.FC<PlainButtonProps> = ({
  loading,
  disabled,
  onPress,
  children,
  textStyle,
  style,
  analyticsKey
}) => {
  const [silentDisabled, setSilentDisabled] = useSilentDisabled()

  const handleOnPress = () => {
    Keyboard.dismiss();
    if (!loading && !silentDisabled && onPress) {
      onPress();
      setSilentDisabled(true);
      if (analyticsKey) {
        analytics.logEvent(`${analyticsKey}_btn_p`)
      }
    }
  };

  return (
    <TouchableButton
      style={style}
      disabled={disabled}
      onPress={handleOnPress}>
      {loading ? (
        <Loading color={colors.main} size={15} />
      ) : (
        <ButtonText style={[{ color: colors.main }, textStyle]}>{children}</ButtonText>
      )}
    </TouchableButton>
  )

}

export default PlainButton;

const TouchableButton = styled.TouchableOpacity`
  padding: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled(Text)`
  font-size: 16px;
  color: ${colors.main};
`