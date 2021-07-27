import Button from 'components/Button/Button';
import PlainButton from 'components/Button/PlainButton';
import React from 'react';
import { ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';


interface PageSliderPaginationProps {
  active: number;
  onPagePress: (pageIndex: number) => void;
  size: number;
  onDone: () => void;
}

const PageSliderPagination: React.FC<PageSliderPaginationProps> = ({ active, onPagePress, size, onDone }) => {

  const isLastPage = active === size - 1;

  const renderDots = () => {
    const dots = [];
    for (let index = 0; index < size; index++) {
      dots.push(<Dot key={index} active={active === index} pageIndex={index} onPress={onPagePress} />)
    }
    return dots;
  }

  return (
    <Container>
      <SafeAreaView>
        <DotsContainer>
          {renderDots()}
        </DotsContainer>
        {isLastPage && <Button type='secondary' onPress={onDone}>Ta</Button>}
      </SafeAreaView>
    </Container>
  )
}


export default PageSliderPagination;

const Container = styled.View`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  justifyContent: center;
`

const DotsContainer = styled.View`
  height: 16px;
  margin: 16px;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
`

interface DotProps {
  active: boolean;
  onPress: (pageIndex: number) => void;
  pageIndex: number
}

const Dot: React.FC<DotProps> = ({ active, pageIndex, onPress }) => {

  const handlePress = () => {
    onPress(pageIndex);
  }

  return (
    <DotTouchable
      onPress={handlePress}
      style={{ backgroundColor: active ? 'rgba(255, 255, 255, .9)' : 'rgba(0, 0, 0, .2)' }}
    />
  )
}

const DotTouchable = styled.TouchableOpacity`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-horizontal: 4px;
`
