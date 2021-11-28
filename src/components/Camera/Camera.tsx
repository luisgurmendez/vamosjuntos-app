import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import Loading from 'components/Loading/Loading';
import AbsolutePositioned from 'components/AbsolutePositioned/AbsolutePositioned';
import AnimatedCamera from './AnimatedCamera';
import ImageResizer from 'react-native-image-resizer';
import { setShowCamera } from 'state/camera/actions';
import useCameraPermission from 'hooks/useCameraPermission';
import { DeviceDimensions } from 'utils/device';

interface CameraProps {
  onImageChange?: (img: string) => void;
  onCancel?: () => void;
}

const Camera: React.FC<CameraProps> = ({ onImageChange, onCancel }) => {

  const dispatch = useDispatch();
  const cameraRef = useRef<RNCamera | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [takingImage, setTakingImage] = useState(false);
  const isCameraPermissionGranted = useCameraPermission()

  const handleRetryImage = () => {
    setImage(undefined);
    if (cameraRef.current) {
      cameraRef.current.resumePreview();
    }
  }

  const handleAcceptImage = async () => {
    if (onImageChange && image) {
      const newImage = await ImageResizer.createResizedImage(image, 800, 800, "JPEG", 20);
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

  if (!isCameraPermissionGranted) {
    return null;
  }

  return (
    <AbsolutePositioned top="0px" bottom="0px" left="0px" right="0px" pointerEvents={'box-none'} >
      <AnimatedCamera>
        <Container>
          {!image ? <BaseCamera
            type={'front'}
            captureAudio={false}
            ref={cameraRef}
            useNativeZoom
            autoFocus={RNCamera.Constants.AutoFocus.on}
          >
            <>
            <View style={{...StyleSheet.absoluteFillObject, justifyContent:"center", alignItems:"center", alignSelf:"center"}}>
              <CroppedFinalImageMark/>
            </View>
            <CloseButtonContainer pointerEvents='box-none'>
              <StyledIcon name="x" size={40} onPress={handleOnCancel} />
            </CloseButtonContainer>
            </>
          </BaseCamera>
            : <PreviewImageTaken style={{ transform: [{ scaleX: -1 }] }} resizeMode="cover" source={{ uri: image }} />}
            <CameraActionsContainer>
            <PaddedCameraActionsContainer>

            {image ? 
              <StyledIcon name="refresh-cw" size={30} onPress={handleRetryImage} />
              :
              <View style={{ width: 30 }} />
            }

            {!image && <IconContainer onPress={!takingImage ? takePicture : undefined}>
              {!takingImage ? <StyledIcon size={40} name="camera" /> : <Loading size={40} />}
            </IconContainer>}

            {image ?
              <StyledIcon name="check" size={40} onPress={handleAcceptImage} /> 
              :
              <View style={{ width: 30 }} />
            }
            </PaddedCameraActionsContainer>
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

const PaddedCameraActionsContainer = styled.View`
  paddingVertical: 8px;
  paddingHorizontal: 20px;
  width: 100%;
  display: flex;
  alignItems: center;
  justifyContent: space-between;
  flex-direction: row;
`
const CameraActionsContainer = styled.SafeAreaView`
  backgroundColor: rgba(0,0,0,0.6);
  position: absolute;
  bottom: 0;
  width: 100%;
`

const StyledIcon = styled(Icon)`
  backgroundColor: transparent;
  color: white;
  padding:8px;
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

const CroppedFinalImageMark = styled.View`
  width: ${DeviceDimensions.width - 20}px;
  height: ${DeviceDimensions.width - 20}px;
  position: absolute;
  borderRadius: ${DeviceDimensions.width/2}px;
  borderWidth: 2px;
  borderColor: rgba(255,255,255,0.5);
`

const PreviewImageTaken = styled.Image`
  flex: 1;
  width: 100%;
  background-color: white;
`
