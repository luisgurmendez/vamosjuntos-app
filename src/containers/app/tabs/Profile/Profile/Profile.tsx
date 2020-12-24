import { LargeBody, PlainInput, Subtitle } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import EditProfilePicButton from './EditProfilePicButton';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { setShowCamera } from 'state/camera/actions';
import { useDispatch, useSelector } from 'react-redux';
import EditHeaderActions from './EditHeaderActions';
import { colors } from 'utils/colors';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import EditPreferenceModal from './EditPreferenceModal';
import { useNavigation } from '@react-navigation/native';
import { AppState } from 'state/types';
import { User, UserPreference } from 'types/models';
import PreferenceList from 'components/Profile/PreferenceList';
import RidesAndLifts from 'components/Profile/RidesAndLifts';
import UserSince from 'components/Profile/UserSince';
import ProfileReviews from 'components/Profile/ProfileReviews';
import { updateUser } from 'api/adedo';
import { setUser } from 'state/user/actions';
import Toaster from 'components/Toaster/Toaster';
import { Box } from 'components/Box/Box';

interface ProfileProps { }

const Profile: React.FC<ProfileProps> = () => {
  const [editing, setEditing] = useState(false);
  const [preferenceModalOpen, setPreferenceModalOpen] = useState(false);
  const navigation = useNavigation<any>();
  const user = useSelector((state: AppState) => state.user.user);
  const rides = useSelector((state: AppState) => state.ride.rides);

  const [editingUser, setEditingUser] = useState<User>(user!);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {

    const unsubscribe = navigation.dangerouslyGetParent().addListener('tabPress', (e: any) => {
      if (editing) {
        setEditing(false);
        setEditingUser(user!);
      }
    });
    return unsubscribe;
  }, [])

  const handleOpenCamera = () => {
    dispatch(setShowCamera(true));
  }

  const toggleEditing = () => {
    setEditing(e => !e);
    setEditingUser(user!);
  }

  const handleUpdateProfile = async () => {
    setIsUpdatingUser(true)
    try {
      const updatedUser = await updateUser(editingUser);
      dispatch(setUser(updatedUser));
      setEditingUser(updatedUser);
    } catch (e) {
      Toaster.alert('No pudimos guardar tus cambios')
    }
    setEditing(false);
    setIsUpdatingUser(false)
  };

  const handleNameChange = (name: string) => {
    setEditingUser(u => {
      return { ...u, name: name };
    })
  }

  const handlePhoneChange = (phone: string) => {
    setEditingUser(u => {
      return { ...u, phone: phone };
    })
  }

  const handleUserPreferencesChange = (p: UserPreference[]) => {
    setEditingUser(user => {
      return { ...user, preferences: p };
    })
  }

  const handleEditPreference = () => {
    setPreferenceModalOpen(true)
  }

  const numOfRides = rides.filter(r => user && r.driver && r.driver.id === user.id).length
  const numOfLifts = rides.filter(r => user && r.driver && r.driver.id !== user.id).length

  return (
    <Container>
      <EditHeaderActions editing={editing} saving={isUpdatingUser} onToggleEdit={toggleEditing} onSave={handleUpdateProfile} />
      <Content contentContainerStyle={{ alignItems: 'center' }}>
        <ProfileImageContainer>
          <ProfilePic img={user?.img} size={160} />
          {editing && <EditProfilePicButton onPress={handleOpenCamera} />}
        </ProfileImageContainer>
        <Box mt="lg">
          {editing ? <NameInput onChangeText={handleNameChange} value={editingUser.name} /> : <Subtitle>{editingUser.name}</Subtitle>}
        </Box>
        <Box mt="lg">
          {editing ? <PhoneInput onChangeText={handlePhoneChange} value={editingUser.phone} /> : <LargeBody>{editingUser.phone}</LargeBody>}
        </Box>
        <ProfileReviews userId={user?.id!} disabledReviews={editing} score={user?.score!} />
        <RidesAndLifts rides={numOfRides} lifts={numOfLifts} />
        <PreferenceList preferences={editingUser.preferences}>
          {editing && <PressableIcon style={{ marginBottom: 8 }} size={30} name="plus" color={colors.main} onPress={handleEditPreference} />}
        </PreferenceList>
      </Content>
      <UserSince date={editingUser.createdAt} />
      <EditPreferenceModal
        onChange={handleUserPreferencesChange}
        preferences={editingUser.preferences}
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

const PhoneInput = styled(PlainInput)`
  font-weight: 400;
  font-size: 20px;
`