import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { useAnimation } from 'react-native-animation-hooks';
import { Text } from 'components/Typography/Typography';

export enum ToastVariant {
  INFO = 'INFO',
  WARN = 'WARN',
  ALERT = 'ALERT',
  SUCCESS = 'SUCCESS'
}

export interface ToastMessage {
  id: number;
  onDismiss: (id: number) => void;
  variant: ToastVariant;
  title?: string;
  message?: React.ReactNode;
  hideAfter?: number;
}

type VariantStringMap = {
  [key in ToastVariant]: string;
}

const colorByVariant: VariantStringMap = {
  [ToastVariant.INFO]: colors.main,
  [ToastVariant.WARN]: colors.warn,
  [ToastVariant.ALERT]: colors.danger,
  [ToastVariant.SUCCESS]: colors.success,
}

const DISMISS_ANIMATION_DURATION = 300;
const Toast: React.FC<ToastMessage> = ({ variant, id, onDismiss, title, message, hideAfter }) => {

  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);
  const [deleting, setDeleting] = useState(false);

  const dismiss = useCallback(() => {
    onDismiss(id);
  }, [id]);

  const handleDismiss = () => {
    setDeleting(true);
    setTimeout(() => {
      dismiss()
    }, DISMISS_ANIMATION_DURATION)
  }

  useEffect(() => {
    if (hideAfter && hideAfter > 0) {
      setTimeoutId(setTimeout(handleDismiss, hideAfter));
    }

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, []);

  const opacityAnimation = useAnimation({
    type: 'timing',
    initialValue: 0,
    duration: DISMISS_ANIMATION_DURATION,
    toValue: deleting ? 0 : 1,
    useNativeDriver: true
  })

  return (
    <Container variant={variant} style={{
      opacity: opacityAnimation
    }}>
      <TouchableOpacity activeOpacity={0.6} onPress={handleDismiss}>
        <Content>
          {title && <Title>{title}</Title>}
          {message && <Message>{message}</Message>}
        </Content>
      </TouchableOpacity>
    </Container>
  )
}

export default Toast;

const Container = styled(Animated.View) <{ variant: ToastVariant, style: any }>`
  backgroundColor: rgba(255,255,255,0.95);
  borderLeftWidth: 5px;
  borderColor: ${props => colorByVariant[props.variant]};
  margin-bottom: 8px;
  borderRadius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
`

const Content = styled.View`
  margin: 20px 30px;
  display: flex;
  flex-direction: column;
`

const Title = styled(Text)`
  font-weight: 600;
  font-size: 14px;
`

const Message = styled(Text)`
  font-size: 13px;
`