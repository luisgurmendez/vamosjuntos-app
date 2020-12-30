import { Screens } from 'containers/Screens';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigation from './tabs/TabsNavigation';
import RideStack from './modal/RideOrLift/Ride/Ride';
import Review from './modal/Review/Review';
import styled from 'styled-components/native';
import Toaster from 'components/Toaster/Toaster';
import Camera from 'components/Camera/Camera';
import AppInitialDataFetcher from './AppInitialDataFetcher';
import WelcomeNavigation from 'containers/app/welcome/WelcomeNavigation';
import UserProfile from './modal/UserProfile/UserProfile';
import LiftStack from './modal/RideOrLift/Lift/Lift';
import RideDetails from './modal/RideDetails/RideDetails';
import Comments from 'components/Profile/Comments';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'state/user/selectors';
import { updateUserNotificationToken } from 'api/adedo';
import { setTmpImage } from 'state/camera/actions';

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {

  const shouldShowWelcome = false;
  const user = useSelector(getUser);
  const userId = user && user.id;

  const dispatch = useDispatch();

  useEffect(() => {
    crashlytics().log('User sign in');
    crashlytics().setUserId(user!.id.toString());
  }, [user])

  useEffect(() => {
    messaging().getToken().then(t => {
      updateUserNotificationToken(t, userId!);
    })

    return messaging().onTokenRefresh(t => {
      updateUserNotificationToken(t, userId!);
    })
  }, [userId])

  const handleImageChange = (img: string) => {
    dispatch(setTmpImage(img));
  }

  return (
    <AppContainer>
      <Camera onImageChange={handleImageChange} />
      <Toaster />
      <AppInitialDataFetcher>
        <Stack.Navigator
          initialRouteName={shouldShowWelcome ? Screens.WELCOME : Screens.TABS}
          screenOptions={{
            headerBackTitle: 'Atras',
            headerShown: false
          }}>
          <Stack.Screen name={Screens.TABS} component={TabsNavigation} />
          <Stack.Screen name={Screens.RIDE} component={RideStack} />
          <Stack.Screen name={Screens.REVIEW} component={Review} />
          <Stack.Screen name={Screens.LIFT} component={LiftStack} />
          <Stack.Screen name={Screens.USER_PROFILE} component={UserProfile} />
          <Stack.Screen name={Screens.RIDE_DETAILS} component={RideDetails} />
          <Stack.Screen name={Screens.COMMENTS} component={Comments} />
          <Stack.Screen name={Screens.WELCOME} component={WelcomeNavigation} />
        </Stack.Navigator>
      </AppInitialDataFetcher>
    </AppContainer>
  );
};

export default AppNavigation;

const AppContainer = styled.View`
  flex: 1;
  position: relative;
`