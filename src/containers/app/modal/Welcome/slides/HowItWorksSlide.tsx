import { LargeTitle, Subtitle, Body, LargeBody } from 'components/Typography/Typography';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from 'utils/colors';
import { StyleProp, TextStyle } from 'react-native';
import Circle from 'components/Circle/Circle';

enum HowItWorksTabs {
  asDriver,
  asPassenger
}

const HowItWorksSlide: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<HowItWorksTabs>(HowItWorksTabs.asPassenger);


  const asADriver = () => {
    return (
      <>
        <Step num={1} title={"Creá un viaje"}>
        </Step>
        <Step num={2} title={"Aceptá solicitudes de viaje"}>

        </Step>
        <Step num={3} title={"Hablá con tus pasajeros"}>

        </Step>
        <Step num={4} title={"Manejá con cuidado!"}>

        </Step>
      </>
    )
  }

  const asAPassenger = () => {
    return (
      <>
        <Step num={1} title={"Buscá un viaje"}>
        </Step>
        <Step num={2} title={"Esperá a ser aceptado"}>
        </Step>
        <Step num={3} title={"Hablá con tu conductor"}>
        </Step>
        <Step num={4} title={"¡Disfrutá del viaje!"}>
        </Step>
        <Step num={5} title="Dejale un comentario a tu conductor">

        </Step>
      </>
    )
  }

  const tabs: TabItems = [
    { id: HowItWorksTabs.asPassenger, title: 'Como pasajero', icon: 'thumb-up', iconStyle: { transform: [{ rotate: '20deg' }] } },
    { id: HowItWorksTabs.asDriver, title: 'Como conductor', icon: 'car' },
  ];

  return (
    <Container>
      <LargeTitle style={{ color: 'white' }}>
        Como funciona?
      </LargeTitle>
      <Tabs tabs={tabs} onChangeTab={setSelectedTab} selectedTab={selectedTab} />
      <Content>
        {selectedTab === HowItWorksTabs.asDriver ? asADriver() : asAPassenger()}
      </Content>
    </Container>
  )
}

export default HowItWorksSlide;

const Container = styled.View`
  flex:1;
  margin-horizontal:8px;
`

const Content = styled.ScrollView``

interface StepProps {
  title: string;
  num: number;
}

const Step: React.FC<StepProps> = ({ title, num, children }) => {

  return (
    <StepContainer>
      <SubtitleContainer>
        <NumberContainer>
          <Subtitle>{num}</Subtitle>
        </NumberContainer>
        <WhiteSubtitle>{title}</WhiteSubtitle>
      </SubtitleContainer>
      <StepContent>
        {children}
      </StepContent>
    </StepContainer>
  )
}

const StepContainer = styled.View`
  margin-vertical: 16px;
`

const SubtitleContainer = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
`

const StepContent = styled.View`
  margin-left:48px;
`

const NumberContainer = styled.View`
  width:40px;
  height:40px;
  border-radius:20px;
  margin-right:8px;
  background-color:white;
  justify-content:center;
  align-items:center;
`

const WhiteSubtitle = styled(Subtitle)`
  color:white;
  flex-shrink:1;
`

const WhiteBody = styled(Body)`
  color: ${colors.white};
`

interface TabItem {
  id: HowItWorksTabs;
  title: string;
  icon: string;
  iconStyle?: StyleProp<TextStyle>;
}

type TabItems = TabItem[];

interface TabsProps {
  tabs: TabItems
  selectedTab: HowItWorksTabs;
  onChangeTab: (t: HowItWorksTabs) => void
}

const Tabs = ({
  tabs,
  selectedTab,
  onChangeTab
}: TabsProps) => {

  return (
    <TabsContainer>
      {tabs.map(tab => {
        const isSelected = tab.id === selectedTab
        return (
          <Tab key={tab.id} onPress={() => onChangeTab(tab.id)} isSelected={isSelected}>
            <LargeBody style={{ fontWeight: '600' }}>{tab.title}</LargeBody>
            <Icon style={tab.iconStyle} size={30} name={tab.icon} color={colors.black} />
          </Tab>)
      }
      )}
    </TabsContainer>
  );

}

const TabsContainer = styled.View`
  flex-direction:row;
  margin-vertical:16px;
`
interface TabProps {
  isSelected: boolean;
}

const Tab = styled.TouchableOpacity<TabProps>`
  display:flex;
  flex:1;
  align-items:center;
  padding:8px;
  border-bottom-width:${props => props.isSelected ? '2px' : '0px'};
  border-color:white;
`
