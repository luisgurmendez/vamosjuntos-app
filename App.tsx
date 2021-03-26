import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MapProvider } from 'components/Map/MapProvider';
import useInitStorage from 'hooks/useInitStorage';
import moment from 'moment';
import localization from 'moment/locale/es';
import RootNavigation from 'containers/RootNavigation';
import { enableScreens } from 'react-native-screens';
import store from 'state/store';
import { Provider, useDispatch } from 'react-redux';
import AppCrashHandler from 'containers/AppCrashHandler';
import useHandleUserAuthentication from 'hooks/useHandleUserAuthentication';
import { LogBox } from 'react-native';
import useInternetConnection from 'hooks/useInternetConnection';
import { setHasInternetConnection } from 'state/general/actions';
import styled from 'styled-components/native';
import ErrorBanner from 'components/ErrorBanner/ErrorBanner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FeatureFlags } from 'types/models';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import useVersion from 'hooks/useVersion';
import HideIfLoading from 'components/Loading/HideIfLoading';
import remoteConfig from '@react-native-firebase/remote-config';
import { logout } from 'api/auth';

enableScreens();
moment.updateLocale('es', localization);

LogBox.ignoreAllLogs();

const App = () => {
  useInitStorage();
  const appVersion = useVersion();

  useEffect(() => {
    console.log(`Using app version: ${appVersion}`)
    logout();
    crashlytics().log(`Using app version: ${appVersion}`);
  }, [appVersion])

  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppCrashHandler>
          <FCMPermissions>
            <SetupApp>
              <MapProvider>
                <RootNavigation />
              </MapProvider>
            </SetupApp>
          </FCMPermissions>
        </AppCrashHandler>
      </Provider>
    </NavigationContainer>
  );
};

export default App;


const SetupApp: React.FC = ({ children }) => {

  const [hasInternetConnection, hasCheckedInternetConnection] = useInternetConnection();
  const initialCheckAuth = useHandleUserAuthentication();
  const dispatch = useDispatch();

  useEffect(() => {

    remoteConfig()
      .setDefaults({
        [FeatureFlags.BANNER_ADS]: 'false',
        [FeatureFlags.FULL_SCREEN_ADS]: 'false',
      })
      .then(() => { remoteConfig().fetchAndActivate() });

    admob()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.G,
        tagForChildDirectedTreatment: true,
        tagForUnderAgeOfConsent: true,
      });
  }, [])

  useEffect(() => {
    if (hasCheckedInternetConnection) {
      dispatch(setHasInternetConnection(hasInternetConnection));
    }

  }, [hasInternetConnection, hasCheckedInternetConnection])

  return (
    <Container>
      <HideIfLoading loading={!initialCheckAuth}>
        {!hasInternetConnection && <SafeAreaView><ErrorBanner>No hay conexion a internet</ErrorBanner></SafeAreaView>}
        {children}
      </HideIfLoading>

    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`

const FCMPermissions: React.FC = ({ children }) => {

  const requestUserPermission = async () => {
    const messagingAuthorizationStatus = await messaging().requestPermission();
    const enabled =
      messagingAuthorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      messagingAuthorizationStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log(messagingAuthorizationStatus)
    if (enabled) {
      console.log('Authorization status:', messagingAuthorizationStatus);
    }
  }

  useEffect(() => {
    requestUserPermission();
  }, [])

  return <>{children}</>
}