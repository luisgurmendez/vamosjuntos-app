import { LargeBody, PlainInput, Subtitle } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import EditProfilePicButton from './EditProfilePicButton';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { setShowCamera, setTmpImage } from 'state/camera/actions';
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
import { setUser } from 'state/user/actions';
import Toaster from 'components/Toaster/Toaster';
import { Box } from 'components/Box/Box';
import { getUser } from 'state/user/selectors';
import storage from '@react-native-firebase/storage'
import crashlytics from '@react-native-firebase/crashlytics';
import useCameraPermission from 'hooks/useCameraPermission';
import Icon from 'react-native-vector-icons/Feather';
import RememberToAddPhoneNumberModal from './RememberToAddPhoneNumber';
import useCallable from 'hooks/useCallable';

interface ProfileProps { }

const Profile: React.FC<ProfileProps> = () => {
  const [editing, setEditing] = useState(false);
  const [preferenceModalOpen, setPreferenceModalOpen] = useState(false);
  const navigation = useNavigation<any>();
  const user = useSelector(getUser);
  const rides = useSelector((state: AppState) => state.ride.rides);
  const tmpUserImage = useSelector((state: AppState) => state.camera.tmpImage);
  const [editingUser, setEditingUser] = useState<User>(user!);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const isCameraPermissionGranted = useCameraPermission();
  const dispatch = useDispatch();
  const updateUser = useCallable<User>('/users/update');

  const [shouldRememberToAddPhone, setShouldRememberToAddPhone] = useState(user?.phone === undefined || user?.phone === '' || user?.phone === null);

  useEffect(() => {
    const unsubscribe = navigation.dangerouslyGetParent().addListener('tabPress', (e: any) => {
      dispatch(setTmpImage(undefined))
      if (editing) {
        setEditing(false);
        setEditingUser(user!);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setEditingUser(user => {
      return { ...user, img: tmpUserImage ? tmpUserImage : user.img };
    })
  }, [tmpUserImage])

  const handleOpenCamera = async () => {
    if (isCameraPermissionGranted) {
      dispatch(setShowCamera(true));
    } else {
      Toaster.warn({
        message: 'Tenes que habilitar los permisos de la cámara'
      })
    }
  }

  const toggleEditing = () => {
    setEditing(e => !e);
    setEditingUser(user!);
  }

  const handleUpdateProfile = async () => {
    setIsUpdatingUser(true)
    try {
      if (editingUser.img && user!.img !== editingUser.img) {
        const imgRef = storage().ref(`images/${editingUser.id}.jpg`)
        await imgRef.putFile(editingUser.img);
        const imgUrl = await imgRef.getDownloadURL();
        editingUser.img = imgUrl
      }
      const updatedUser = await updateUser(editingUser);
      dispatch(setUser(updatedUser.data));
      setEditingUser(updatedUser.data);
    } catch (e) {
      console.error(e);
      crashlytics().recordError(e);
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
          <ProfilePic img={editingUser?.img} size={160} />
          {editing && <EditProfilePicButton onPress={handleOpenCamera} />}
        </ProfileImageContainer>
        <Box mt="lg">
          {editing ? <NameInput onChangeText={handleNameChange} value={editingUser.name} /> : <Subtitle>{editingUser.name}</Subtitle>}
        </Box>
        <Row mt="lg">
          <Icon style={{ marginRight: 8, }} color={colors.black} name="phone" size={20} />
          {editing ? <PhoneInput autoFocus={true} onChangeText={handlePhoneChange} value={editingUser.phone} /> : <LargeBody>{editingUser.phone ?? '-'}</LargeBody>}
        </Row>
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
      <RememberToAddPhoneNumberModal open={shouldRememberToAddPhone} onClose={() => setShouldRememberToAddPhone(false)} />
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
  min-width: 50px;
`

const Row = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`