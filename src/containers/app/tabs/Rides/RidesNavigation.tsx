import React, { useState } from 'react';
import styled from 'styled-components/native';
import MyRides from './MyRides';
import RideRequests from './RideRequests';
import Rides from './Rides';
import { TabView, SceneMap } from 'react-native-tab-view';
import TabBar from './TabBar';
import analytics from 'utils/analytics';

export enum RideTabs {
  Rides = 'rides',
  MyRides = 'my-rides',
  RideRequests = 'ride-requests',
}

const RenderedTabs = SceneMap({
  [RideTabs.Rides]: Rides,
  [RideTabs.MyRides]: MyRides,
  [RideTabs.RideRequests]: RideRequests,
})

const RidesNavigation: React.FC = () => {

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const routes = [
    { key: RideTabs.Rides, title: 'Viajes', index: 0 },
    { key: RideTabs.MyRides, title: 'Mis viajes', index: 1 },
    { key: RideTabs.RideRequests, title: 'Solicitudes', index: 2 },
  ];

  const handlePageChange = (pageIndex: number) => {
    setSelectedTabIndex(pageIndex);
    analytics.logScreenView({
      screen_class: `RidesTab-${routes[pageIndex]}`,
      screen_name: `RidesTab-${routes[pageIndex]}`
    });
  }

  return (
    <Container>
      <TabView
        navigationState={{ index: selectedTabIndex, routes }}
        renderScene={RenderedTabs}
        onIndexChange={handlePageChange}
        renderTabBar={TabBar}
      />

    </Container>
  )
}
export default RidesNavigation;

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
`;
