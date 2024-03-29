import { Screens } from 'containers/Screens';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigation from './tabs/TabsNavigation';
import RideStack from './modal/CreateRide/Ride/Ride';
import Review from './modal/Review/Review';
import styled from 'styled-components/native';
import Toaster from 'components/Toaster/Toaster';
import Camera from 'components/Camera/Camera';
import AppInitialDataFetcher from './AppInitialDataFetcher';
import UserProfile from './modal/UserProfile/UserProfile';
import RideDetails from './modal/RideDetails/RideDetails';
import Comments from 'components/Profile/Comments';
import { useDispatch } from 'react-redux';
import { setTmpImage } from 'state/camera/actions';
import useNotificationsHandler from 'hooks/useNotificationsHandler';
import BannerAd from 'components/Ad/BannerAd';
import useFeatureFlag from 'hooks/useFeatureFlag';
import { FeatureFlags } from 'types/models';
import WhereFromWhereToDetails from './modal/WhereFromWhereToDetails/WhereFromWhereToDetails';
import Welcome from './modal/Welcome/Welcome';
import JoinRide from './modal/JoinRide/JoinRide';
import SearchForRideNavigation from './modal/SearchForRide/SearchForRideNavigation';
import RideConversation from './modal/RideConversation/RideConversation';

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const useAds = useFeatureFlag(FeatureFlags.BANNER_ADS);
  useNotificationsHandler();

  const handleImageChange = (img: string) => {
    dispatch(setTmpImage(img));
  }

  return (
    <AppContainer>
      <Camera onImageChange={handleImageChange} />
      <Toaster />
      <AppInitialDataFetcher>
        <Stack.Navigator
          initialRouteName={Screens.TABS}
          screenOptions={{
            headerBackTitle: 'Atrás',
            headerShown: false
          }}>
          <Stack.Screen name={Screens.TABS} component={TabsNavigation} />
          <Stack.Screen name={Screens.RIDE} component={RideStack} />
          <Stack.Screen name={Screens.REVIEW} component={Review} />
          <Stack.Screen
            name={Screens.SEARCH_FOR_RIDE}
            component={SearchForRideNavigation}
          />
          <Stack.Screen name={Screens.USER_PROFILE} component={UserProfile} />
          <Stack.Screen name={Screens.RIDE_DETAILS} component={RideDetails} />
          <Stack.Screen name={Screens.RIDE_CONVERSATION} component={RideConversation} />
          <Stack.Screen name={Screens.WHERE_FROM_WHERE_TO_DETAILS} component={WhereFromWhereToDetails} />
          <Stack.Screen name={Screens.WELCOME} component={Welcome} />
          <Stack.Screen name={Screens.COMMENTS} component={Comments} />
          <Stack.Screen name={Screens.JOIN_RIDE} component={JoinRide} />
        </Stack.Navigator>
      </AppInitialDataFetcher>
      {useAds && <BannerAd />}
    </AppContainer>
  );
};

export default AppNavigation;

const AppContainer = styled.View`
  flex: 1;
  position: relative;
`
