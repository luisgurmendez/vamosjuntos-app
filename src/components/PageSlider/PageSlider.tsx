import { LargeTitle } from 'components/Typography/Typography';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, LayoutChangeEvent, ListRenderItem, NativeScrollEvent } from 'react-native';
import { AnyAction } from 'redux';
import styled from 'styled-components/native';
import { DeviceDimensions } from 'utils/device';
import PageSliderPagination from './PageSliderPagination';

interface PageSliderProps {
  pages: React.ReactNode[];
  onDone: () => void;
}

const PageSlider2: React.FC<PageSliderProps> = ({ pages, onDone }) => {

  const [width, setWidth] = useState(DeviceDimensions.width);
  const [height, setHeight] = useState(DeviceDimensions.height);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatList = useRef<FlatList | null>(null);

  const _onMomentumScrollEnd = (e: { nativeEvent: NativeScrollEvent }) => {
    const offset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / width);
    if (newIndex === activeIndex) {
      return;
    }
    setActiveIndex(newIndex);
  };

  const _onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width: layoutWidth, height: layoutHeight } = nativeEvent.layout;
    if (layoutWidth !== width || layoutHeight !== height) {
      setWidth(layoutWidth);
      setHeight(layoutHeight);
      const func = () => {
        flatList.current?.scrollToOffset({
          offset: activeIndex * width,
          animated: false,
        });
      };
      setTimeout(func, 0);
    }
  };

  const _renderItem: ListRenderItem<any> = (info) => {

    return (
      <SlideContainer style={{ width: width }} key={info.index}>
        {pages[info.index]}
      </SlideContainer>
    )
  }

  const goToPage = (pageIndex: number) => {
    setActiveIndex(pageIndex);
    flatList.current?.scrollToOffset({
      offset: pageIndex * width,
    });
  };

  return (
    <Container>
      <FlatList
        data={pages}
        ref={flatList}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={{ flex: 1, flexDirection: 'row' }}
        renderItem={_renderItem}
        onLayout={_onLayout}
        onMomentumScrollEnd={_onMomentumScrollEnd}
        initialNumToRender={pages.length}
      />
      <PageSliderPagination active={activeIndex} size={pages.length} onPagePress={goToPage} onDone={onDone} />
    </Container>
  )

}

export default PageSlider2;

const Container = styled.View`
  flex: 1;
`

const SlideContainer = styled.View`
  flex: 1;
`