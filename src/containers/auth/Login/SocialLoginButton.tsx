import React, { useState } from 'react';
import Button from 'components/Button/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from 'utils/colors';
import crashlytics from '@react-native-firebase/crashlytics';

interface SocialLoginButtonProps {
  onPress: () => Promise<void>;
  provider: 'Google' | 'Apple' | 'Facebook';
  style?: any;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ onPress, provider, style }) => {
  const [loading, setLoading] = useState(false);

  const handleOnLoginWithSocial = async () => {
    setLoading(true);
    try {
      await onPress();
    } catch (e) {
      console.error(`Error singin in with social, ${provider}`)
      console.error(e)
      crashlytics().log(`Error singin in with social, ${provider}`)
      crashlytics().recordError(e);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      loading={loading}
      style={style}
      type="secondary"
      icon={<Icon name={provider.toLowerCase()} size={25} color={colors.black} />}
      onPress={handleOnLoginWithSocial}
    >
      Ingresa con {provider}
    </Button>
  )
}

export default SocialLoginButton;
