import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  size?: number;
}

const ProfilePicPlaceholder: React.FC<Props> = ({ size = 60 }) => {

  return (
    <ProfilePic size={size}>
      <Image
        style={{ flex: 1, width: '100%' }}
        resizeMode="cover"
        source={require('../../assets/profilePlaceholder.jpg')}
      />
    </ProfilePic>
  )
}

export default ProfilePicPlaceholder;

const ProfilePic = styled.View<Props>`
  width: ${props => props.size!}px;
  height: ${props => props.size!}px;
  border-radius: ${props => props.size! / 2}px;
  overflow: hidden;
  border-width: 2px;
  border-color: white;
`
