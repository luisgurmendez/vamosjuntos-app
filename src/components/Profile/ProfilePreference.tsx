import React from 'react'
import styled from 'styled-components/native';
import { Body } from 'components/Typography/Typography';
import { colors } from 'utils/colors';
import { UserPreference } from 'types/models';
import PreferenceIcon from './PreferenceIcon';


const preferenceTypeToText = {
  'noSmoke': 'No me banco el ciagarro en el auto',
  'smoke': 'No me molesta que fumes',
  'noPets': '¿Y si mea?',
  'pet': 'Es tan lindo, ¿lo puedo acariciar?',
  'music': 'Subi el volumen!',
  'noMusic': '¿Podes bajar el volumen? Gracias',
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