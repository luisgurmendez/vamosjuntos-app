import React from 'react';
import { View } from 'react-native';
import { alpha, colors } from 'utils/colors';

interface AddNewMarkerProps {
  lifted?: boolean;
}

const SelectAddressMarker: React.FC<AddNewMarkerProps> = ({ lifted = true }) => {

  let draggingStyle = { backgroundColor: colors.main };

  if (lifted) {
    draggingStyle = { backgroundColor: alpha(colors.main, 0.5) }
  }

  return (
    <View pointerEvents="none" style={[styles.marker, draggingStyle]} />
  )
}

const styles = {
  marker: {
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 8,
    shadowOpacity: 0.5,
    position: 'absolute',
    top: '50%',
    left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    marginLeft: -10,
    marginTop: 0,
    borderRadius: 20,
    backgroundColor: '#2288dd',
    borderWidth: 2,
    borderColor: '#eeeeee'
  }
};

export default SelectAddressMarker;
