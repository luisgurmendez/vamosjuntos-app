import { WithChildren } from 'components/types';
import React from 'react'
import { Image, ImageStyle } from 'react-native';

interface WithBackgroundImageProps extends WithChildren {
  asset: any;
  imageStyles?: ImageStyle;
}

const WithBackgroundImage: React.FC<WithBackgroundImageProps> = ({ children, imageStyles = {}, asset }) => {

  return (
    <>
      {asset !== undefined &&
        <Image
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            ...imageStyles
          }}
          resizeMode="contain"
          source={asset}
        />
      }
      {children}
    </>

  )

}

export default WithBackgroundImage;
