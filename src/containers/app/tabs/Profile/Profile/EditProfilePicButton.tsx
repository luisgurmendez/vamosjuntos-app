import React from 'react';
import Circle from 'components/Circle/Circle';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';


interface EditProfilePicButtonProps {
  onPress?: () => void;
}

const EditProfilePicButton: React.FC<EditProfilePicButtonProps> = ({ onPress }) => {

  return (
    <EditProfilePicPositioner>
      <Circle>
        <EditIconContainer>
          <PressableIcon name="edit" size={20} onPress={onPress} />
        </EditIconContainer>
      </Circle>
    </EditProfilePicPositioner>
  )
}
export default EditProfilePicButton;

const EditProfilePicPositioner = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 60;
`
const EditIconContainer = styled.View`
  padding: 8px;
  background-color: ${colors.white};
  border-radius: 10px;
`