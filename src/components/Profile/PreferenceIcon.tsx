import React from 'react'
import { colors } from 'utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FaceMaskSVG from './FaceMaskSVG';
import { UserPreference } from 'types/models';
import { TouchableOpacity } from 'react-native';

const preferenceTypeToIcon = {
  'noSmoke': 'smoking-off',
  'smoke': 'smoking',
  'noPets': 'paw-off',
  'pet': 'paw',
  'music': 'music',
  'noMusic': 'music-off',
  'alwaysMask': 'face-mask',
  'talk': 'chat-outline',
  'noTalk': 'chat-alert-outline'
}

interface PreferenceIconProps {
  type: UserPreference;
  color?: string;
  onPress?: () => void;
}

const PreferenceIcon: React.FC<PreferenceIconProps> = ({ type, color = colors.gray, onPress }) => {

  const IconComp = type === 'alwaysMask' ? FaceMaskSVG : Icon;

  return (
    <TouchableOpacity onPress={onPress} disabled={onPress === undefined}>
      <IconComp size={30} color={color} name={preferenceTypeToIcon[type]} />
    </TouchableOpacity>
  )

}

export default PreferenceIcon;
