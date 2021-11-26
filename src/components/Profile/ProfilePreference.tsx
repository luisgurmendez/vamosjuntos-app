import React from 'react'
import styled from 'styled-components/native';
import { Body } from 'components/Typography/Typography';
import { colors } from 'utils/colors';
import { UserPreference } from 'types/models';
import PreferenceIcon from './PreferenceIcon';


const preferenceTypeToText = {
  'noSmoke': 'No me banco el ciagarro en el auto',
  'smoke': 'No me molesta que fumes',
  'noPets': 'Perdon, no me gustan los animales',
  'pet': '¡Amo los animales!',
  'music': '¡Subi el volumen!',
  'noMusic': 'Me molesta la musica',
  'alwaysMask': 'Nos cuidamos entre todos',
  'talk': 'Bla bla bla bla, hablo como loco',
  'noTalk': 'No me hables'
}

interface ProfilePreferenceProps {
  type: UserPreference;
}

const ProfilePreference: React.FC<ProfilePreferenceProps> = ({ type }) => {

  return (
    <Container>
      <PreferenceIcon type={type} />
      <PreferenceText>{preferenceTypeToText[type]}</PreferenceText>
    </Container>
  )
}

export default ProfilePreference;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

const PreferenceText = styled(Body)`
  color: ${colors.gray};
  margin-left: 16px;
  flex: 1 1 auto;
`