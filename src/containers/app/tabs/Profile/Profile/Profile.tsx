import { PlainInput, Subtitle } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import EditProfilePicButton from './EditProfilePicButton';
import ProfilePicPlaceholder from 'components/ProfilePic/ProfilePicPlaceholder';
import { setShowCamera } from 'state/camera/actions';
import { useDispatch, useSelector } from 'react-redux';
import EditHeaderActions from './EditHeaderActions';
import { colors } from 'utils/colors';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import EditPreferenceModal from './EditPreferenceModal';
import { useNavigation } from '@react-navigation/native';
import { Screens } from 'containers/Screens';
import { AppState } from 'state/types';
import { User, UserPreference } from 'types/models';
import PreferenceList from 'components/Profile/PreferenceList';
import RidesAndLifts from 'components/Profile/RidesAndLifts';
import UserSince from 'components/Profile/UserSince';
import ProfileReviews from 'components/Profile/ProfileReviews';

interface ProfileProps { }

const Profile: React.FC<ProfileProps> = () => {
  const [editing, setEditing] = useState(false);
  const [preferenceModalOpen, setPreferenceModalOpen] = useState(false);
  const navigation = useNavigation<any>();
  const user = useSelector((state: AppState) => state.user.user);
  const [_user, setUser] = useState<User>(user!);

  const dispatch = useDispatch();

  useEffect(() => {
    //TODO: type this better;
    const unsubscribe = navigation.dangerouslyGetParent().addListener('tabPress', (e: any) => {
      console.log('tabb pressed')
      if (editing) {
        setEditing(false);
        setUser(user!);
      }
    });
    console.log(navigation);
    return unsubscribe;
  }, [])

  const handleOpenCamera = () => {
    dispatch(setShowCamera(true));
  }

  const toggleEditing = () => {
    setEditing(e => !e);
    setUser(user!);
  }

  const handleUpdateProfile = () => { };

  const handleNameChange = (name: string) => {
    setUser(user => {
      return { ...user, name: name };
    })
  }

  const handleUserPreferencesChange = (p: UserPreference[]) => {
    setUser(user => {
      return { ...user, preferences: p };
    })
  }

  const handleEditPreference = () => {
    setPreferenceModalOpen(true)
  }

  const handleGoToComments = () => {
    navigation.push(Screens.COMMENTS)
  }

  return (
    <Container>
      <EditHeaderActions editing={editing} onToggleEdit={toggleEditing} onSave={handleUpdateProfile} />
      <Content contentContainerStyle={{ alignItems: 'center' }}>
        <ProfileImageContainer>
          <ProfilePicPlaceholder size={160} />
          {editing && <EditProfilePicButton onPress={handleOpenCamera} />}
        </ProfileImageContainer>
        {editing ? <NameInput onChangeText={handleNameChange} value={_user.name} /> : <Subtitle>{_user.name}</Subtitle>}

        <ProfileReviews disabledReviews={editing} numberOfReviews={25} score={3.8} />
        <RidesAndLifts rides={5} lifts={6} />
        <PreferenceList preferences={_user.preferences}>
          {editing && <PressableIcon style={{ marginBottom: 8 }} size={30} name="plus" color={colors.main} onPress={handleEditPreference} />}
        </PreferenceList>
      </Content>

      <UserSince date={_user.createdAt} />
      <EditPreferenceModal
        onChange={handleUserPreferencesChange}
        preferences={_user.preferences}
        open={preferenceModalOpen}
        onClose={() => setPreferenceModalOpen(false)}
      />
    </Container>
  );
};
export default Profile;

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
`

const Content = styled.ScrollView`
  flex: 1;
  width:100%;
  flex-direction: column;
  padding-horizontal: 32px;
`

const ProfileImageContainer = styled.View`
  position: relative;
  margin-bottom: 16px;
`;

const NameInput = styled(PlainInput)`
  font-weight: bold;
  font-size: 24px;
`