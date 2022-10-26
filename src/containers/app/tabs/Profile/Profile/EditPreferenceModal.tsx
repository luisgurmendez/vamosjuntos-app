import React from 'react';
import Modal from 'react-native-modal';
import { Subtitle } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import { Box } from 'components/Box/Box';
import PreferenceIcon from 'components/Profile/PreferenceIcon';
import { UserPreference } from 'types/models';
import { colors } from 'utils/colors';
import { removeItem } from 'utils/array';

function getNegativePreference(p: UserPreference): UserPreference | undefined {
  const negatives: any = {
    [UserPreference.SMOKE]: UserPreference.NO_SMOKE,
    [UserPreference.NO_SMOKE]: UserPreference.SMOKE,
    [UserPreference.PET]: UserPreference.NO_PETS,
    [UserPreference.NO_PETS]: UserPreference.PET,
    [UserPreference.TALK]: UserPreference.NO_TALK,
    [UserPreference.NO_TALK]: UserPreference.TALK,
    [UserPreference.MUSIC]: UserPreference.NO_MUSIC,
    [UserPreference.NO_MUSIC]: UserPreference.MUSIC,
  }

  return negatives[p];
}

interface EditPreferenceModalProps {
  open: boolean;
  onClose: () => void;
  onChange?: (prefs: UserPreference[]) => void;
  preferences?: UserPreference[]
}

const EditPreferenceModal: React.FC<EditPreferenceModalProps> = ({ preferences, onChange, open, onClose }) => {

  const allPreferences = Object.values(UserPreference);

  const handlePreferencePress = (p: UserPreference) => {

    let _preferences = preferences ? [...preferences] : [];
    if (_preferences.includes(p)) {
      _preferences = removeItem(_preferences, p);
    } else {
      _preferences.push(p);
      // Remove the negative of this preferences, eg. clicked on smoke -> remove noSmoke.
      const negativePreference = getNegativePreference(p);
      if (negativePreference) {
        _preferences = removeItem(_preferences, negativePreference);
      }
    }

    onChange && onChange(_preferences);
  }

  return (
    <Modal isVisible={open} onBackdropPress={onClose} backdropTransitionOutTiming={0}>
      <Content>
        <Subtitle>
          Editá tus preferencias de viaje
        </Subtitle>
        <PreferencesContainer mt={"lg"}>
          {allPreferences.map(p => (
            <Box mH="xs" key={p}>
              <PreferenceIcon onPress={() => handlePreferencePress(p)} type={p} color={preferences?.includes(p) ? colors.main : undefined} />
            </Box>
          ))}
        </PreferencesContainer>
      </Content>
    </Modal>
  )
}

export default EditPreferenceModal;

const Content = styled.View`
  backgroundColor: ${colors.white};
  padding: 22px;
  justifyContent: center;
  alignItems: center;
  borderRadius: 4px;
  borderColor: rgba(0, 0, 0, 0.1);
`

const PreferencesContainer = styled(Box)`
  display: flex;
  maxWidth: 100%;
  flexWrap: wrap;
  flexDirection: row;
`