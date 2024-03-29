import React from 'react';
import { Image, ImageErrorEventData, NativeSyntheticEvent } from 'react-native';
import styled from 'styled-components/native';
import crashlytics from '@react-native-firebase/crashlytics'
import { PROFILE_PLACEHOLDER_IMG } from 'assets/images';

interface Props {
  size?: number;
  img?: string;
}

const ProfilePic: React.FC<Props> = ({ img, size = 60 }) => {

  const handleDownloadImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    crashlytics().recordError(e.nativeEvent.error, 'ImageError');
  }

  return (
    <ProfilePicBase size={size}>
      <Image
        onError={handleDownloadImageError}
        style={{ flex: 1, width: '100%' }}
        resizeMode="cover"
        source={img ? { uri: img, cache: 'force-cache' } : PROFILE_PLACEHOLDER_IMG}
      />
    </ProfilePicBase>
  )
}

export default ProfilePic;

const ProfilePicBase = styled.View<Props>`
  width: ${props => props.size!}px;
  height: ${props => props.size!}px;
  border-radius: ${props => props.size! / 2}px;
  overflow: hidden;
  border-width: 2px;
  border-color: white;
`
