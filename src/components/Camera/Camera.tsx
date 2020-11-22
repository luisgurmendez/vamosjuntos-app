// import React, { useRef, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { RNCamera } from 'react-native-camera';
// import { View } from 'react-native';
// import styled from 'styled-components/native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Loading from 'components/Loading/Loading';
// import AbsolutePositioned from 'components/AbsolutePositioned/AbsolutePositioned';
// import { setShowCamera } from 'state/camera/actions';
// import AnimatedCamera from './AnimatedCamera';
// import ImageResizer from 'react-native-image-resizer';

// interface CameraProps {
//   onImageChange?: (img: string) => void;
//   onCancel?: () => void;
// }

// const Camera: React.FC<CameraProps> = ({ onImageChange, onCancel }) => {

//   const dispatch = useDispatch();
//   const cameraRef = useRef<RNCamera | null>(null);
//   const [image, setImage] = useState<string | undefined>(undefined);
//   const [takingImage, setTakingImage] = useState(false);

//   const handleRetryImage = () => {
//     setImage(undefined);
//     if (cameraRef.current) {
//       cameraRef.current.resumePreview();
//     }
//   }

//   const handleAcceptImage = () => {
//     if (onImageChange && image) {
//       onImageChange(image);
//       handleOnCancel();
//     }
//   }

//   const handleOnCancel = () => {
//     setImage(undefined);
//     if (onCancel) {
//       onCancel()
//     } else {
//       dispatch(setShowCamera(false));
//     }
//   }

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       setTakingImage(true);
//       cameraRef.current.pausePreview();
//       const options = { quality: 0.5, base64: true };
//       const data = await cameraRef.current.takePictureAsync(options);
//       const newImage = await ImageResizer.createResizedImage(data.uri, 800, 900, "JPEG", 75);
//       setImage(newImage.uri);
//       setTakingImage(false);
//     }
//   };

//   return (
//     <AbsolutePositioned top="0px" bottom="0px" left="0px" right="0px" pointerEvents={'box-none'} >
//       <AnimatedCamera>
//         <Container>
//           {!image ? <BaseCamera
//             captureAudio={false}
//             ref={cameraRef}
//             useNativeZoom
//             autoFocus={RNCamera.Constants.AutoFocus.on}
//           >
//             <CloseButtonContainer pointerEvents='box-none'>
//               <StyledIcon name="close" size={40} onPress={handleOnCancel} />
//             </CloseButtonContainer>
//           </BaseCamera>
//             : <PreviewImageTaken resizeMode="cover" source={{ uri: image }} />}
//           <CameraActionsContainer>
//             {image ? <StyledIcon name="check" size={40} onPress={handleAcceptImage} /> : <View />}
//             {!image && <IconContainer onPress={!takingImage ? takePicture : undefined}>
//               {!takingImage ? <StyledIcon size={40} name="camera" /> : <Loading size={40} />}
//             </IconContainer>}
//             {image ? <StyledIcon name="reload" size={40} onPress={handleRetryImage} /> : <View />}
//           </CameraActionsContainer>
//         </Container>
//       </AnimatedCamera>
//     </AbsolutePositioned >

//   )
// }

// export default Camera;

// const Container = styled.View`
//   flex: 1;
//   flexDirection: column;
//   backgroundColor: gray;
//   position: relative;
// `

// const BaseCamera = styled(RNCamera)`
//   flex: 1;
// `

// const CameraActionsContainer = styled.View`
//   backgroundColor: transparent;
//   display: flex;
//   alignItems: center;
//   justifyContent: space-between;
//   flex-direction: row;
//   position:absolute;
//   bottom: 30px;
//   width: 100%;
//   paddingHorizontal: 20px;
// `

// const StyledIcon = styled(Icon)`
//   backgroundColor: transparent;
//   color: white;
//   top: 4px;
// `

// const IconContainer = styled.TouchableOpacity`
//   alignItems: center;
//   justifyContent: center;
//   width: 70px;
//   height: 70px;
//   borderWidth: 4px;
//   borderColor: white;
//   borderRadius: 35px;
//   backgroundColor: rgba(255,255,255, 0.3);
// `

// const CloseButtonContainer = styled.SafeAreaView`
//   justifyContent: flex-end;
//   flexDirection: row;
//   display: flex;
//   margin-right: 15px;
// `

// const PreviewImageTaken = styled.Image`
//   flex: 1;
//   width: 100%;
//   background-color: white;
// `
