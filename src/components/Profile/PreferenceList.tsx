import React from 'react'
import styled from 'styled-components/native';
import { UserPreference } from 'types/models';
import ProfilePreference from './ProfilePreference';

interface PreferenceListProps {
  preferences: UserPreference[]
}

const PreferenceList: React.FC<PreferenceListProps> = ({ preferences, children }) => {

  return (
    <Container>
      {children}
      {preferences.map(pr => <ProfilePreference key={pr} type={pr} />)}
    </Container>
  )

}

export default PreferenceList;

const Container = styled.View`
  max-width:100%;
`
