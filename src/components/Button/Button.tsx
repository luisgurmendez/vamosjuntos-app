import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import Icon from 'react-native-vector-icons/Feather';
import Loading from 'components/Loading/Loading';
import { Animated, Keyboard, TextStyle, ViewStyle } from 'react-native';
import { Text } from 'components/Typography/Typography';
import { useAnimation } from 'react-native-animation-hooks';

const ANIAMTION_DURATION = 200;
export type ButtonType = 'primary' | 'secondary' | 'danger';

interface ButtonStyles {
  container: ViewStyle;
  text: TextStyle;
}

interface ButtonProps {
  onPress?: () => void;
  icon?: string;
  children: React.ReactNode;
  type?: ButtonType;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  icon,
  children,
  style,
  type = 'primary',
  disabled = false,
  loading = false
}) => {
  const [pressing, setPressing] = useState(false);

  const animation = useAnimation({
    type: 'timing',
    toValue: !disabled && pressing ? 1 : 0,
    duration: ANIAMTION_DURATION,
    useNativeDriver: false
  });

  if (style === undefined) {
    style = {
      container: {},
      text: {}
    };
  }

  const handleOnPress = () => {
    Keyboard.dismiss();
    if (!loading && onPress) {
      onPress();
    }
  };

  const buttonStyles = getDisabledStyles(disabled) || getStylesByType(type);

  const handlePressIn = () => setPressing(true);
  const handlePressOut = () => setPressing(false);

  const iconColor: string = (buttonStyles?.text?.color as string) || '#fff';

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
        style
      ]}>
      <TouchableButton
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleOnPress}>
        {loading ? (
          <Loading />
        ) : (
            <>
              {icon !== undefined && <Icon name={icon} size={25} color={iconColor} />}
              <ButtonText style={buttonStyles.text}>{children}</ButtonText>
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

const getDisabledStyles = (disabled: boolean): ButtonStyles | undefined => {
  if (disabled) {
    return {
      container: {
        backgroundColor: colors.invalid
      },
      text: {
        color: colors.white
      }
    };
  }
  return undefined;
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
