import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import Loading from 'components/Loading/Loading';
import AbsolutePositioned from 'components/AbsolutePositioned/AbsolutePositioned';
import AnimatedCamera from './AnimatedCamera';
import ImageResizer from 'react-native-image-resizer';
import { setShowCamera } from 'state/camera/actions';
import PlainButton from 'components/Button/PlainButton';
import { colors } from 'utils/colors';

interface CameraProps {
  onImageChange?: (img: string) => void;
  onCancel?: () => void;
}

const Camera: React.FC<CameraProps> = ({ onImageChange, onCancel }) => {

  const dispatch = useDispatch();
  const cameraRef = useRef<RNCamera | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [takingImage, setTakingImage] = useState(false);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('front');

  const handleRetryImage = () => {
    setImage(undefined);
    if (cameraRef.current) {
      cameraRef.current.resumePreview();
    }
  }

  const handleChangeCameraType = () => {
    setCameraType(t => {
      if (t === 'front') {
        return 'back';
      } else {
        return 'front'
      }
    })
  }

  const handleAcceptImage = async () => {
    if (onImageChange && image) {
      const newImage = await ImageResizer.createResizedImage(image, 800, 800, "JPEG", 20);
      console.log(newImage.size);
      onImageChange(newImage.uri);
      handleOnCancel();
    }
  }

  const handleOnCancel = () => {
    setImage(undefined);
    if (onCancel) {
      onCancel()
    } else {
      dispatch(setShowCamera(false));
    }
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      setTakingImage(true);
      const options = { quality: 0.5, base64: true, mirrorImage: true };
      const data = await cameraRef.current.takePictureAsync(options);
      cameraRef.current.pausePreview();
      setImage(data.uri);
      setTakingImage(false);
    }
  };

  return (
    <AbsolutePositioned top="0px" bottom="0px" left="0px" right="0px" pointerEvents={'box-none'} >
      <AnimatedCamera>
        <Container>
          {!image ? <BaseCamera
            type={cameraType}
            captureAudio={false}
            ref={cameraRef}
            useNativeZoom
            autoFocus={RNCamera.Constants.AutoFocus.on}
          >
            <CloseButtonContainer pointerEvents='box-none'>
              <StyledIcon name="x" size={40} onPress={handleOnCancel} />
            </CloseButtonContainer>
          </BaseCamera>
            : <PreviewImageTaken style={{ transform: [{ scaleX: cameraType === 'back' ? 1 : -1 }] }} resizeMode="cover" source={{ uri: image }} />}
          <CameraActionsContainer>
            {image ? <StyledIcon name="check" size={40} onPress={handleAcceptImage} /> : <View style={{ width: 30 }} />}
            {!image && <IconContainer onPress={!takingImage ? takePicture : undefined}>
              {!takingImage ? <StyledIcon size={40} name="camera" /> : <Loading size={40} />}
            </IconContainer>}
            {image ?
              <PlainButton textStyle={{ color: colors.white }} onPress={handleRetryImage} >Cancelar</PlainButton>
              :
              <StyledIcon name="refresh-cw" size={30} onPress={handleChangeCameraType} />
            }
          </CameraActionsContainer>
        </Container>
      </AnimatedCamera>
    </AbsolutePositioned >

  )
}

export default Camera;

const Container = styled.View`
  flex: 1;
  flexDirection: column;
  backgroundColor: gray;
  position: relative;
`

const BaseCamera = styled(RNCamera)`
  flex: 1;
`

const CameraActionsContainer = styled.View`
  backgroundColor: transparent;
  display: flex;
  alignItems: center;
  justifyContent: space-between;
  flex-direction: row;
  position:absolute;
  bottom: 30px;
  width: 100%;
  paddingHorizontal: 20px;
`

const StyledIcon = styled(Icon)`
  backgroundColor: transparent;
  color: white;
`

const IconContainer = styled.TouchableOpacity`
  alignItems: center;
  justifyContent: center;
  width: 70px;
  height: 70px;
  borderWidth: 4px;
  borderColor: white;
  borderRadius: 35px;
  backgroundColor: rgba(255,255,255, 0.3);
`

const CloseButtonContainer = styled.SafeAreaView`
  justifyContent: flex-end;
  flexDirection: row;
  display: flex;
  margin-right: 15px;
`

const PreviewImageTaken = styled.Image`
  flex: 1;
  width: 100%;
  background-color: white;
`
