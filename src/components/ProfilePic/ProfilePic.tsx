import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  size?: number;
  img?: string;
}

const ProfilePic: React.FC<Props> = ({ img, size = 60 }) => {

  return (
    <ProfilePicBase size={size}>
      <Image
        style={{ flex: 1, width: '100%' }}
        resizeMode="cover"
        source={img ? { uri: img } : require('../../assets/profilePlaceholder.jpg')}
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
