import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import Loading from 'components/Loading/Loading';
import { Animated, Keyboard, TextStyle, StyleProp, ViewStyle } from 'react-native';
import { Text } from 'components/Typography/Typography';
import { useAnimation } from 'react-native-animation-hooks';
import { BaseButtonProps } from './types';
import { useSilentDisabled } from './utils';
import analytics from 'utils/analytics';
import Icon from 'react-native-vector-icons/Feather';

const ANIAMTION_DURATION = 200;
export type ButtonType = 'primary' | 'secondary' | 'danger';

interface ButtonStyles {
  container: ViewStyle;
  text: TextStyle;
}

interface ButtonProps extends BaseButtonProps {
  type?: ButtonType;
  icon?: string | JSX.Element;
  analyticsKey?: string;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  icon,
  children,
  style,
  textStyle,
  type = 'primary',
  disabled = false,
  loading = false,
  analyticsKey
}) => {
  const [pressing, setPressing] = useState(false);
  const [silentDisabled, setSilentDisabled] = useSilentDisabled();
  const buttonStyles = useButtonStyles(type, disabled);

  const animation = useAnimation({
    type: 'timing',
    toValue: !disabled && pressing ? 1 : 0,
    duration: ANIAMTION_DURATION,
    useNativeDriver: false
  });

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

  const handlePressIn = () => setPressing(true);
  const handlePressOut = () => setPressing(false);

  const iconColor: string = (buttonStyles.text.color as string) || '#fff';

  const iconElement = icon !== undefined ?
    typeof icon === 'string' ? <Icon name={icon} size={25} color={iconColor} /> : icon
    :
    undefined;

  return (
    <ButtonContainer
      style={[
        buttonStyles.container,
        {
          transform: [
            {
              scaleX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.95]
              })
            },
            {
              scaleY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.95]
              })
            }
          ]
        },
        style,
      ]}>
      <TouchableButton
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleOnPress}>
        {loading ? (
          <Loading color={iconColor} />
        ) : (
          <>
            {iconElement}
            <ButtonText style={[buttonStyles.text, textStyle]}>{children}</ButtonText>
          </>
        )}
      </TouchableButton>
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled(Animated.View)`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TouchableButton = styled.TouchableOpacity`
  flex-grow: 1;
  padding: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled(Text)`
  font-size: 18px;
  color: white;
  padding: 4px;
  text-align: center;
  align-items: center;
`;


function useButtonStyles(type: ButtonType, isDisabled: boolean) {
  return isDisabled ? getDisabledStyles() : getStylesByType(type);
}

const getDisabledStyles = (): ButtonStyles => {
  return {
    container: {
      backgroundColor: colors.invalid
    },
    text: {
      color: colors.white
    }
  };
};

const getStylesByType = (type: ButtonType): ButtonStyles => {
  const primaryColor: ButtonStyles = {
    container: {
      backgroundColor: colors.main
    },
    text: {
      color: colors.white
    }
  };

  switch (type) {
    case 'primary':
      return primaryColor;
    case 'secondary':
      return {
        container: {
          backgroundColor: colors.white
        },
        text: {
          color: colors.black
        }
      };
    case 'danger':
      return {
        container: {
          backgroundColor: colors.danger
        },
        text: {
          color: colors.white
        }
      };
    default: {
      return primaryColor;
    }
  }
};
