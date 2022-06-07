import { WithChildren } from 'components/types';
import { Body } from 'components/Typography/Typography';
import React from 'react'
import { Image, ImageStyle } from 'react-native';
import styled from 'styled-components/native';

interface NoContentProps extends WithChildren {
  asset: any;
  showContent: boolean;
  help?: string | React.ReactNode;
  imageStyles?: ImageStyle;
}

const NoContent: React.FC<NoContentProps> = ({ children, help, showContent, imageStyles = {}, asset }) => {

  if (showContent) {
    return <>{children}</>;
  }

  const isHelpContentText = help !== undefined && typeof help === 'string';
  const showHelpContent = help !== undefined;

  return (
    <ImageContainer pointerEvents="box-none">
      <Image
        style={{
          width: '100%',
          maxWidth: '100%',
          height: undefined,
          aspectRatio: 1,
          ...imageStyles
        }}
        resizeMode="contain"
        source={asset}
      />
      {showHelpContent && (<HelpContentContainer>
        {isHelpContentText ? <Body>{help}</Body> : <>{help}</>}
      </HelpContentContainer>)
      }

    </ImageContainer>
  )
}

export default NoContent;

const ImageContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`

const HelpContentContainer = styled.View`
  padding: 16px;
  margin-top: 16px;
`
