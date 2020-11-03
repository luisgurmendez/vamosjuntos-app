import TextInput from 'components/TextInput/TextInput';
import React, { useEffect, useState } from 'react';
import { TextInputProps } from 'react-native';
import { isValidHourString } from './utils';

interface HourInputProps extends TextInputProps {
  onHourChange?: (hour: number, mins: number) => void;
}

/**
 * This component expects value with the format HH:mm
 */
const HourInput: React.FC<HourInputProps> = ({ onHourChange, value, ...props }) => {

  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    setInnerValue(value);
  }, [setInnerValue, value])

  const handleHourChange = (hour: string) => {
    let _hour = hour;

    if (_hour.length === 2 && innerValue?.length === 1) {
      _hour += ':'
    }

    if (_hour.length === 3 && _hour[2] !== ':') {
      _hour = _hour.slice(0, 2) + ':' + _hour.slice(2);
    }

    if (isValidHourString(_hour)) {
      const hours = parseInt(_hour.split(':')[0]);
      const mins = parseInt(_hour.split(':')[1]);
      onHourChange && onHourChange(hours, mins);
    }

    setInnerValue(_hour);
  }

  const handleBlur = () => {
    if (!isValidHourString(innerValue)) {
      onHourChange && onHourChange(10, 0);
    }
  }

  const handleFocus = () => {
    setInnerValue(value);
  }

  return (
    <TextInput {...props} onFocus={handleFocus} clearButtonMode={'never'} onBlur={handleBlur} keyboardType='numeric' value={innerValue} onChangeText={handleHourChange} placeholder="HH:mm" maxLength={5} />
  )
}

export default HourInput;
