import React from 'react';
import styled from 'styled-components/native';
import Page from 'components/Page/Page';
import HelpOption from './options/HelpOption';
import AppVersionOption from './options/AppVersionOption';
import SignoutOption from './options/SignoutOption';
import SavedAddressesOption from './options/SavedAddresses/SavedAddressesOption';
import ComplaintOption from './options/Complaint/ComplaintOption';
import CrashalyticsEnabledOption from './options/CrashalyticsEnabledOption';
import ShowCanceledRidesOption from './options/ShowCanceledRidesOption';
import ShowCompletedRidesOption from './options/ShowCompletedRidesOption';
import PermissionsOption from './options/PermissionsOption';
import ShowOldAlertsOption from './options/ShowOldAlertsOption';
import FAQOption from './options/FAQ/FAQOption';

interface ConfigurationProps { }

//TODO: Add FAQ option, example https://support.blablacar.com/hc/es


const Configuration: React.FC<ConfigurationProps> = () => {
  return (
    <Page title="Configuración">
      <Container>
        <SavedAddressesOption />
        <HelpOption />
        <CrashalyticsEnabledOption />
        <ShowCanceledRidesOption />
        <ShowCompletedRidesOption />
        <ShowOldAlertsOption />
        <FAQOption />
        <PermissionsOption />
        <ComplaintOption />
        <AppVersionOption />
        <SignoutOption />
      </Container>
    </Page>
  );
}

export default Configuration;

const Container = styled.ScrollView`
  padding-horizontal: 8px;
  flex: 1;
`