import { AnimatedText } from 'components/Typography/Typography';
import React, {useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import MyRides from './MyRides';
import RideRequests from './RideRequests';
import { getPendingRides, getPendingRideRequests } from 'state/ride/selectors';
import Rides from './Rides';
import Badge from 'components/Badge/Badge';
import { colors } from 'utils/colors';
import { useSelector } from 'react-redux';
import { useAnimation } from 'react-native-animation-hooks';
import { Easing } from 'react-native';

enum RideTabs{
  Rides,
  MyRides,
  RideRequests,
}

const RidesNavigation: React.FC = () => {

  // TODO: Move this so that we can controll tabs from everywhere in the app
  const [selectedTab, setSelectedTab] = useState(RideTabs.Rides);
  const rideRequests = useSelector(getPendingRideRequests);
  const pendingRides = useSelector(getPendingRides);

  const renderSelectedTabContent = () => {
    switch(selectedTab){
      case RideTabs.Rides:
        return <Rides/>;
        case RideTabs.MyRides:
        return <MyRides/>;
        case RideTabs.RideRequests:
        return <RideRequests />;
    }
  }

  return(
    <Container>
      <Tabs 
      onTabSelected={setSelectedTab}
      selectedTab={selectedTab}
      tabs={[
        {value: RideTabs.Rides, name: 'Viajes'},
        {value: RideTabs.MyRides, name: 'Mis Viajes', badge: pendingRides.length},
        {value: RideTabs.RideRequests, name: 'Solicitudes', badge: rideRequests.length}
        ]} />
      <Content>
        {renderSelectedTabContent()}
      </Content>
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

const Content = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`

interface TabOption{
  name: string;
  value: RideTabs;
  badge?: number;
}

interface TabsProps{
  selectedTab: number;
  tabs: TabOption[];
  onTabSelected: (tab: RideTabs) => void;
}

const Tabs: React.FC<TabsProps> = ({tabs, onTabSelected, selectedTab}) => {

  return(
    <TabsContainer>
      {tabs.map(tab => <Tab 
        key={tab.value}
        badge={tab.badge}
        name={tab.name}
        selected={selectedTab === tab.value}
        onSelected={() => onTabSelected(tab.value)} />
      )}
    </TabsContainer>
  );
}

interface TabProps{
  badge?: number;
  name: string;
  selected: boolean;
  onSelected: () => void;
}

const ANIAMTION_DURATION = 200;

const Tab: React.FC<TabProps> = ({name, onSelected, selected, badge}) => {

  const _badge = selected? 0 : badge;

  const animation = useAnimation({
    type: 'timing',
    toValue: selected ? 1 : 0,
    duration: ANIAMTION_DURATION,
    useNativeDriver: false,
    easing: Easing.linear
  });

  const textAnimatedStyles = {
    fontSize: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 32]
    }),
  };

  return(
    <TabContainer>
      <TouchableOpacity onPress={onSelected}>
      <Badge badge={_badge} max={10}>
        <StyledAnimatedText style={[{color: selected? colors.black : colors.gray, fontWeight: selected? 'bold' : 'normal'}, textAnimatedStyles]}>{name}</StyledAnimatedText>
      </Badge>
    </TouchableOpacity>
    </TabContainer>
  );
}

const StyledAnimatedText = styled(AnimatedText)`
  text-align: center;
  font-size: 18px;
  width: 100%;
`

const TabContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`

const TabsContainer = styled.View`
  padding: 8px;
  height: 52px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`
