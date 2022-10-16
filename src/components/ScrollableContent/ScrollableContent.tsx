import NoContent from 'components/NoContent/NoContent';
import { WithChildren } from 'components/types';
import React from 'react';
import { ScrollView, RefreshControl, ViewStyle } from 'react-native';

interface ScrollableContentProps extends WithChildren {
  showContent: boolean;
  noContentAsset?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
  noContentHelp?: string | React.ReactNode;
  style?: ViewStyle;
}

const ScrollableContent: React.FC<ScrollableContentProps> = ({
  showContent,
  refreshing,
  onRefresh,
  children,
  noContentAsset,
  noContentHelp,
  style
}) => {

  const contentContainerStyles: ViewStyle = { paddingBottom: 32 };

  if (!showContent) {
    contentContainerStyles['flex'] = 1;
  }

  return (
    <ScrollView
      style={style}
      contentContainerStyle={contentContainerStyles}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={400}
      refreshControl={onRefresh !== undefined && refreshing !== undefined ? (<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />) : undefined}
    >
      <NoContent
        help={noContentHelp}
        showContent={showContent}
        asset={noContentAsset}
      >
        {children}
      </NoContent>
    </ScrollView>
  )
}

export default ScrollableContent;