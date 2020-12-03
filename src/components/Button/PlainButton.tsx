import Loading from 'components/Loading/Loading';
import React from 'react'
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { BaseButtonProps } from './types';
import { useSilentDisabled } from './utils';
import { Text } from 'components/Typography/Typography';
import { colors } from 'utils/colors';

interface PlainButtonProps extends BaseButtonProps { }

const PlainButton: React.FC<PlainButtonProps> = ({
  loading,
  disabled,
  onPress,
  children,
  style
}) => {
  const [silentDisabled, setSilentDisabled] = useSilentDisabled()

  const handleOnPress = () => {
    Keyboard.dismiss();
    if (!loading && !silentDisabled && onPress) {
      onPress();
      setSilentDisabled(true);
    }
  };

  return (
    <TouchableButton
      style={style}
      disabled={disabled}
      onPress={handleOnPress}>
      {loading ? (
        <Loading size={15} />
      ) : (
          <ButtonText>{children}</ButtonText>
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